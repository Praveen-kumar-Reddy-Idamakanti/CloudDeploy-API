// src/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create task
router.post('/', async (req, res) => {
  const { title, description, completed } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  try {
    const task = await Task.create(title, description, completed);
    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    console.error('List tasks error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error('Get task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const updated = await Task.update(req.params.id, { title, description, completed });
    res.json(updated);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
