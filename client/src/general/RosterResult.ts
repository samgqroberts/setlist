import * as C from '../general/Concert';
import * as R from '../general/Roster';
import { assertNever, isNumber } from './types';

interface SetOpener {
  setOpener: true;
  set: number;
}
function isSetOpener(data: unknown): data is SetOpener {
  return (data as SetOpener)?.setOpener === true;
}
function setOpener(set: number): SetOpener {
  return { setOpener: true, set };
}

interface SetCloser {
  setCloser: true;
  set: number;
}
function isSetCloser(data: unknown): data is SetCloser {
  return (data as SetCloser)?.setCloser === true;
}
function setCloser(set: number): SetCloser {
  return { setCloser: true, set };
}

type Encore = 'isEncore';
function isEncore(data: unknown): data is Encore {
  return data === 'isEncore';
}
function encore(): Encore {
  return 'isEncore';
}

type Bustout = 'isBustout';
function isBustout(data: unknown): data is Bustout {
  return data === 'isBustout';
}
function bustout(): Bustout {
  return 'isBustout';
}

type Cover = 'isCover';
function isCover(data: unknown): data is Cover {
  return data === 'isCover';
}
function cover(): Cover {
  return 'isCover';
}

type PlayedMidset = 'playedMidset';

type Special = SetOpener | SetCloser | Encore | Bustout | Cover;
function isSpecial(data: unknown): data is Special {
  return (
    isSetOpener(data) ||
    isSetCloser(data) ||
    isEncore(data) ||
    isBustout(data) ||
    isCover(data)
  );
}

type SlotResultInner = PlayedMidset | Special[] | undefined;

interface SlotResult {
  songName: string;
  results: SlotResultInner;
}
function slotResult(songName: string, results: SlotResultInner): SlotResult {
  return { songName, results };
}

function slotToResult(
  slot: R.Slot,
  concert: C.Concert,
  bustoutList: string[],
  coverList: string[]
): SlotResult | undefined {
  if (slot) {
    const songName = slot;
    const isBustout = C.bustouts(concert, bustoutList).includes(songName);
    const isCover = C.covers(concert, coverList).includes(songName);
    const isEncore = C.encore(concert) === songName;
    const isSetOpener = C.sets(concert).findIndex(
      (s) => s.songs[0] === songName
    );
    const isSetCloser = C.sets(concert).findIndex(
      (s) => s.songs[s.songs.length - 1] === songName
    );
    const specials: Special[] = [
      isBustout ? bustout() : undefined,
      isCover ? cover() : undefined,
      isEncore ? encore() : undefined,
      isNumber(isSetOpener) && isSetOpener > -1
        ? setOpener(isSetOpener)
        : undefined,
      isNumber(isSetCloser) && isSetCloser > -1
        ? setCloser(isSetCloser)
        : undefined
    ].filter(isSpecial);
    if (specials.length) {
      return slotResult(songName, specials);
    }
    const wasPlayed = C.allSongs(concert).includes(songName);
    if (wasPlayed) {
      return slotResult(songName, 'playedMidset');
    }
    return slotResult(songName, undefined);
  }
  return slot
    ? {
        songName: slot,
        results: undefined
      }
    : undefined;
}

interface RosterResult {
  slotResults: R.RosterLengthTuple<SlotResult | undefined>;
}

export function computeRosterResult(
  roster: R.Roster,
  concert: C.Concert,
  bustoutList: string[],
  coverList: string[]
): RosterResult {
  return {
    slotResults: R.map(roster, (slot) => {
      return slotToResult(slot, concert, bustoutList, coverList);
    })
  };
}

export function getIndex(
  rosterResult: RosterResult,
  index: R.RosterIndex
): SlotResult | undefined {
  return rosterResult.slotResults[index];
}

export function map<T>(
  rosterResult: RosterResult,
  f: (slotResult: SlotResult | undefined, index: R.RosterIndex) => T
): R.RosterLengthTuple<T> {
  return R.rosterIndices.map((i) =>
    f(getIndex(rosterResult, i), i)
  ) as R.RosterLengthTuple<T>;
}

export function fmap<T, U>(x: T | undefined, f: (x: T) => U): U | undefined {
  return x === undefined ? undefined : f(x);
}

export function slotResultToString(slotResult: SlotResult): string {
  switch (slotResult.results) {
    case undefined:
      return 'Not Played';
    case 'playedMidset':
      return 'Played Midset';
    default:
      return slotResult.results
        .map((r) => {
          switch (r) {
            case 'isBustout':
              return 'Bustout';
            case 'isCover':
              return 'Cover';
            case 'isEncore':
              return 'Encore';
            default:
              if (isSetOpener(r)) return `Set ${r.set + 1} Opener`;
              if (isSetCloser(r)) return `Set ${r.set + 1} Closer`;
              assertNever(r);
          }
        })
        .join(', ');
  }
}

export function slotResultToPoints(slotResult: SlotResult): number {
  switch (slotResult.results) {
    case undefined:
      return 0;
    case 'playedMidset':
      return 1;
    default:
      return slotResult.results
        .map((r) => {
          switch (r) {
            case 'isBustout':
              return 5;
            case 'isCover':
              return 4;
            case 'isEncore':
              return 3;
            default:
              if (isSetOpener(r)) return 2;
              if (isSetCloser(r)) return 2;
              assertNever(r);
          }
        })
        .reduce((acc, el) => acc + el, 0);
  }
}
