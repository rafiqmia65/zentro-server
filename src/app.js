const express = require("express");
const cors = require("cors");
const app = express();
// All Routes

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Zentro Place Server is Cooking!" });
});

module.exports = app;
