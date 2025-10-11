// middlewares/verifyAdmin.js

import userModel from "../models/userModel.js";
import { verifyToken } from "./authMiddleware.js";


export const verifyAgent = async (req, res, next) => {
  // First verify the token
  verifyToken(req, res, async () => {
    try {
      // Find user from database
      const user = await userModel.findOne({ email: req.user.email });

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Check if user role is 'agent'
      if (user.role !== "agent") {
        return res.status(403).json({ success: false, message: "Access denied. Agents only." });
      }

      // Continue to controller
      next();
    } catch (err) {
      console.error("Agent verification failed:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
};
