import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import agentModel from "../models/agentModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// secret 
// const SECRET = process.env.JWT_SECRET 
const SECRET = "TestSecretForNow"

/* --------------------------------------------------------------------------
 Create a New User (POST)
-------------------------------------------------------------------------- */
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, photoUrl, phone, address } = req.body;

    // Check if a user with this email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        data: null,
      });
    }

    // Create new user (password hashing handled by pre-save middleware)
    const newUser = new userModel({
      name,
      email,
      password,
      role,
      photoUrl,
      phone,
      address,
    });

    await newUser.save(); // Trigger pre("save") to hash password and set timestamps

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      data: { error: error.message },
    });
  }
};






/* --------------------------------------------------------------------------
 Get All Users (GET)
-------------------------------------------------------------------------- */
export const getUsers = async (req, res) => {
  try {
    // Fetch all users but exclude password for security
    const users = await userModel.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      data: { error: error.message },
    });
  }
};






/* --------------------------------------------------------------------------
 Get a Single User by ID (GET)
-------------------------------------------------------------------------- */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID and exclude password field
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    // Find agent info by userId (if exists)
    const agent = await agentModel.findOne({ userId: id });

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: {
        user,
        agent: agent || null,
      },
    });
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      data: { error: error.message },
    });
  }
};






/* --------------------------------------------------------------------------
 Update an Existing User (PATCH)
-------------------------------------------------------------------------- */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find user by ID and include password so it can be updated if provided
    const user = await userModel.findById(id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    // Apply only the provided updates dynamically
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    await user.save(); // Trigger pre("save") to handle password hashing & timestamps

    // Remove password before sending response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      data: { error: error.message },
    });
  }
};






/* --------------------------------------------------------------------------
 Delete all Users (DELETE)
-------------------------------------------------------------------------- */
export const deleteAllUser = async (req, res) => {
  try {
    const response = await userModel.deleteMany();

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Could not delete all users!!!",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "All Users deleted successfully",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      data: { error: error.message },
    });
  }
};









/* --------------------------------------------------------------------------
 Delete a User (DELETE)
-------------------------------------------------------------------------- */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the user by ID
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      data: { error: error.message },
    });
  }
};







/* --------------------------------------------------------------------------
 User Login (POST)
-------------------------------------------------------------------------- */
export const loginUser = async (req, res) => {
  try {
    // 1. Input validation
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Please send your credentials",
        data: null,
      });
    }

    const { email, password } = req.body;

    // 1. Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        data: null,
      });
    }

    // 2. Check if user exists (include password field explicitly)
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    // 3. Compare provided password with hashed password in DB
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        data: null,
      });
    }

    // 4. Remove password before sending response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // 5. JWT
    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: "1h" });
    userWithoutPassword.token = token

    // 6. Send response with user data (without password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      data: { error: error.message },
    });
  }
};
