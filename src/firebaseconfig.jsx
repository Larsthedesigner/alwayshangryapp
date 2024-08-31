// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "alwayshangry-3b9ed.firebaseapp.com",
    projectId: "alwayshangry-3b9ed",
    storageBucket: "alwayshangry-3b9ed.appspot.com",
    messagingSenderId: "529865463950",
    appId: "1:529865463950:web:a5866c3b5c87901c6451df"
};

export default firebaseConfig;

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);