const mongoose = require('mongoose');

// Define the schema for a to-do item
const todoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,  // Title is required
  },
  description: { 
    type: String, 
    required: false,  // Description is optional
  },
  completed: { 
    type: Boolean, 
    default: false  // Default value for completed is false
  }
});

// Create a model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
