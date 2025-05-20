// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js'; // Імпортуємо ініціалізований auth з firebase.js
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Реєстрація успішна:', userCredential.user);
      navigate('/profile');
      // Опціонально: обновіть стан або перенаправте користувача
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Помилка реєстрації:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
     <div className="auth-container">
    <form onSubmit={handleRegister}>
      <h2>Реєстрація</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="register-email">Email:</label>
        <input
          type="email"
          id="register-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="register-password">Пароль:</label>
        <input
          type="password"
          id="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Реєстрація...' : 'Зареєструватися'}
      </button>
    </form>
    </div>
  );
};

export default Register;
