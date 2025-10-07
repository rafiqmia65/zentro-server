import Agent from "../models/agentModel.js";
import User from "../models/userModel.js";

export const createAgent = async (req, res) => {
  try {
    const { userId, email, name, bio, licenseNo, officeAddress } = req.body;

    console.log(req.body);

    if (!userId || !email || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exists = await Agent.findOne({ userId });
    if (exists) {
      return res.status(400).json({ message: "You already applied as agent" });
    }

    const agent = await Agent.create({
      userId,
      email,
      name,
      bio,
      licenseNo,
      officeAddress,
    });

    await User.findByIdAndUpdate(userId, { role: "pending" });

    return res.status(201).json({
      success: true,
      message: "Agent application submitted. Waiting for admin approval.",
      data: agent,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* --------------------------------------------------------------------------
 Get All Agents
-------------------------------------------------------------------------- */
export const getAllAgents = async (req, res) => {
  try {
    const agents = await agentModel.find();
    return res.status(200).json({
      success: true,
      count: agents.length,
      data: agents,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* --------------------------------------------------------------------------
 Get Single Agent
-------------------------------------------------------------------------- */
export const getSingleAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const agent = await agentModel.findById(agentId);

    if (!agent) return res.status(404).json({ message: "Agent not found" });

    return res.status(200).json({ success: true, data: agent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* --------------------------------------------------------------------------
 Update Agent
-------------------------------------------------------------------------- */
export const updateAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const updateData = req.body;

    const updatedAgent = await agentModel.findByIdAndUpdate(
      agentId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAgent)
      return res.status(404).json({ message: "Agent not found" });

    return res.status(200).json({
      success: true,
      message: "Agent updated successfully",
      data: updatedAgent,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* --------------------------------------------------------------------------
 Delete Agent
-------------------------------------------------------------------------- */
export const deleteAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const agent = await agentModel.findById(agentId);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    await agentModel.findByIdAndDelete(agentId);
    await userModel.findByIdAndUpdate(agent.userId, { role: "customer" });

    return res.status(200).json({
      success: true,
      message: "Agent deleted and user reverted to 'customer'",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* --------------------------------------------------------------------------
 Approve or Reject Agent (Admin Only)
-------------------------------------------------------------------------- */
export const changeAgentStatus = async (req, res) => {
  try {
    const { agentId } = req.params;
    const { status } = req.body; // "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const agent = await agentModel.findByIdAndUpdate(
      agentId,
      { status },
      { new: true }
    );

    if (!agent) return res.status(404).json({ message: "Agent not found" });

    // update user role based on status
    await userModel.findByIdAndUpdate(agent.userId, {
      role: status === "approved" ? "agent" : "customer",
    });

    return res.status(200).json({
      success: true,
      message: `Agent status updated to ${status}`,
      data: agent,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
