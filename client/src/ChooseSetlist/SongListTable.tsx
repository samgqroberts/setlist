import React, { useState } from 'react';
import { assertNever, SongDataWithPlayInfo } from 'shared';

import MaterialIcon from '../general/MaterialIcon';
import styles from './SongListTable.module.css';

const columnKeys = ['songName', 'lastPlayed', 'timesPlayed'] as const;
type ColumnKey = typeof columnKeys[number];

const columnNames = {
  songName: 'Song Name',
  lastPlayed: 'Last Played',
  timesPlayed: '# Played'
} as const;

type SortDirection = 'asc' | 'desc';

type Sort = { columnKey: ColumnKey; direction: SortDirection };

const compare = (a: number, b: number) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const SongListTable: React.FC<{
  songs: SongDataWithPlayInfo[];
  onAdd: (songName: string) => void;
}> = ({ songs, onAdd }) => {
  const [sort, setSort] = useState<Sort>({
    columnKey: 'timesPlayed',
    direction: 'desc'
  });
  const onSort = (columnKey: ColumnKey) => {
    const direction =
      sort.columnKey === columnKey
        ? sort.direction === 'asc'
          ? 'desc'
          : 'asc'
        : 'desc';
    setSort({ columnKey, direction });
  };
  const sortedSongs = songs.sort((a, b) => {
    switch (sort.columnKey) {
      case 'songName':
        return sort.direction === 'asc'
          ? a.songName.localeCompare(b.songName)
          : b.songName.localeCompare(a.songName);
      case 'lastPlayed':
        return sort.direction === 'asc'
          ? compare(a.playInfo.gap, b.playInfo.gap)
          : compare(b.playInfo.gap, a.playInfo.gap);
      case 'timesPlayed':
        return sort.direction === 'asc'
          ? compare(a.playInfo.times, b.playInfo.times)
          : compare(b.playInfo.times, a.playInfo.times);
      default:
        assertNever(sort.columnKey);
    }
  });
  const sortArrowDown = () => <MaterialIcon iconName={'keyboard_arrow_down'} />;
  const sortArrowUp = () => <MaterialIcon iconName={'keyboard_arrow_up'} />;
  const sortArrow = (columnKey: ColumnKey) => {
    if (columnKey === sort.columnKey)
      return (
        <React.Fragment>
          {' '}
          {sort.direction === 'asc' ? sortArrowUp() : sortArrowDown()}
        </React.Fragment>
      );
    return null;
  };
  const headerCell = (columnKey: ColumnKey) => (
    <th>
      <button onClick={() => onSort(columnKey)}>
        {columnNames[columnKey]}
        {sortArrow(columnKey)}
      </button>
    </th>
  );
  return (
    <div className={styles.songListTableContainer}>
      <table className={styles.songListTable}>
        <thead>
          <tr>
            <th /> {/* Empty header over 'add' column */}
            {headerCell('songName')}
            {headerCell('lastPlayed')}
            {headerCell('timesPlayed')}
          </tr>
        </thead>
        <tbody>
          {sortedSongs.map((d) => (
            <tr key={d.songName + (d.originalArtist || '')}>
              <td>
                <button
                  className={styles.addButton}
                  onClick={() => onAdd(d.songName)}
                >
                  +
                </button>
              </td>
              <td>{d.songName}</td>
              <td>{'last' in d.playInfo ? d.playInfo.last : '--'}</td>
              <td>{'times' in d.playInfo ? d.playInfo.times : '--'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongListTable;
