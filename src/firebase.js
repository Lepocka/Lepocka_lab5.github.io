import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaUponmQCVVibEzBKsdRG3xUZ2g7aMQMM",
  authDomain: "test-d7804.firebaseapp.com",
  projectId: "test-d7804",
  storageBucket: "test-d7804.firebasestorage.app",
  messagingSenderId: "463275442618",
  appId: "1:463275442618:web:2fa240bc8e5019b34c9d83",
  measurementId: "G-XSH1D4MF14"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Отримання екземпляру автентифікації та Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };