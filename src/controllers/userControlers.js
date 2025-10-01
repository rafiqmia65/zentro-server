import userModel from "../models/userModel";
import bcrypt from "bcryptjs";

// -----------------------------
// Create a new user (POST)
// -----------------------------
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, photoUrl, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new userModel({
      name,
      email,
      password,
      role,
      photoUrl,
      phone,
      address,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -----------------------------
// Get all users
// -----------------------------
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -----------------------------
// Get single user (GET)
// -----------------------------
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -----------------------------
// Update a user (PATCH)
// -----------------------------
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -----------------------------
// Delete a user (DELETE)
// -----------------------------
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
