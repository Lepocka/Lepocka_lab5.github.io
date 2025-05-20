import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

// Імпорт загальних та специфічних CSS файлів
import './css/styles.css';
import './css/games.css';
import './css/profile.css';
import './css/tournaments.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(React.StrictMode, null, React.createElement(App, null))
);
