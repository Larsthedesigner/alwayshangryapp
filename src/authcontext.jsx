import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig.jsx'; // Adjust path as needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
