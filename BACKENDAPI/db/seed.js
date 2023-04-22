const mongoose = require("./connection");

const taskSeeds = require("./taskSeed.json");
const userSeeds = require("./userSeed.json");

const Task = require("../models/Task");
const User = require("../models/User");

Task.deleteMany().then(console.log);
Task.insertMany(taskSeeds).then(console.log).catch(console.error);

User.deleteMany().then(console.log);
User.insertMany(userSeeds)
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
