import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { submitReview } from '../../api/api';

const SubmitReview = ({ bookId }) => {
  const [formData, setFormData] = useState({ rating: '', review: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview(bookId, formData);
      // Handle successful review submission
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h5" gutterBottom>
            Submit Review
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="number"
              name="rating"
              label="Rating (1-5)"
              variant="outlined"
              value={formData.rating}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="review"
              label="Review"
              variant="outlined"
              value={formData.review}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Submit Review
            </Button>
            {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SubmitReview;
