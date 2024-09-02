// src/firebaseConfig.jsx

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: "alwayshangryapp.firebaseapp.com",
  projectId: "alwayshangryapp",
  storageBucket: "alwayshangryapp.appspot.com",
  messagingSenderId: "930061813500",
  appId: "1:930061813500:web:709b76cc05cef202dd7979",
  measurementId: "G-V61WDMMS8Z"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize and export Firebase Storage

