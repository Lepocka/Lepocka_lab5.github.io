import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../firebase.js';
import GameCard from '../components/GameCard.js';
import RecommendedGames from '../components/RecommendedGames.js';


const fetchUserRatings = async (userId) => {
  console.log("userId:", userId);
    if (!userId) {
    console.error("userId відсутній, неможливо завантажити рейтинги");}
  const ratingsMap = {};
  try {
    const ratingsQuery = query(
      collection(db, "gameRatings"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(ratingsQuery);
    console.log("Кількість документів:", querySnapshot.docs.length);
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      // Формуємо мапу: gameId -> rating
      ratingsMap[data.gameId] = data.rating;
    });
  } catch (error) {
    console.error("Помилка завантаження рейтингів користувача:", error);
  }
  return ratingsMap;
};

const Games = function () {
  const [games, setGames] = useState([]);
  const [ascending, setAscending] = useState(true);
   const [user] = useState(auth.currentUser);
   const [userRatings, setUserRatings] = useState({});

  // Завантаження даних із Firestore
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "GamesList"));
        
        const gamesData = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        }));
        setGames(gamesData);
      } catch (error) {
        console.error("Помилка завантаження ігор:", error);
      }
    };
    fetchGames();
  
    if (user) {
      fetchUserRatings(user.uid).then(ratingsMap => {
        console.log("Отримані рейтинги користувача:", ratingsMap);
        setUserRatings(ratingsMap);
      });
    }
  }, [user]);

  const sortGamesByRating = () => {
    const sortedGames = games.slice().sort((a, b) => {
      // Якщо рейтингове значення відсутнє, використовується 0
      const ratingA = Number(userRatings[a.id]) || 0;
      const ratingB = Number(userRatings[b.id]) || 0;
      return ascending ? ratingA - ratingB : ratingB - ratingA;
    });
    setGames(sortedGames);
    setAscending(!ascending);
  };

  return React.createElement(
    "main",
    { className: "container" },
    React.createElement("section", { className: "recommended-games" },
      React.createElement(RecommendedGames, { games: games })
    ),
    React.createElement("section", { className: "all-games" },
      React.createElement("h2", null, "Ігри"),
      React.createElement("button", { className: "sort-btn", onClick: sortGamesByRating },
        ascending ? "Сортувати за зростанням" : "Сортувати за спаданням"
      ),
      React.createElement("div", { className: "games-grid" },
        games.map(function (game) {
          return React.createElement(GameCard, { key: game.id, game: game });
        })
      )
    )
  );
};

export default Games;
