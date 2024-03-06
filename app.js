// app.js

const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 3000;

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
};

// Create User entity using the schema
const User = new Entity("User", userSchema);

// Synchronize the database with the defined models
sequelize
  .sync()
  .then(async () => {
    await User.sync();
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

// Express middleware for parsing JSON
app.use(express.json());

// Express route to create a new user
app.post("/users", async (req, res) => {
  try {
    const { user_email } = req.body;
    const newUser = await User.model.create({ user_email });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
