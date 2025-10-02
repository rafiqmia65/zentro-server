import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userControlers.js";

const router = express.Router();

// -----------------------------
// User Routes
// -----------------------------

// Create a new user
router.post("/user", createUser);

// Get all users
router.get("/user", getUsers);

// Get single user by ID
router.get("/user/:id", getUserById);

// Update a user by ID
router.patch("/user/:id", updateUser);

// Delete a user by ID
router.delete("/user/:id", deleteUser);

export default router;
