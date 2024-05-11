# Task Management API

## Introduction

This Task Management API provides endpoints to manage tasks, including creating, retrieving, updating, and deleting tasks.

## Setup and Running the Application

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the server using `npm start`.

## API Endpoints

### 1. POST /task

- Creates a new task.

#### Request

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "pending"
}
```

### 2. GET /task

- Retrieve all task

### 3. GET /task/:id

- Retrieve single task

### 4. DELETE /task/:id

- Delete single task

### 5. PUT /task/:id

- Update single task
