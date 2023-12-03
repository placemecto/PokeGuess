import React, { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import database from './firebase';


function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const scoresRef = ref(database, 'leaderboard');
    onValue(scoresRef, (snapshot) => {
      const scoresData = snapshot.val();
      if (scoresData) {
        const formattedScores = Object.keys(scoresData).map(key => {
          return {
            ...scoresData[key],
            date: new Date(scoresData[key].timestamp).toLocaleDateString('en-US')
          };
        });
        formattedScores.sort((a, b) => b.score - a.score);
        setScores(formattedScores);
      }
    });

    return () => off(scoresRef);
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <ul className="leaderboard-list">
        <li className="leaderboard-header">
          <div>Name</div>
          <div>Score</div>
          <div>Date</div>
        </li>
        {scores.map((score, index) => (
          <li key={index} className="leaderboard-item">
            <div>{score.name}</div>
            <div>{score.score}</div>
            <div>{score.date}</div>
          </li>
        ))}
      </ul>

    </div>
  );
  
}

export default Leaderboard;
