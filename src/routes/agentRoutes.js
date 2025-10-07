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
// Frontend sends userId as param
// Role will be "pending" until admin approves
// -----------------------------
router.post("/", createAgent);

// -----------------------------
// Get all agents
// Useful for admin panel or listing all agents
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
// User role will revert back to "customer"
// -----------------------------
router.delete("/:agentId", deleteAgent);

// -----------------------------
// Change agent status (Admin Only)
// Approve or Reject agent application
// If approved → role: "agent", if rejected → role: "customer"
// -----------------------------
router.patch("/status/:agentId", changeAgentStatus);

export default router;
