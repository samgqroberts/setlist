import { isNumber, isString, isStringOrUndefined } from './types';

export interface PlayInfoPlayed {
  times: number
  debut: string
  last: string
  gap: number
}
export function isPlayInfoPlayed(data: unknown): data is PlayInfoPlayed {
  const as = data as PlayInfoPlayed;
  return isNumber(as?.times) && isString(as?.debut) && isString(as?.last) && isNumber(as?.gap);
}

export interface PlayInfoNeverPlayed {
  times: 0
  gap: number
}
export function isPlayInfoNeverPlayed(data: unknown): data is PlayInfoNeverPlayed {
  const as = data as PlayInfoNeverPlayed;
  return as?.times === 0 && isNumber(as?.gap);
}

export type PlayInfo = PlayInfoPlayed | PlayInfoNeverPlayed;
export function isPlayInfo(data: unknown): data is PlayInfo {
  return isPlayInfoPlayed(data) || isPlayInfoNeverPlayed(data);
}
export interface SongDataWithPlayInfo {
  songName: string
  originalArtist?: string
  playInfo: PlayInfo
}
export function isSongDataWithPlayInfo(data: unknown): data is SongDataWithPlayInfo {
  const as = data as SongDataWithPlayInfo;
  return isString(as?.songName) && isStringOrUndefined(as?.originalArtist) && isPlayInfo(as?.playInfo);
}

export interface SongDataAlias {
  songName: string
  originalArtist?: string
  aliasOf: string
}
export const aliasIndicator = 'Alias of';
export function isSongDataAlias(data: unknown): data is SongDataAlias {
  const as = data as SongDataAlias;
  return isString(as?.songName) && isStringOrUndefined(as?.originalArtist) && isString(as?.aliasOf);
}

export type SongData = SongDataWithPlayInfo | SongDataAlias;
export function isSongData(data: unknown): data is SongData {
  return isSongDataWithPlayInfo(data) || isSongDataAlias(data)
}