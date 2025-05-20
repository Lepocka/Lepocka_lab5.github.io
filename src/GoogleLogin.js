// src/GoogleLogin.js
import React from 'react';
import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Вхід через Google успішний:', result.user);
      navigate('/profile');
    } catch (error) {
      console.error('Помилка входу через Google:', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="google-button">
      Вхід через Google
    </button>
  );
};

export default GoogleLogin;
