import express from "express";
import {
  createAgent,
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

export default router;
