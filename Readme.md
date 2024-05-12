# Task Management API

## Introduction

This Task Management API provides endpoints to manage tasks, including creating, retrieving, updating, and deleting tasks.

## Setup and Running the Application

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the server using `npm start`.

## API Endpoints

### 1. POST /create-task

- Creates a new task.

#### Request

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "pending"
}
```

### 2. GET /retrieveall-task

- Retrieve all task

### 3. GET /getSingle-task/:id

- Retrieve single task

### 4. DELETE /delete-task/:id

- Delete single task

### 5. PUT /update-task/:id

- Update single task
