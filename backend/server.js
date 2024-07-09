// api.js (backend)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());

let users = [];
let tokens = new Set(); // Use a Set to store tokens for O(1) lookup

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log('Incoming Token:', token);  // Debugging: Log the incoming token
  if (!token || !tokens.has(token)) {
    console.log('Unauthorized Access Attempt');  // Debugging: Log unauthorized access
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Routes
app.post('/api/register', (req, res) => {
  const { email, username, password } = req.body;
  const userExists = users.some(user => user.email === email);

  if (userExists) {
    res.status(400).json({ message: 'User with this email already exists' });
  } else {
    const newUser = { id: uuidv4(), email, username, password };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
  } else {
    const token = uuidv4(); // Generate a random token (for demo purposes)
    tokens.add(token); // Store token in tokens Set
    console.log('User Logged In, Token Generated:', token);  // Debugging: Log the generated token
    res.status(200).json({ message: 'Login successful', token, user });
  }
});

app.get('/api/user', verifyToken, (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log('User Data Retrieval Attempt with Token:', token);  // Debugging: Log the token used for user data retrieval
  const user = users.find(user => tokens.has(token));
  if (!user) {
    console.log('Unauthorized Access for User Data Retrieval');  // Debugging: Log unauthorized access for user data
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    console.log('User Data Retrieved:', user);  // Debugging: Log the retrieved user data
    res.status(200).json(user);
  }
});
// routes for Book Management
app.get('/api/books', verifyToken, (req, res) => {
  res.status(200).json(books);
});

app.get('/api/books/:id', verifyToken, (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    res.status(200).json(book);
  }
});

app.post('/api/books', verifyToken, (req, res) => {
  const { title, author, genre, description } = req.body;
  const newBook = { id: books.length + 1, title, author, genre, description };
  books.push(newBook);
  res.status(201).json({ message: 'Book added successfully', book: newBook });
});

app.put('/api/books/:id', verifyToken, (req, res) => {
  const { title, author, genre, description } = req.body;
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    books[bookIndex] = { id: parseInt(req.params.id), title, author, genre, description };
    res.status(200).json({ message: 'Book updated successfully', book: books[bookIndex] });
  }
});

app.delete('/api/books/:id', verifyToken, (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    books.splice(bookIndex, 1);
    res.status(200).json({ message: 'Book deleted successfully' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
