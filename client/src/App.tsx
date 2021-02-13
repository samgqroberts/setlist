import { Fragment, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';

import styles from './App.module.css';
import * as R from './Roster';
import data from './song-data.json';

const songs = data.filter((d) => !!d.playInfo);

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
  const addSong = (songName: string) => () => {
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
          <div className={styles.songListTableContainer}>
            <table className={styles.songListTable}>
              <tbody>
                {filteredSongs.map((d) => (
                  <tr key={d.songName + (d.originalArtist || '')}>
                    <td>
                      <button
                        className={styles.addButton}
                        onClick={addSong(d.songName)}
                      >
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

const Results: React.FC<{
  roster: R.Roster | undefined;
}> = ({ roster }) => {
  return <div className={styles.results}>{JSON.stringify(roster)}</div>;
};

const Routed: React.FC = () => {
  const [submittedRoster, setSubmittedRoster] = useState<R.Roster | undefined>(
    undefined
  );
  const history = useHistory();
  const onSubmit = (roster: R.Roster) => {
    setSubmittedRoster(roster);
    history.push('/results');
  };
  return (
    <Switch>
      <Route exact path="/">
        <ChooseSetlist {...{ onSubmit }} />
      </Route>
      <Route exact path="/results">
        <Results roster={submittedRoster} />
      </Route>
    </Switch>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routed />
    </Router>
  );
};

export default App;
