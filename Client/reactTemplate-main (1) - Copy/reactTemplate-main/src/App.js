import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';
import Scoreboard from './Notification';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/game')
      .then(response => {
        setCards(response.data.cards);
        setMoves(response.data.moves);
        setWin(response.data.win);
      })
      .catch(error => console.error('Error fetching game data:', error));
  }, []);

  const handleCardClick = (index) => {
    axios.post('http://localhost:3000/api/reveal', { index })
      .then(response => {
        setCards(response.data.cards);
        setMoves(response.data.moves);
        setWin(response.data.win);
      })
      .catch(error => console.error('Error revealing card:', error));
  };

  const handleReset = () => {
    axios.post('http://localhost:3000/api/reset')
      .then(response => {
        setCards(response.data.cards);
        setMoves(response.data.moves);
        setWin(false);
      })
      .catch(error => console.error('Error resetting game:', error));
  };

  return (
    <div className="App">
      <h1>Memory Matching Game</h1>
      <Scoreboard moves={moves} win={win} />
      {win ? (
        <button onClick={handleReset}>Play Again</button>
      ) : (
        <Board cards={cards} onCardClick={handleCardClick} />
      )}
    </div>
  );
};

export default App;