import * as R from '../general/Roster';
import styles from './Results.module.css';

const Results: React.FC<{
  roster: R.Roster | undefined;
}> = ({ roster }) => {
  return <div className={styles.results}>{JSON.stringify(roster)}</div>;
};

export default Results;
