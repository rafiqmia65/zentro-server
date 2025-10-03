import express from "express";
import { createAgent } from "../controllers/agentControlers.js";

const router = express.Router();

router.post('/:userId/add-agent',createAgent)

export default router;
