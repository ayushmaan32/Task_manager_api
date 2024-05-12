// Create the Task model
const mongoose = require("mongoose");
const Task = require("../models/Task");

// create a new task
module.exports.create = async function (req, res) {
  try {
    const { title, description, status } = req.body;

    // Validate inputs
    if (!title || !description || !status) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newTask = await Task.create({ title, description, status });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all task
module.exports.retrieve = async function (req, res) {
  try {
    const tasks = await Task.find();
    if (!task) {
      res.status(404).json({ message: "Tasks not found" });
    }
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single task
module.exports.retrieveSingleTask = async function (req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(400).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update a task by its Id
module.exports.update = async function (req, res) {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a task by its ID
module.exports.delete = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
