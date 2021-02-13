import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';

import ChooseSetlist from '../ChooseSetlist';
import * as R from '../general/Roster';
import Results from '../Results';

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
