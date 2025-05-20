import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import TournamentCard from '../components/TournamentCard.js';

const Tournaments = function () {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchTournaments = async () => {
      try {
        // Замініть "Tournaments" на актуальну назву вашої колекції у Firestore
        const querySnapshot = await getDocs(collection(db, "TournirList"));
        console.log("Кількість документів:", querySnapshot.docs.length);
        const tournamentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTournaments(tournamentsData);
      } catch (error) {
        console.error("Помилка завантаження турнірів:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return React.createElement(
    "main",
    { className: "container" },
    React.createElement("h2", null, "Турніри"),
    React.createElement(
      "div",
      { className: "tournaments-grid" },
      tournaments.map(function (tournament) {
        return React.createElement(TournamentCard, { key: tournament.id, tournament: tournament });
      })
    )
  );
};

export default Tournaments;
