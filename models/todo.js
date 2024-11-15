const mongoose = require('mongoose');

// Define the schema for a to-do item
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  completed: { type: Boolean, default: false }
});

// Create a model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
