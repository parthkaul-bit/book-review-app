// components/BookDetails.js

import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { fetchBookDetails } from '../../api/api';

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookDetailsData = async () => {
      try {
        const data = await fetchBookDetails(bookId);
        setBook(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to fetch book details.');
      }
    };
    fetchBookDetailsData();
  }, [bookId]);

  if (!book) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {book.title} by {book.author}
      </Typography>
      <Typography variant="body1">{book.description}</Typography>
      {/* Add more details as needed */}
    </>
  );
};

export default BookDetails;
