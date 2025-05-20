import React,  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home.js';
import Games from './pages/Games.js';
import Tournaments from './pages/Tournament.js';
import Profile from './pages/Profile.js';
import Footer from './components/Footer.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase.js';
import Login from './pages/login.js';
import Register from './pages/register.js';

const ProtectedRoute = ({ user, children }) => {
  return user ? children : React.createElement(Navigate, { to: "/login", replace: true });
};

const App = function () {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log("Вихід виконано успішно");
      } catch (err) {
        console.error("Помилка виходу:", err);
      }
    };

  return React.createElement(
    Router,
    null,
    React.createElement(
      "header",
      null,
      React.createElement("h1", null, "CyberArena"),
    ),
      React.createElement(
        "nav",
        null,
        React.createElement(Link, { to: "/" }, "Головна"),
        React.createElement("span", null, " "),
        React.createElement(Link, { to: "/games" }, "Ігри"),
        React.createElement("span", null, " "),
        React.createElement(Link, { to: "/tournaments" }, "Турніри"),
        React.createElement("span", null, " "),
        user
        ? React.createElement(
            React.Fragment,
            null,
            React.createElement(Link, { to: "/profile" }, "Мій профіль"),
            React.createElement("span", null, " "),
            React.createElement(Link, { onClick: handleLogout }, "Вийти")
          )
        : React.createElement(
            React.Fragment,
            null,
            React.createElement(Link, { to: "/login" }, "Вхід"),
            React.createElement("span", null, " "),
            React.createElement(Link, { to: "/register" }, "Реєстрація")
          )
      ),
    
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
      React.createElement(Route, { path: "/games", element: React.createElement(Games, null) }),
      React.createElement(Route, { path: "/tournaments", element: React.createElement(Tournaments, null) }),
      React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }),
      React.createElement(Route, { path: "/register", element: React.createElement(Register, null) }),
      React.createElement(
        Route,
        {
          path: "/profile",
          element: React.createElement(
            ProtectedRoute,
            { user: user },
            React.createElement(Profile, null)
          )
        }
      )
    ),
    React.createElement(Footer, null)
  );
};   
export default App;
