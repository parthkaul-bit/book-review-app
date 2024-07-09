// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider from context

// Assuming you have some initial auth state here as well
const initialAuthState = {
  token: localStorage.getItem('token'), // Example: Get token from localStorage
  user: null, // Example: You may fetch user data asynchronously here
};

const login = (token, user) => {
  localStorage.setItem('token', token); // Example: Store token in localStorage
  // You might want to fetch user data and update `user` in state
};

const logout = () => {
  localStorage.removeItem('token'); // Example: Remove token from localStorage
  // Reset user data in state if needed
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
