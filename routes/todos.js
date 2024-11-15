const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Todo = require('../models/todo'); // Import Todo model

// POST /todos - Create a new to-do
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Ensure the title is provided
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTodo = new Todo({
      title,
      description
    });

    // Save the new todo
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Error creating to-do", details: err.message });
  }
});

// GET /todos - Retrieve all to-dos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find(); // Retrieves all to-dos
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving to-dos", details: err.message });
  }
});

// GET /todos/:id - Retrieve a specific to-do by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Ensure the id is a valid ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const todo = await Todo.findById(id); // Find by ObjectId
    if (!todo) {
      return res.status(404).json({ error: "To-do not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving to-do", details: err.message });
  }
});

// PUT /todos/:id - Update a specific to-do by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  // Ensure the id is a valid ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  // Ensure that title is provided
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    // Find the to-do and update it
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "To-do not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Error updating to-do", details: err.message });
  }
});

// DELETE /todos/:id - Delete a to-do by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Ensure the id is a valid ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "To-do not found" });
    }
    res.status(200).json({ message: "To-do deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting to-do", details: err.message });
  }
});

module.exports = router;
