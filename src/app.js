import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Zentro Place Server is Cooking!" });
});

export default app;
