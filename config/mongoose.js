const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/taskManager", {
  family: 4,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "error on connectiong to db"));
db.once("open", function () {
  console.log("connected to database :: MongoDB");
});

module.exports = db;
