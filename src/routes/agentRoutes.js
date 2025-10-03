import express from "express";
import {
  createAgent,
  deleteAgent,
  getAllAgent,
  getSingleAgent,
} from "../controllers/agentControlers.js";

const router = express.Router();

// crate a agent
router.post("/:userId/add-agent", createAgent);

// get all agent
router.get("/get-all-agent", getAllAgent);

// get single agent
router.get("/get-single-agent/:agentId", getSingleAgent);

// delete agent
router.delete('/delete-agent/:agentId',deleteAgent)

export default router;
