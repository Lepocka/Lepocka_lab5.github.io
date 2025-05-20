import React, { useState, useEffect } from 'react';
import GameCard from './GameCard.js';

const RecommendedGames = function (props) {
  const games = props.games || [];
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const selected = [];
    const copy = games.slice(); // створюємо копію масиву
    let count = 0;
    while (count < 4 && copy.length > 0) {
      const idx = Math.floor(Math.random() * copy.length);
      selected.push(copy[idx]);
      copy.splice(idx, 1); // видаляємо вибраний елемент, щоб він не повторився
      count++;
    }
    setRecommended(selected);
  }, [games]);

  return React.createElement(
    "div",
    { className: "recommended-games" },
    React.createElement("h2", null, "Рекомендовані ігри"),
    React.createElement(
      "div",
      { className: "games-grid" },
      recommended.map(function (game) {
        return React.createElement(GameCard, { key: game.id, game: game });
      })
    )
  );
};

export default RecommendedGames;
