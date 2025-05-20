import React, { useState } from 'react';

const TournamentCard = function (props) {
  const [isRegistered, setIsRegistered] = useState(false);
  const tournament = props.tournament;

  const handleButtonClick = () => {
    setIsRegistered(!isRegistered);
  };

  return React.createElement(
    "div",
    { className: "tournament-card" },
    React.createElement("h3", null, tournament.title),
    React.createElement("p", null, "Дата: ", tournament.date),
    React.createElement("p", null, "Призовий фонд: ", tournament.prize),
    React.createElement("p", null, "Учасники: ", tournament.participants),
    React.createElement(
      "button",
      { className: "register-btn", onClick: handleButtonClick },
      isRegistered ? "Зареєстровано" : "Зареєструватися"
    )
  );
};

export default TournamentCard;
