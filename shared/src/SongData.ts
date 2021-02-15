import { isNumber, isString, isStringOrUndefined } from './types';

export interface PlayInfo {
  times: number
  debut: string
  last: string
  gap: number
}
export function isPlayInfo(data: unknown): data is PlayInfo {
  const as = data as PlayInfo;
  return isNumber(as?.times) && isString(as?.debut) && isString(as?.last) && isNumber(as?.gap);
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

export interface SongDataFoundInDiscography {
  songName: string
  originalArtist?: string
  foundInDiscography: true
}
export const foundInDiscographyIndicator = 'Found in Discography';
export function isSongDataFoundInDiscography(data: unknown): data is SongDataFoundInDiscography {
  const as = data as SongDataFoundInDiscography;
  return isString(as?.songName) && isStringOrUndefined(as?.originalArtist) && as?.foundInDiscography === true;
}

export type SongData = SongDataWithPlayInfo | SongDataAlias | SongDataFoundInDiscography;
export function isSongData(data: unknown): data is SongData {
  return isSongDataWithPlayInfo(data) || isSongDataAlias(data) || isSongDataFoundInDiscography(data)
}