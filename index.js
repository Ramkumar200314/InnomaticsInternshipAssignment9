const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Import routes
const todoRoutes = require('./routes/todos');

// MongoDB connection string (use your Atlas or local MongoDB URI)
const dbURI = 'mongodb+srv://ramkumar20034:gykE0RU4hGEU4mOo@cluster0.tqk6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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
