const express = require("express");

const router = express.Router();

const taskController = require("../Controllers/taskController");

// Routes
router.post("/create-task", taskController.create);
router.get("/retrieveall-task", taskController.retrieve);
router.get("/getSingle-task/:id", taskController.retrieveSingleTask);
router.put("/update-task/:id", taskController.update);
router.delete("/delete-task/:id", taskController.delete);

module.exports = router;
