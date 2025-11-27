// src/server.js
const express = require('express');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware: Allows the app to read JSON bodies from requests
app.use(express.json());

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import and use Auth Routes
app.use('/api/auth', require('./routes/auth'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));