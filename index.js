// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // Allows the server to parse JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,  // Optional: Timeout for MongoDB server selection
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit the process if the DB connection fails
  });

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API');
});

// Import routes for To-Do functionality
const todoRoutes = require('./routes/todos');  // Ensure the path to todos.js is correct
app.use('/todos', todoRoutes);  // All "/todos" routes will be handled by todoRoutes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

