// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/common/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import OtpVerification from './components/Auth/OtpVerification';
import ProfileCompletion from './components/Auth/ProfileCompletion';
import Dashboard from './components/Dashboard/Dashboard';
import BookList from './components/Books/BookList';
import BookDetails from './components/Books/BookDetails';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider from context
import AddBookForm from './components/Books/AddBook';

function App() {
  // Assuming you have some logic to fetch initial auth state and user data here
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

  return (
      <AuthProvider value={{ authState: initialAuthState, login, logout }}> {/* Provide initialAuthState, login, and logout */}
        <Navbar />
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/profile-completion" element={<ProfileCompletion />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="add-book" element={<AddBookForm />} />
            <Route path="book-list" element={<BookList />} />
          </Routes>
        </Container>
      </AuthProvider>
  );
}

export default App;
