  // src/GameCard.js
  import React, { useState, useEffect } from 'react';
  import { auth, db } from '../firebase.js'; // Переконайтеся, що firebase.js знаходиться у src/
  import { doc, getDoc, setDoc } from 'firebase/firestore';

  const GameCard = function (props) {
    const game = props.game;
    const [favorite, setFavorite] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [averageRating, setAverageRating] = useState(null);

    const currentUser = auth.currentUser;

    // Завантаження попередньої оцінки з Firestore (якщо користувач автентифікований)
    useEffect(() => {
      if (currentUser) {
        const ratingDocRef = doc(db, 'gameRatings', `${game.id}_${currentUser.uid}`);
        getDoc(ratingDocRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserRating(docSnap.data().rating);
            }
          })
          .catch((error) => {
            console.error('Помилка завантаження оцінки:', error);
          });
      }
      
      fetch(`/api/games/${game.id}/averageRating`)
        .then(response => response.json())
        .then(data => {
    console.log('Отримано дані рейтингу:', data);
    setAverageRating(data.averageRating);
  })
        .catch(error => {
          console.error('Помилка отримання рейтингу:', error);
          setAverageRating('N/A');
        });
    }, [currentUser, game.id]);

    // Функція для перемикання улюблених
    const toggleFavorite = function () {
      setFavorite(!favorite);
    };

    // Обробник натискання по зірці для оцінки
    const handleRating = async (value) => {
      if (!currentUser) {
        alert('Будь ласка, увійдіть, щоб залишити оцінку.');
        return;
      }

      setUserRating(value);
      try {
        await setDoc(doc(db, 'gameRatings', `${game.id}_${currentUser.uid}`), {
          userId: currentUser.uid,
          gameId: game.id,
          rating: value,
          timestamp: Date.now()
        });
        console.log('Оцінку збережено!');
      } catch (error) {
        console.error('Помилка збереження оцінки:', error);
      }
    };

    // Рендер зірок для інтерактивного вибору оцінки
    const renderStars = function (rating) {
      let stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          React.createElement(
            "span",
            {
              key: i,
              onClick: () => handleRating(i),
              style: {
                cursor: currentUser ? "pointer" : "not-allowed",
                fontSize: "24px",
                color: i <= rating ? "#FFD700" : "#ccc"
              }
            },
            "★"
          )
        );
      }
      return stars;
    };

    return React.createElement(
      "div",
      { className: "game-card" + (favorite ? " favorite" : "") },
      React.createElement("img", { src: game.image, alt: game.title }),
      React.createElement("h3", null, game.title),
      React.createElement("p", null, "Жанр: ", game.genre),
      // Виведення інтерактивного блоку оцінки гри
      React.createElement(
        "p",
        null,
        "Оцінка: ",
        renderStars(userRating),
        " (",
        userRating,
        ")"
      ),
      React.createElement(
        "p",
        null,
        "Середній рейтинг: ",
        averageRating !== null ? averageRating : "Завантаження..."
      ),
      React.createElement("p", null, "Гравців: ", game.players),
      React.createElement(
        "button",
        { className: "fav-btn", onDoubleClick: toggleFavorite },
        "Додати до улюблених"
      )
    );
  };

  export default GameCard;
