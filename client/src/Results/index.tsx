import * as R from '../general/Roster';
import styles from './Results.module.css';

const Results: React.FC<{
  roster: R.Roster | undefined;
}> = () => {
  const roster: R.Roster = {
    s1: '1999',
    s2: '20-20 Vision',
    s3: '46 Days',
    s4: 'About to Run',
    s5: 'AC/DC Bag',
    s6: 'Access Me',
    s7: 'Acoustic Army',
    s8: 'After Midnight',
    s9: "Ain't Love Funny"
  };
  return (
    <div className={styles.results}>
      <div className={styles.yourScoreContainer}>
        <div className={styles.banner}>
          <h3>Your score</h3>
        </div>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>Selection</th>
              <th>Result</th>
              <th># Points</th>
            </tr>
          </thead>
          <tbody>
            {R.rosterIndices.map((i) => {
              const slot = R.getIndex(roster, i);
              return (
                <tr key={(slot || '') + i}>
                  <td>{slot || '----'}</td>
                  <td>Not Played</td>
                  <td>0</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.leaderboardContainer}>
        <div className={styles.banner}>
          <h3>Leaderboard</h3>
        </div>
        <table className={styles.leaderboardTable}>
          <tbody>
            {[
              ['Contestant 1', 4],
              ['Contestant 2', 2],
              ['Contestant 4', 1]
            ].map(([contestant, score]) => {
              return (
                <tr key={contestant}>
                  <td>{contestant}</td>
                  <td>{score} Points</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
