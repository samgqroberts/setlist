import { Fragment, useState } from 'react';

import * as R from '../general/Roster';
import { songs } from '../general/SongData';
import styles from './ChooseSetlist.module.css';
import SongListTable from './SongListTable';

const ChooseSetlist: React.FC<{
  onSubmit: (roster: R.Roster) => void;
}> = ({ onSubmit }) => {
  const [search, setSearch] = useState<string>('');
  const [roster, setRoster] = useState<R.Roster>(R.empty());
  const filteredSongs = songs
    .filter((s) =>
      s.songName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .filter((s) => !R.includes(roster, s.songName))
    .sort((a, b) => a.songName.localeCompare(b.songName));
  const addSong = (songName: string) => {
    setRoster(R.addSong(roster, songName));
  };
  const clearIndex = (index: R.RosterIndex) => () => {
    setRoster(R.clearIndex(roster, index));
  };
  const submit = () => {
    onSubmit(roster);
  };
  const clear = () => {
    setRoster(R.empty());
  };
  return (
    <div className={styles.app}>
      <h1>Setlist</h1>
      <div className={styles.content}>
        <div className={styles.songList}>
          <div className={styles.header}>
            <input
              className={styles.search}
              type="text"
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <SongListTable songs={filteredSongs} onAdd={addSong} />
        </div>
        <div className={styles.rosterContainer}>
          <table className={styles.roster}>
            <tbody>
              {R.map(roster, (slot, i) => (
                <tr key={(slot || '') + i}>
                  {slot ? (
                    <Fragment>
                      <td className={styles.removeCell}>
                        <button
                          className={styles.removeButton}
                          onClick={clearIndex(i)}
                        >
                          -
                        </button>
                      </td>
                      <td className={styles.rosterSongName}>{slot}</td>
                    </Fragment>
                  ) : (
                    <td className={styles.emptyCell}>Slot {i + 1}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.buttons}>
            <button className={styles.submit} onClick={submit}>
              Submit
            </button>
            <button className={styles.clear} onClick={clear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSetlist;
