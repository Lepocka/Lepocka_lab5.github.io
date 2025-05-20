import React from 'react';

const PlayerStats = function (props) {
  const stats = props.stats;
  return React.createElement(
    "div",
    { className: "player-stats" },
    React.createElement("h3", null, "Статистика гравця"),
    React.createElement("p", null, "Зіграно ігор: ", React.createElement("strong", null, stats.gamesPlayed)),
    React.createElement("p", null, "Перемог: ", React.createElement("strong", null, stats.wins)),
    React.createElement("p", null, "Турнірів: ", React.createElement("strong", null, stats.tournaments)),
    React.createElement("p", null, "Досягнення: ", React.createElement("strong", null, stats.achievements))
  );
};

export default PlayerStats;
