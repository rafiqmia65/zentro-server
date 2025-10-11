// middlewares/verifyAdmin.js

import userModel from "../models/userModel.js";
import { verifyToken } from "./authMiddleware.js";


export const verifyAdmin = async (req, res, next) => {
  // First verify the token
  verifyToken(req, res, async () => {
    try {
      // Find user from database
      const user = await userModel.findOne({ email: req.user.email });

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Check if user role is 'admin'
      if (user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
      }

      // ✅ Continue to controller
      next();
    } catch (err) {
      console.error("Admin verification failed:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
};
