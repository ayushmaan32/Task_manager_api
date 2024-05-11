const mongoose = require("mongoose");

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
});

// Indexes for performance optimization
taskSchema.index({ creationDate: 1 }); // Index on creationDate for sorting tasks by creation date
taskSchema.index({ status: 1 }); // Index on status for filtering tasks by status

// Create the Task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
