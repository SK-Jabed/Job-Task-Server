require("dotenv").config();
const app = require("./src/server");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`AI Scholar server is running on port: ${port}`);
});

// TaskWiz
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.baizo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    // await client.connect();

    // Collections of Database
    // const database = client.db("taskMartDB");
    // const userCollection = database.collection("users");
    // const taskCollection = database.collection("tasks");

    // Collections
    const db = client.db("taskWizDB");
    const userCollection = db.collection("users");
    const taskCollection = db.collection("tasks");

    // Save All Users Data on Database (POST /users)
    app.post("/users", async (req, res) => {
      const user = req.body;

      const query = { email: user.email };

      // Check if User is already exist in DB
      const isExist = await userCollection.findOne(query);

      if (isExist) {
        return res.status(200).send({
          success: true,
          exists: true,
          message: "User already exists",
        });
      }

      const result = await userCollection.insertOne(user);
      res.status(201).send({
        success: true,
        exists: false,
        insertedId: result.insertedId,
      });
    });

    // GET ALL USERS (GET /users)
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // ADD A NEW TASK (POST /tasks)
    app.post("/tasks", async (req, res) => {
      try {
        const { title, description, category, user } = req.body;

        if (!user || !user.email || !user.name) {
          return res
            .status(400)
            .json({ message: "User information is required" });
        }

        if (!title || title.length > 50) {
          return res.status(400).send({
            success: false,
            message: "Title is required (max 50 chars)",
          });
        }

        const newTask = {
          title,
          description: description?.substring(0, 200) || "",
          category: category || "To-Do",
          timestamp: new Date(),
          user: {
            name: user.name,
            email: user.email,
          },
          index: 0,
        };

        const result = await taskCollection.insertOne(newTask);
        res.status(201).json(result);
      } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // GET TASKS BY USER EMAIL (GET /tasks)
    app.get("/tasks", async (req, res) => {
      try {
        const email = req.query.email;

        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }

        const tasks = await taskCollection
          .find({ "user.email": email })
          .toArray();
        res.json(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // GET ALL TASK (GET /allTasks)
    app.get("/allTasks", async (req, res) => {
      const allTasks = await taskCollection.find().toArray();
      res.send(allTasks);
    });

    // UPDATE TASK (PUT /tasks/:id)
    app.put("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const { title, description, category } = req.body;

      if (!ObjectId.isValid(id)) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid task ID" });
      }

      const updateTask = {
        ...(title && { title }),
        ...(description && { description: description.substring(0, 200) }),
        ...(category && { category }),
      };

      const result = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateTask }
      );

      if (result.matchedCount === 0) {
        return res
          .status(404)
          .send({ success: false, message: "Task not found" });
      }

      res.send({ success: true, message: "Task updated successfully" });
    });

    // UPDATE TASK CATEGORY (PUT /tasks/:id/category)
    app.put("/tasks/:id/category", async (req, res) => {
      const { id } = req.params;
      const { category } = req.body;

      if (!ObjectId.isValid(id)) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid task ID" });
      }

      const result = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { category } }
      );

      if (result.matchedCount === 0) {
        return res
          .status(404)
          .send({ success: false, message: "Task not found" });
      }

      res.send({
        success: true,
        message: "Task category updated successfully",
      });
    });

    // DELETE TASK (DELETE /tasks/:id)
    app.delete("/tasks/:id", async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid task ID" });
      }

      const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .send({ success: false, message: "Task not found" });
      }

      res.send({ success: true, message: "Task deleted successfully" });
    });

    // Check connection to MongoDB
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Clean-up (optional, but ensure proper handling)
    // await client.close();
  }
}

run().catch(console.dir);

// Default route
app.get("/", (req, res) => {
  res.send("Hello from TaskMart Server...");
});

// Start the server
app.listen(port, () => {
  console.log(`TaskMart Server is running on PORT: ${port}`);
});
