//============
//BASIC CONFIG
//============
const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt')
const app = express();
require("./db/connection");
const PORT = process.env.PORT;
app.set("port", process.env.PORT || 8000);

//==========
//MIDDLEWARE
//==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//===========
//ROUTES
//===========
app.get("/", (req, res) => {
  res.redirect("/tasks");
});

//===========
//CONTROLLERS
//===========
const taskController = require("./controllers/taskController");
app.use("/tasks", taskController);

const userController = require("./controllers/userController");
app.use("/", userController);

//============
//START SERVER
//============
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).send(message);
});

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🐲 🌟`);
});
