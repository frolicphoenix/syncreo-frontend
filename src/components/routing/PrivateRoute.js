// src/components/routing/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Simple authentication check

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
