import express from "express";
import {
  createAgent,
  deleteAgent,
  getAllAgent,
  getSingleAgent,
  updateAgent,
} from "../controllers/agentControlers.js";

const router = express.Router();

// app.use("/api/v1/agent", AgentRoutes);

// crate a agent
router.post("/:userId/add-agent", createAgent);

// get all agent
router.get("/get-all-agent", getAllAgent);

// get single agent
router.get("/get-single-agent/:agentId", getSingleAgent);

// Update agent
router.put("/update-agent/:agentId", updateAgent);

// delete agent
router.delete("/delete-agent/:agentId", deleteAgent);

export default router;
