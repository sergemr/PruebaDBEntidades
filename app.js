// app.js

const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors"); // Import the cors middleware

const app = express();
// Use cors middleware
app.use(cors());
const PORT = process.env.PORT || 3008;

// Database connection
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "1234",
  database: "test_db",
});
// Entity class for dynamic table creation
class Entity {
  constructor(name, fields) {
    this.name = name;
    this.model = sequelize.define(name, fields);
  }

  async sync() {
    await this.model.sync({ force: true });
    console.log(`Table for ${this.name} synchronized`);
  }
}

// Define a simple schema for the User entity
const noteSchema = {
  note_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

const userSchema = {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

// Create User entity using the schema
const User = new Entity("User", userSchema);
const Note = new Entity("Note", noteSchema);

// Synchronize the database with the defined models
// This will create the tables if they do not exist
// and will not alter the tables if they do exist
// It will also create the tables with the defined schema
// it will delete the information in the table

const syncDatabase = async () => {
  sequelize
    .sync()
    .then(async () => {
      await User.sync();
      await Note.sync();
    })
    .catch((error) => {
      console.error("Error synchronizing database:", error);
    });
};
syncDatabase();
// Express middleware for parsing JSON
app.use(express.json());

// Express route to create a new user
app.post("/users", async (req, res) => {
  console.log("req.body");
  console.log(req.body);
  try {
    const { user_email } = req.body;
    const { user_name } = req.body;
    const newUser = await User.model.create({ user_email, user_name });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Express route to get a user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.model.findByPk(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Express route to get all users
app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.model.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    console.log("req.body");
    console.log(req.body);
    const user = await User.model.findOne({
      where: { user_name, user_password },
    });

    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { user_email, user_name, user_password } = req.body;
    const newUser = await User.model.create({
      user_email,
      user_name,
      user_password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.model.findByPk(userId);
    console.log("user");
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
