// src/firebaseConfig.jsx

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: "alwayshangry-3b9ed.firebaseapp.com",
  projectId: "alwayshangry-3b9ed",
  storageBucket: "alwayshangry-3b9ed.appspot.com",
  messagingSenderId: "529865463950",
  appId: "1:529865463950:web:a5866c3b5c87901c6451df"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize and export Firebase Storage

