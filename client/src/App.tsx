import data from './song-data.json';
import styles from './App.module.css';
import React from 'react';

const songs = data.filter(d => !!d.playInfo);

function App() {
  return (
    <div className={styles.app}>
      <h1>Setlist</h1>
      <div className={styles.content}>
        <div className={styles.songList}>
          <div className={styles.header}>
            <div className={styles.filter}>filter | sort</div>
            <div className={styles.search}>search</div>
          </div>
          <div className={styles.songListTableContainer}>
            <table className={styles.songListTable}>
              <tbody>
                {songs.map(d => (
                  <tr key={d.songName}>
                    <td>+</td>
                    <td>{d.songName}</td>
                    <td>{d.playInfo?.last}</td>
                    <td>{d.playInfo?.times}</td>
                  </tr>
                ))}
              </tbody>
              Song list table
            </table>
          </div>
        </div>
      <div className={styles.roster}>
        Roster
      </div>
      </div>
    </div>
  );
}

export default App;
