import {
  isSongData,
  isSongDataAlias,
  isSongDataWithPlayInfo,
  SongData,
  SongDataWithPlayInfo
} from 'shared';

import data from './song-data.json';

export const allSongData = data.filter(isSongData) as SongData[];

export const directSongs = allSongData.filter(isSongDataWithPlayInfo);

type SongWithAliases = SongDataWithPlayInfo & { aliases: string[] | undefined };

type AliasMap = { [K: string]: string[] };
const aliasMap: AliasMap = allSongData.reduce((acc, el) => {
  if (isSongDataAlias(el)) {
    if (acc[el.aliasOf])
      return { ...acc, [el.aliasOf]: [...acc[el.aliasOf], el.songName] };
    return { ...acc, [el.aliasOf]: [el.songName] };
  }
  return acc;
}, {} as AliasMap);

export const songs: SongWithAliases[] = directSongs.map((song) => {
  return { ...song, aliases: aliasMap[song.songName] };
});
console.log(songs);

function isCover(data: SongData): boolean {
  return !!data.originalArtist && data.originalArtist !== 'Phish';
}

export const [originals, covers] = songs.reduce(
  ([originals, covers], d) => {
    return isCover(d)
      ? [originals, covers.concat(d)]
      : [originals.concat(d), covers];
  },
  [[] as SongDataWithPlayInfo[], [] as SongDataWithPlayInfo[]]
);

export const bustouts = originals.filter((d) => {
  return d.playInfo.gap > 200;
});
