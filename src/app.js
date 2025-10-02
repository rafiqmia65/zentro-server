const express = require("express");
// import express form ""
const cors = require("cors");
const app = express();
// All Routes
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors());
app.use(express.json());

app.use("api/", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Zentro Place Server is Cooking!" });
});

module.exports = app;
