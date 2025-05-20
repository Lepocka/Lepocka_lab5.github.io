import React from 'react';
import CommentSection from '../components/CommentSection.js'; // Переконайтесь, що цей компонент існує

const Profile = function () {
  return React.createElement(
    "main",
    { className: "profile-container" },
    // Верхня частина: аватар і ім’я користувача
    React.createElement(
      "div",
      { className: "profile-header" },
      React.createElement("img", {
        src: "/images/useravatar.png",
        alt: "Аватар користувача"
      }),
      React.createElement("h2", null, "Player_123")
    ),
    // Основний контент з трьома блоками
    React.createElement(
      "div",
      { className: "profile-content" },
      // 1. Блок "Статистика"
      React.createElement(
        "div",
        { className: "profile-stats" },
        React.createElement("h3", null, "Статистика"),
        React.createElement("p", null, "Зіграних ігор: ", React.createElement("strong", null, "256")),
        React.createElement("p", null, "Перемог: ", React.createElement("strong", null, "89")),
        React.createElement("p", null, "Участь у турнірах: ", React.createElement("strong", null, "12"))
      ),
      // 2. Блок "Досягнення"
      React.createElement(
        "div",
        { className: "profile-achievements" },
        React.createElement("h3", null, "Досягнення"),
        React.createElement(
          "ul",
          null,
          React.createElement("li", null, "Переможець міжнародного турніру з Dota 2"),
          React.createElement("li", null, "1-е місце у сезонному чемпіонаті CS:GO"),
          React.createElement("li", null, "100+ перемог у стратегіях"),
          React.createElement("li", null, "MVP у командному матчі по Valorant"),
          React.createElement("li", null, "Діамантовий рівень у League of Legends")
        )
      ),
      // 3. Блок "Коментарі інших гравців"
      React.createElement(CommentSection, null)
      
    )
  );
};

export default Profile;
