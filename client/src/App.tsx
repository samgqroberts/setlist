import data from './song-data.json';
import styles from './App.module.css';
import React from 'react';

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
          <table className={styles.songListTable}>
            <thead>
              <td>Song Name</td>
              <td>Original Artist</td>
              <td>Times</td>
              <td>Debut</td>
              <td>Last</td>
              <td>Gap</td>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.songName}>
                  <td>{d.songName}</td>
                  <td>{d.originalArtist}</td>
                  {d.aliasOf ? (
                    <td>Alias of&nbsp;{d.aliasOf}</td>
                  ) : d.foundInDiscography ? (
                    <td>Found in Discography</td>
                  ) : (
                    <React.Fragment>
                      <td>{d.playInfo?.times}</td>
                      <td>{d.playInfo?.debut}</td>
                      <td>{d.playInfo?.last}</td>
                      <td>{d.playInfo?.gap}</td>
                    </React.Fragment>
                  )}
                </tr>
              ))}
            </tbody>
            Song list table
          </table>
        </div>
      <div className={styles.roster}>
        Roster
      </div>
      </div>
    </div>
  );
}

export default App;
