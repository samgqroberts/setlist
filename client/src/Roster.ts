import { isNumber } from './types';

export type RosterIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export const rosterIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
export type Slot = string | undefined;

export type RosterLengthTuple<T> = [T, T, T, T, T, T, T, T, T];
export type SlotTuple = RosterLengthTuple<Slot>;

export interface Roster {
  s1: Slot
  s2: Slot
  s3: Slot
  s4: Slot
  s5: Slot
  s6: Slot
  s7: Slot
  s8: Slot
  s9: Slot
}
export function getIndex(
  roster: Roster,
  index: RosterIndex,
): Slot {
  switch (index) {
    case 0:
      return roster.s1;
    case 1:
      return roster.s2;
    case 2:
      return roster.s3;
    case 3:
      return roster.s4;
    case 4:
      return roster.s5;
    case 5:
      return roster.s6;
    case 6:
      return roster.s7;
    case 7:
      return roster.s8;
    case 8:
      return roster.s9;
  }
}
export function setIndex(
  roster: Roster,
  index: RosterIndex,
  songName: string | undefined
): Roster {
  switch (index) {
    case 0:
      return { ...roster, s1: songName };
    case 1:
      return { ...roster, s2: songName };
    case 2:
      return { ...roster, s3: songName };
    case 3:
      return { ...roster, s4: songName };
    case 4:
      return { ...roster, s5: songName };
    case 5:
      return { ...roster, s6: songName };
    case 6:
      return { ...roster, s7: songName };
    case 7:
      return { ...roster, s8: songName };
    case 8:
      return { ...roster, s9: songName };
  }
}
function isRosterIndex(data: unknown): data is RosterIndex {
  return isNumber(data) &&
    (data === 0
      || data === 1
      || data === 2
      || data === 3
      || data === 4
      || data === 5
      || data === 6
      || data === 7
      || data === 8);
}

export function addSong(roster: Roster, songName: string): Roster {
  const { s1, s2, s3, s4, s5, s6, s7, s8, s9 } = roster;
  const freeIndex = [s1, s2, s3, s4, s5, s6, s7, s8, s9].findIndex(s => !s);
  if (isRosterIndex(freeIndex)) return setIndex(roster, freeIndex, songName);
  return roster;
}

function toSlotTuple(roster: Roster): SlotTuple {
  return map(roster, slot => slot);
}

function compress(roster: Roster): Roster {
  return toSlotTuple(roster).reduce((acc, el) => el ? addSong(acc, el) : acc, empty());
}

export function clearIndex(roster: Roster, index: RosterIndex): Roster {
  return compress(setIndex(roster, index, undefined));
}

export function empty(): Roster {
  return {
    s1: undefined, s2: undefined, s3: undefined, s4: undefined,
    s5: undefined, s6: undefined, s7: undefined, s8: undefined,
    s9: undefined
  };
}

export function map<T>(
  roster: Roster,
  f: (slot: Slot, index: RosterIndex) => T,
): RosterLengthTuple<T> {
  return rosterIndices.map(i => f(getIndex(roster, i), i)) as RosterLengthTuple<T>;
}

export function includes(roster: Roster, songName: string): boolean {
  return isNumber(rosterIndices.find(i => getIndex(roster, i) === songName));
}