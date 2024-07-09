// api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to fetch user data with a token
export const fetchUserData = async (token) => {
  try {
    console.log('Fetching user data with token:', token);
    const response = await api.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Fetch User Data Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Fetch User Data Error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};


// Function to verify OTP
export const verifyOtp = async (otp) => {
  try {
    const response = await api.post('/verify-otp', { otp });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to complete user profile
export const completeProfile = async (profileData, token) => {
  try {
    const response = await api.post('/complete-profile', profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to update user profile
export const updateProfile = async (formData, token) => {
  try {
    const response = await api.put('/user', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to fetch list of books
export const fetchBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to fetch book details
export const fetchBookDetails = async (bookId) => {
  try {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to add a new book
export const addBook = async (bookData, token) => {
  try {
    const response = await api.post('/books', bookData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to submit a review for a book
export const submitReview = async (bookId, reviewData, token) => {
  try {
    const response = await api.post(`/books/${bookId}/reviews`, reviewData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;
