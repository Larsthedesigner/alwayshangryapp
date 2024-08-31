// src/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebaseconfig.jsx';

function PrivateRoute({ children }) {
  const [user] = useAuthState(auth);

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
