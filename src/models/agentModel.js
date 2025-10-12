import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const agentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    bio: { type: String, trim: true },
    licenseNo: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSales: { type: Number, default: 0 },
    totalRentals: { type: Number, default: 0 },
    officeAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const agentModel = models.Agent || model("Agent", agentSchema);
export default agentModel;
