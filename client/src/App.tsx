import styles from './App.module.css';

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
          <div className={styles.songListTable}>
            Song list table
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
