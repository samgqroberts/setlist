import { isNumber, isString } from 'shared';

type Song = string;

export function isSong(data: unknown): data is Song {
  return isString(data);
}

export interface Set {
  songs: Song[];
}

export interface Concert {
  set1: Set;
  otherSets: Set[];
  encore: Song | undefined;
}

export function sets(concert: Concert): Set[] {
  const { set1, otherSets } = concert;
  return [set1, ...otherSets];
}

export function setOpener(
  concert: Concert,
  setIndex: number
): Song | undefined {
  return sets(concert)[setIndex]?.songs[0];
}

export function setCloser(
  concert: Concert,
  setIndex: number
): Song | undefined {
  const songs = sets(concert)[setIndex]?.songs;
  const length = songs?.length;
  if (songs && isNumber(length)) return songs[length - 1];
  return undefined;
}

export function encore(concert: Concert): Song | undefined {
  return concert.encore;
}

export function allSongs(concert: Concert): Song[] {
  return [...sets(concert).flatMap((s) => s.songs), encore(concert)].filter(
    isSong
  );
}

export function bustouts(concert: Concert, bustoutList: Song[]): Song[] {
  return allSongs(concert).filter((s) => bustoutList.includes(s));
}

export function covers(concert: Concert, coverList: Song[]): Song[] {
  return allSongs(concert).filter((s) => coverList.includes(s));
}
