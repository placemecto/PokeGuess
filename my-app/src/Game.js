import React, { useState, useEffect } from 'react';
import pokemonList from './pokemonList'; // Assuming this is the correct path
import database from './firebase';
import { ref, push } from "firebase/database";

function levenshtein(a, b) {
    const matrix = [];
  
    // Increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    // Increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                                  Math.min(matrix[i][j - 1] + 1, // insertion
                                           matrix[i - 1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[b.length][a.length];
  }
  

function Game() {
  const [currentImage, setCurrentImage] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [currentPokemon, setCurrentPokemon] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [userName, setUserName] = useState('');



  const handleSubmitScore = () => {
    if (userName.trim()) {
      const scoreData = {
        name: userName,
        score: score,
        timestamp: Date.now() // Optional: for sorting by latest
      };
  
      push(ref(database, 'leaderboard'), scoreData)
        .then(() => {
          console.log('Score submitted successfully');
          window.alert('Score submitted successfully'); // Display the success alert
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error submitting score:', error);
        });
    } else {
      alert('Please enter your name.');
    }
  };

  const loadNewImage = () => {
    const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    setCurrentPokemon(randomPokemon);
    const imagePath = `/sprites/${randomPokemon}.png`;
    setCurrentImage(imagePath);
    setUserGuess('');
    if (gameStarted) {
      setTimer((prevTimer) => prevTimer - 1); // Decrement timer
    }
  };
  

  useEffect(() => {
    loadNewImage();
  }, []);

  useEffect(() => {
    if (userGuess !== '') {
      const distance = levenshtein(userGuess.toLowerCase(), currentPokemon.toLowerCase());
      const length = Math.max(userGuess.length, currentPokemon.length);
      const similarity = (length - distance) / length;
      console.log(`Similarity score: ${similarity}`);
      
  
      if (similarity >= 0.88) { // 88% similarity threshold. i can change this
        setScore(score + 1);
        setTimer(timer + 1);
        loadNewImage();
      }
    }
  }, [userGuess, currentPokemon]);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameOver(true);
    }
    return () => clearInterval(interval);
  }, [timer, gameOver, gameStarted]);

  const handleInputChange = (event) => {
    if (!gameStarted) setGameStarted(true);
    setUserGuess(event.target.value);
  };
  

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      loadNewImage(); // This will now also decrement the timer
    }
  };

  return (
    <div className="App">
      {gameOver ? (
        <div>
          <p>Game Over! Your score: {score}</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleSubmitScore}>Submit Score to Leaderboard</button>
          <button onClick={() => window.location.reload()}>Restart Game</button>
        </div>
      ) : (
        <>
          {currentImage && (
            <img src={currentImage} alt="Random Pokémon" onClick={loadNewImage} width="330" height="330" />
          )}
          <input
            type="text"
            value={userGuess}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your guess"
          />
          <div className="score">Score: {score}</div>
          <div className="timer">Time left: {timer} seconds</div>
        </>
      )}
    </div>
  );
}

export default Game;
