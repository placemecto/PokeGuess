// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <h1>Welcome to the Pokémon Guessing Game!</h1>
      <p>Are you ready to test your Pokémon knowledge and quick thinking? Here's how to play:</p>

      <h2>Instructions:</h2>
      
      <div>
        <div>When the game starts, you'll see an image of a random Pokémon.</div>
        <div>Your task is to guess the name of the Pokémon correctly.</div>
        <div>Type your guess into the text input field provided below the image.</div>
        <div>You have a limited amount of time to make your guess. Keep an eye on the timer!</div>
        <div>If you're stuck, press the "Tab" key to trade 1 second off of your clock to refresh the Pokémon image.<br></br></div>
        <div>Keep guessing as many Pokémon as you can before the timer runs out!</div>
        <div><br></br></div>
        <div>Don't forget to submit your high score to the leaderboard when you're done.</div>
        <div>Good luck and have fun!</div>
      </div>
    
      <button className="play-button" onClick={() => navigate('/play')}>
        Play Now
      </button>
    </div>
  );
}

export default HomePage;
