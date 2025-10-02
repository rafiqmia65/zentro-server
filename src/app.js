import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/property", propertyRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Zentro Place Server is Cooking!" });
});

export default app;
