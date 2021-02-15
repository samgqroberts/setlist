import {
  isSongData,
  isSongDataWithPlayInfo,
  SongData,
  SongDataWithPlayInfo
} from 'shared';

import data from './song-data.json';

export const allSongData = data.filter(isSongData) as SongData[];

export const songs = allSongData.filter(isSongDataWithPlayInfo);

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
