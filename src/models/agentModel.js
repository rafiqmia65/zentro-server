import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const agentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
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
    totalSales: {
      type: Number,
      default: 0,
    },
    totalRentals: {
      type: Number,
      default: 0,
    },
    contactInfo: {
      officeAddress: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const agentModel = models.Agent || model("Agent", agentSchema);
export default agentModel;
