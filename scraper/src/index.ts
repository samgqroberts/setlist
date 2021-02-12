import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const url = 'https://phish.net/song';
const AxiosInstance = axios.create();

const rootDir = path.dirname(__dirname);
const dataDir = path.join(rootDir, 'data/');
const dataFile = path.join(dataDir, 'song-data.json');
const errorsFile = path.join(dataDir, 'errors.json');

function isNumber(data: unknown): data is number {
  return typeof data === 'number';
}
function asNumber(data: string): number | undefined {
  const parsed = parseInt(data, 10);
  return parsed === NaN ? undefined : parsed;
}

function accessArray<T>(data: Array<T>, index: number): T | undefined {
  return data[index];
}

function parseAliasOf(data: string | undefined): string | undefined {
  const indicator = 'Alias of';
  if (data && (data.substring(0, indicator.length) === indicator)) {
    return data.substring(indicator.length).trim();
  }
  return undefined;
}

function parseFoundInDiscography(data: string | undefined): true | undefined {
  if (data?.trim() === 'Found in Discography') {
    return true;
  }
  return undefined;
}

interface PlayInfo {
  times: number
  debut: string
  last: string
  gap: number
}
function parsePlayInfo(
  timesRaw: string | undefined,
  debutRaw: string | undefined,
  lastRaw: string | undefined,
  gapRaw: string | undefined,
): PlayInfo | undefined {
  const times = !!timesRaw ? asNumber(timesRaw) : undefined;
  if (!isNumber(times)) return undefined;
  const debut = !!debutRaw ? debutRaw : undefined;
  if (!debut) return undefined;
  const last = !!lastRaw ? lastRaw : undefined;
  if (!last) return undefined;
  const gap = !!gapRaw ? asNumber(gapRaw) : undefined;
  if (!isNumber(gap)) return undefined;
  return { times, debut, last, gap };
}

interface SongDataWithPlayInfo {
  songName: string
  originalArtist?: string
  playInfo: PlayInfo
}
interface SongDataAlias {
  songName: string
  originalArtist?: string
  aliasOf: string
}
interface SongDataFoundInDiscography {
  songName: string
  originalArtist?: string
  foundInDiscography: true
}
type SongData = SongDataWithPlayInfo | SongDataAlias | SongDataFoundInDiscography;

function parseSongData(
  data0: string | undefined,
  data1: string | undefined,
  data2: string | undefined,
  data3: string | undefined,
  data4: string | undefined,
  data5: string | undefined,
): SongData | undefined {
  const songName = !!data0 ? data0 : undefined;
  if (!songName) return undefined;

  const originalArtist = !!data1 ? data1 : undefined;

  const playInfo = parsePlayInfo(data2, data3, data4, data5);
  if (playInfo) return { songName, originalArtist, playInfo };

  const aliasOf = parseAliasOf(data2);
  if (aliasOf) return { songName, originalArtist, aliasOf };

  const foundInDiscography = parseFoundInDiscography(data2);
  if (foundInDiscography) return { songName, originalArtist, foundInDiscography };

  return undefined;
}

// Send an async HTTP Get request to the url
AxiosInstance.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const songRows = $('#song-list > tbody > tr');

    const rows: SongData[] = [];
    const errors: string[][] = [];

    songRows.each((rowIndex, row) => {
      const raw: string[] = [];

      $(row).find('td').each((dataIndex, data) => {
        raw.push($(data).text());
      });

      const songData = parseSongData(
        accessArray(raw, 0),
        accessArray(raw, 1),
        accessArray(raw, 2),
        accessArray(raw, 3),
        accessArray(raw, 4),
        accessArray(raw, 5),
      );

      if (songData) {
        rows.push(songData);
      } else {
        errors.push(raw);
      }
    })

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    fs.writeFileSync(dataFile, JSON.stringify(rows.sort((a, b) => a.songName.localeCompare(b.songName)), null, 2));
    fs.writeFileSync(errorsFile, JSON.stringify(errors, null, 2));
  })
  .catch(console.error)