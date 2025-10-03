import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userControlers.js";

const router = express.Router();

// -----------------------------
// User Routes
// -----------------------------

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/", getUsers);

// SignIn
router.post("/signin", loginUser);

// Get single user by ID
router.get("/:id", getUserById);

// Update a user by ID
router.patch("/:id", updateUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

export default router;
