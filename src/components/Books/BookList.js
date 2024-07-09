// components/BookList.js

import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { fetchBooks } from '../../api/api';

const BookList = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to fetch books.');
      }
    };
    fetchBooksData();
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Book List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {books.map((book) => (
          <ListItem key={book.id} button>
            <ListItemText primary={book.title} secondary={book.author} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default BookList;
