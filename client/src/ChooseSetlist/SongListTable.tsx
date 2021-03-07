import { SongDataWithPlayInfo } from 'shared';

import styles from './SongListTable.module.css';

const SongListTable: React.FC<{
  songs: SongDataWithPlayInfo[];
  onAdd: (songName: string) => void;
}> = ({ songs, onAdd }) => {
  return (
    <div className={styles.songListTableContainer}>
      <table className={styles.songListTable}>
        <thead>
          <tr>
            <th /> {/* Empty header over 'add' column */}
            <th>Song Name</th>
            <th>Last Played</th>
            <th># Played</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((d) => (
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
