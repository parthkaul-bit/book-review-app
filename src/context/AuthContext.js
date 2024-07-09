// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'), // Initialize token from localStorage
    user: null,
  });

  // Function to handle login
  const login = (token, user) => {
    localStorage.setItem('token', token); // Store token in localStorage
    setAuthState({ token, user }); // Update authState with token and user
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setAuthState({ token: null, user: null }); // Clear authState
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
