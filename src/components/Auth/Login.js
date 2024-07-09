// Login.js
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { loginUser } from '../../api/api'; // Assuming this function handles API requests
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData); // API call to authenticate user
      localStorage.setItem('token', data.token); // Store token in localStorage
      console.log('Token stored:', data.token); // Add this line for debugging
      login(data.token, data.user); // Update auth state
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Login
            </Button>
            {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
