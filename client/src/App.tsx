import data from './song-data.json';
import styles from './App.module.css';
import { Fragment, useState } from 'react';
import * as R from './Roster';

const songs = data.filter(d => !!d.playInfo);

function App() {
  const [search, setSearch] = useState<string>('');
  const [roster, setRoster] = useState<R.Roster>(R.empty())
  const filteredSongs = songs
    .filter(s => s.songName.includes(search))
    .sort((a, b) => a.songName.localeCompare(b.songName));
  const addSong = (songName: string) => () => {
    setRoster(R.addSong(roster, songName));
  }
  const clearIndex = (index: R.RosterIndex) => () => {
    setRoster(R.clearIndex(roster, index));
  }
  return (
    <div className={styles.app}>
      <h1>Setlist</h1>
      <div className={styles.content}>
        <div className={styles.songList}>
          <div className={styles.header}>
            <div className={styles.filter}>filter | sort</div>
            <input type="text" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className={styles.songListTableContainer}>
            <table className={styles.songListTable}>
              <tbody>
                {filteredSongs.map(d => (
                  <tr key={d.songName}>
                    <td>
                      <button className={styles.addButton} onClick={addSong(d.songName)}>
                        +
                      </button>
                    </td>
                    <td>{d.songName}</td>
                    <td>{d.playInfo?.last}</td>
                    <td>{d.playInfo?.times}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.rosterContainer}>
          <table className={styles.roster}>
            <tbody>
              {R.map(roster, (slot, i) => (
                <tr key={i}>
                  {slot ? (
                    <Fragment>
                      <td>
                        <button className={styles.removeButton} onClick={clearIndex(i)}>
                          -
                        </button>
                      </td>
                      <td>{slot}</td>
                    </Fragment>
                  ) : (
                    <div className={styles.empty}>Slot {i + 1}</div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
