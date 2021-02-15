import { isSongData, isSongDataWithPlayInfo, SongData } from 'shared';

import data from './song-data.json';

export const allSongData = data.filter(isSongData) as SongData[];

export const songs = allSongData.filter(isSongDataWithPlayInfo);

export const covers = songs.filter(
  (s) => s.originalArtist && s.originalArtist !== 'Phish'
);
