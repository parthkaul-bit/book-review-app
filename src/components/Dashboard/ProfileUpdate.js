import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { completeProfile } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const ProfileCompletion = ({ userId }) => {
  const [formData, setFormData] = useState({
    location: '',
    age: '',
    work: '',
    dob: '',
    description: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = { userId, profileData: formData };
      await completeProfile(profileData);
      // Handle successful profile completion
      navigate('/books'); // Redirect to book page after successful completion
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h5" gutterBottom>
            Complete Your Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="location"
              label="Location"
              variant="outlined"
              value={formData.location}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            {/* Add other fields as needed */}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Complete Profile
            </Button>
            {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileCompletion;
