// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import GoogleLogin from '../GoogleLogin.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Вхід успішний:', userCredential.user);
      navigate('/profile');
      // Очистка полів форми
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Помилка входу:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
     <div className="auth-container">
    <form onSubmit={handleLogin}>
      <h2>Вхід</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="login-email">Email:</label>
        <input
          type="email"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="login-password">Пароль:</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Вхід...' : 'Увійти'}
      </button>
    </form>
    <GoogleLogin />
    </div>
  );
};

export default Login;
