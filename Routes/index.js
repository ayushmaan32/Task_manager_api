const express = require("express");

const router = express.Router();
// console.log("router");

const taskController = require("../Controllers/taskController");

router.post("/task", taskController.create);
router.get("/task", taskController.retrieve);
router.get("/task/:id", taskController.retrieveSingleTask);
router.put("/task/:id", taskController.update);
router.delete("/task/:id", taskController.delete);
module.exports = router;
