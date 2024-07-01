import React from 'react';

const Scoreboard = ({ moves, win }) => {
  return (
    <div className="Scoreboard">
      <h2>Moves: {moves}</h2>
      {win && <h2>You Win!</h2>}
    </div>
  );
};

export default Scoreboard;
