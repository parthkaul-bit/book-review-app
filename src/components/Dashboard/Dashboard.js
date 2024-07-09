// Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { Typography, Grid, Paper, Button } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { fetchUserData } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);  // Debugging: Log the token

        if (token) {
          const response = await fetchUserData(token);
          console.log('User Data Response:', response);  // Debugging: Log the response data
          setUserData(response);
        } else {
          throw new Error('No token found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);  // Debugging: Log the error
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h5" gutterBottom>
            User Dashboard
          </Typography>
          {loading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : userData ? (
            <div>
              <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
              <Typography variant="body1"><strong>Username:</strong> {userData.username}</Typography>
              <Button variant="contained" color="primary" onClick={handleLogout} sx={{ marginTop: 2 }}>
                Logout
              </Button>
            </div>
          ) : (
            <Typography variant="body1">No user data found.</Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
