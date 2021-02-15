import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';

import ChooseSetlist from '../ChooseSetlist';
import * as C from '../general/Concert';
import * as R from '../general/Roster';
import { bustouts, covers } from '../general/SongData';
import Results from '../Results';

const bustoutList: string[] = bustouts.map((s) => s.songName);
const coverList: string[] = covers.map((s) => s.songName);

const concert: C.Concert = {
  set1: {
    songs: ['20-20 Vision', '99 Problems', 'A Life Beyond The Dream']
  },
  otherSets: [
    {
      songs: ['50 Ways to Leave Your Lover', 'About to Run', 'AC/DC Bag']
    }
  ],
  encore: 'Acoustic Army'
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
        <Results
          roster={submittedRoster}
          {...{ concert, bustoutList, coverList }}
        />
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
