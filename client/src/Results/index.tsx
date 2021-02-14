import * as C from '../general/Concert';
import * as R from '../general/Roster';
import * as RR from '../general/RosterResult';
import styles from './Results.module.css';

const Results: React.FC<{
  roster: R.Roster | undefined;
  concert: C.Concert;
  bustoutList: string[];
  coverList: string[];
}> = ({ roster, concert, bustoutList, coverList }) => {
  const rosterResult =
    roster && RR.computeRosterResult(roster, concert, bustoutList, coverList);
  return (
    <div className={styles.results}>
      <a className={styles.backlink} href="/">
        (choose another setlist)
      </a>
      <div className={styles.yourScoreContainer}>
        <div className={styles.banner}>
          <h3>Your score</h3>
        </div>
        {rosterResult ? (
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>Selection</th>
                <th>Result</th>
                <th># Points</th>
              </tr>
            </thead>
            <tbody>
              {RR.map(rosterResult, (sr, i) => {
                return (
                  <tr key={(sr?.songName || '') + i}>
                    <td>{sr?.songName || '----'}</td>
                    <td>{RR.fmap(sr, RR.slotResultToString) || '----'}</td>
                    <td>{RR.fmap(sr, RR.slotResultToPoints) || 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          'No roster! (go back and fill one out)'
        )}
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
