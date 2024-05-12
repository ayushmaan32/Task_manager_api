const request = require("supertest");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const app = require("../index");
const db = require("../config/mongoose");

describe("Task Management API", () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe("POST /create-task", () => {
    test("creates a new task", async () => {
      const newTask = {
        title: "Test Task",
        description: "Description for test task",
        status: "pending",
      };

      const res = await request(app)
        .post("/create-task")
        .send(newTask)
        .expect(201);

      expect(res.body.title).toBe(newTask.title);
      expect(res.body.description).toBe(newTask.description);
      expect(res.body.status).toBe(newTask.status);

      const task = await Task.findOne({ title: newTask.title });
      expect(task).toBeTruthy();
    });

    test("returns 400 if title or description is missing", async () => {
      const invalidTask = {
        description: "Description for test task",
        status: "pending",
      };

      await request(app).post("/create-task").send(invalidTask).expect(400);

      const tasks = await Task.find();
      expect(tasks.length).toBe(0);
    });
  });

  describe("GET /retrieveall-task", () => {
    test("retrieves all tasks", async () => {
      // Create sample tasks
      await Task.create([
        {
          title: "Task 1",
          description: "Description for Task 1",
          status: "pending",
        },
        {
          title: "Task 2",
          description: "Description for Task 2",
          status: "completed",
        },
      ]);

      // Make GET request to retrieve all tasks
      const res = await request(app).get("/retrieveall-task").expect(200);

      // Assertions
      expect(res.body.length).toBe(2);
    });
  });

  describe("GET /getSingle-task/:id", () => {
    test("retrieves a single task by its ID", async () => {
      // Create a sample task in the database
      const newTask = await Task.create({
        _id: "1",
        title: "Test Task",
        description: "Description for test task",
        status: "pending",
      });

      // Make GET request to retrieve the task by its ID
      const res = await request(app)
        .get(`/getSingle-task/${newTask._id}`)
        .expect(200);

      // Assertions
      expect(res.body.title).toBe(newTask.title);
      expect(res.body.description).toBe(newTask.description);
      expect(res.body.status).toBe(newTask.status);
    });

    test("returns 404 if task with given ID does not exist", async () => {
      // Make GET request with an invalid task ID
      await request(app).get("/getSingle-task/invalid-id").expect(400);
    });
  });

  describe("PUT /update-task/:id", () => {
    test("updates a task by its ID", async () => {
      // Create a sample task in the database
      const newTask = await Task.create({
        title: "Test Task",
        description: "Description for test task",
        status: "pending",
      });

      // Updated task data
      const updatedTaskData = {
        title: "Updated Task Title",
        description: "Updated description",
        status: "in progress",
      };

      // Make PUT request to update the task by its ID
      const res = await request(app)
        .put(`/update-task/${newTask._id}`)
        .send(updatedTaskData)
        .expect(200);

      // Assertions
      expect(res.body.title).toBe(updatedTaskData.title);
      expect(res.body.description).toBe(updatedTaskData.description);
      expect(res.body.status).toBe(updatedTaskData.status);

      // Fetch the updated task from the database and verify its properties
      const updatedTask = await Task.findById(newTask._id);
      expect(updatedTask.title).toBe(updatedTaskData.title);
      expect(updatedTask.description).toBe(updatedTaskData.description);
      expect(updatedTask.status).toBe(updatedTaskData.status);
    });

    test("returns 404 if task with given ID does not exist", async () => {
      // Make PUT request with an invalid task ID
      await request(app).put("/update-task/invalid-id").expect(404);
    });
  });

  describe("DELETE /delete-task/:id", () => {
    test("deletes a task by its ID", async () => {
      // Create a sample task in the database
      const newTask = await Task.create({
        title: "Test Task",
        description: "Description for test task",
        status: "pending",
      });

      // Make DELETE request to delete the task by its ID
      await request(app).delete(`/delete-task/${newTask._id}`).expect(204);

      // Verify the task is deleted from the database
      const deletedTask = await Task.findById(newTask._id);
      expect(deletedTask).toBeNull();
    });

    test("returns 404 if task with given ID does not exist", async () => {
      // Make DELETE request with an invalid task ID
      await request(app).delete("/delete-task/invalid-id").expect(404);
    });
  });
});
