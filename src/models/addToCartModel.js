import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema(
  {
    // Logged-in user's ID
    userId: {
      type: String,
      required: true,
    },

    // Logged-in user's email
    email: {
      type: String,
      required: true,
    },

    // Property ID (string)
    propertyId: {
      type: String,
      required: true,
    },

    // When the item was added
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Auto adds createdAt & updatedAt
);

export default mongoose.model("AddToCartModel", addToCartSchema, "addToCart");
