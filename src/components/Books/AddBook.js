// components/AddBookForm.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { addBook } from '../../api/api';

const AddBookForm = ({ token, onAddBook }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addBook(formData, token);
      onAddBook(data.book); // Update the book list with the new book
      setError('');
      setFormData({
        title: '',
        author: '',
        genre: '',
        description: '',
      });
    } catch (err) {
      setError(err.message || 'An error occurred while adding the book.');
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add New Book
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="title"
              label="Title"
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="author"
              label="Author"
              variant="outlined"
              value={formData.author}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="genre"
              label="Genre"
              variant="outlined"
              value={formData.genre}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="description"
              label="Description"
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Add Book
            </Button>
            {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddBookForm;
