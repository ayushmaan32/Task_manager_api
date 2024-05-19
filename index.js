const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

const db = require("./config/mongoose");

// Middleware
app.use(bodyParser.json());

app.use("/", require("./Routes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error in running on port: ${PORT}`);
  }
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
