// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;  // Use environment port if available

// Import routes
const todoRoutes = require('./routes/todos');

// MongoDB connection string (from .env file)
const dbURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes
app.use('/todos', todoRoutes);

// Basic server setup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown handling (optional)
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit(0);
});
