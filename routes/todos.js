// routes/todos.js
const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/todo'); // Import Todo model

const router = express.Router();

// POST /todos - Create a new to-do
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTodo = new Todo({
      title,
      description
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Error creating to-do", details: err.message });
  }
});

// GET /todos - Retrieve all to-dos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving to-dos", details: err.message });
  }
});

// GET /todos/:id - Retrieve a specific to-do by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const todo = await Todo.findById(id);
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
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
