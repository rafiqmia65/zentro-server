import express from "express";
import {
  changeAgentStatus,
  createAgent,
  deleteAgent,
  getAllAgents,
  getSingleAgent,
  updateAgent,
} from "../controllers/agentControllers.js";

const router = express.Router();

// -----------------------------
// Create a new agent (User applies as agent)
// -----------------------------
router.post("/", createAgent);

// -----------------------------
// Get all agents
// -----------------------------
router.get("/", getAllAgents);

// -----------------------------
// Get a single agent by agentId
// -----------------------------
router.get("/:agentId", getSingleAgent);

// -----------------------------
// Update agent details
// Only the agent/admin should do this
// -----------------------------
router.patch("/:agentId", updateAgent);

// -----------------------------
// Delete an agent
// -----------------------------
router.delete("/:agentId", deleteAgent);

// -----------------------------
// Change agent status (Admin Only)
// -----------------------------
router.patch("/status/:agentId", changeAgentStatus);

export default router;
