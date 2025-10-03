import agentModel from "../models/agentModel.js";
import userModel from "../models/userModel.js"; 

// Create a new Agent (for logged-in user)
export const createAgent = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio, licenseNo, rating, totalSales, totalRentals, contactInfo } =
      req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }

    if (!licenseNo) {
      return res.status(400).json({ message: "License number is required" });
    }

    // Check if this user already applied as agent
    const existingAgent = await agentModel.findOne({ userId });
    if (existingAgent) {
      return res
        .status(400)
        .json({ message: "You have already applied as an agent" });
    }

    // Create agent
    const agent = await agentModel.create({
      userId,
      bio,
      licenseNo,
      rating,
      totalSales,
      totalRentals,
      contactInfo,
    });

    // Update user role to "agent"
    await userModel.findByIdAndUpdate(userId, { role: "agent" });

    return res.status(201).json({
      success: true,
      message: "Agent application successful and role updated",
      data: agent,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
