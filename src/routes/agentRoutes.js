import express from "express";
import { createAgent, getAllAgent } from "../controllers/agentControlers.js";

const router = express.Router();

// crate a agent
router.post("/:userId/add-agent", createAgent);

// get all agent
router.get("/get-all-agent", getAllAgent);

export default router;
