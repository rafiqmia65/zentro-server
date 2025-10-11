import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  deleteAllUser,
} from "../controllers/userControllers.js";
import { verifyAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// -----------------------------
// User Routes
// -----------------------------

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/", verifyAdmin, getUsers);

// SignIn
router.post("/signin", loginUser);

// Delete all users
router.delete("/delete-all", deleteAllUser);

// Get single user by ID
router.get("/:id", getUserById);

// Update a user by ID
router.patch("/:id",verifyAdmin, updateUser);

// Delete a user by ID
router.delete("/:id",verifyAdmin, deleteUser)

export default router;
