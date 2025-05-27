# TaskMart - Server Side

## 📌 Project Overview

The **TaskMart Server** is the backend service for a task management application. It provides a robust API for managing user authentication, task creation, updating, deletion, and real-time synchronization of task statuses. Built with **Node.js, Express.js, and MongoDB**, it ensures a seamless and efficient backend for task tracking.

## 🎯 Purpose

The purpose of this server is to:

- Provide **authentication** using Firebase Authentication.
- Manage **tasks** categorized into **To-Do, In Progress, and Done**.
- Enable **real-time updates** for task reordering and status changes.
- Store **user and task data** securely in MongoDB.

## 🚀 Live Site

> 🔗 **Live Demo:** [TaskMart Live Site](https://taskmart-07-app.web.app/)

---

## 🔑 Key Functionalities

- **User Authentication**: Google Sign-In via Firebase.
- **Task CRUD Operations**:
  - Add a new task.
  - Retrieve tasks by user email.
  - Update task details (title, description, category).
  - Delete a task permanently.
- **Drag-and-Drop Task Management**:
  - Reorder tasks within a category.
  - Move tasks between categories.
- **Real-Time Updates**:
  - Optimistic UI updates with backend sync.
  - WebSockets or Change Streams for instant synchronization.
- **Secure & Scalable**:
  - Uses MongoDB for persistent storage.
  - Implements CORS for secure API access.

---

## 🛠️ Technologies Used

| Technology                  | Purpose                              |
| --------------------------- | ------------------------------------ |
| **Node.js**                 | Backend runtime                      |
| **Express.js**              | Web framework for building APIs      |
| **MongoDB**                 | NoSQL database for task storage      |
| **Firebase Authentication** | User authentication                  |
| **Mongoose**                | MongoDB ODM for easy schema handling |
| **CORS**                    | Secure cross-origin API access       |
| **Morgan**                  | HTTP request logger                  |
| **Dotenv**                  | Environment variable management      |

---

## 📌 API Endpoints Reference

### 🔹 User Management

#### ➤ Save User Data

**`POST /users`**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

✅ Saves user details in the database.

#### ➤ Get All Users

**`GET /users`**
✅ Retrieves all users from the database.

---

### 🔹 Task Management

#### ➤ Add a New Task

**`POST /tasks`**

```json
{
  "title": "Complete project",
  "description": "Finish the task management app",
  "category": "To-Do",
  "user": {
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
```

✅ Adds a new task to the database.

#### ➤ Get All Tasks for a User

**`GET /tasks?email=johndoe@example.com`**
✅ Retrieves all tasks for the authenticated user.

#### ➤ Get All Tasks (Admin)

**`GET /allTasks`**
✅ Fetches all tasks from the database.

#### ➤ Update a Task

**`PUT /tasks/:id`**

```json
{
  "title": "Update project",
  "description": "Modify task details",
  "category": "In Progress"
}
```

✅ Updates an existing task.

#### ➤ Delete a Task

**`DELETE /tasks/:id`**
✅ Permanently removes a task from the database.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/sk-jabed/taskmart-server.git
cd task-mart-server
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add:

```
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=5000
```

### 4️⃣ Run the Server

```sh
npm start
```

The server should now be running on **http://localhost:5000**.

---

## 📦 Dependencies

| Package     | Version | Purpose                          |
| ----------- | ------- | -------------------------------- |
| **express** | ^4.21.2 | Web framework                    |
| **mongodb** | ^6.13.0 | MongoDB database driver          |
| **dotenv**  | ^16.4.7 | Environment variables management |
| **cors**    | ^2.8.5  | Enable CORS for API requests     |
| **morgan**  | ^1.10.0 | HTTP request logger              |

---

## 🔮 Future Enhancements

- ✅ **Real-time WebSocket support** for live task updates.
- ✅ **User role management** (Admin/User).
- ✅ **Task priorities** (High, Medium, Low).
- ✅ **Task deadline & reminders**.

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

- **Sheikh Jabed** 🚀  
  [GitHub](https://github.com/SK-Jabed)

---
