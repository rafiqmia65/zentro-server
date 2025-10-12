import mongoose from "mongoose";

// Property Schema
const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Property description is required"],
    },
    images: {
      type: String,
      required: [true, "Property image is required"],
      trim: true,
    },
    addedBy:{
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Property price is required"],
      min: 0,
    },
    // Property features will be displayed as checkboxes
    // When the agent adds a property, they will select features using checkboxes from the available options
    propertyCategory: {
      type: String,
      required: [true, "Property category is required"],
    },
    // Property features will be displayed as checkboxes
    // When the agent adds a property, they will select features using checkboxes from the available options

    propertyFeatures: {
      type: [String],
      default: [],
    },
    propertyArea: {
      value: {
        type: Number,
        required: [true, "Property area value is required"],
        min: 0,
      },
      unit: {
        type: String,
        default: "sq ft",
      },
    },
    likes: {
      type: Number,
      default: 0,
    },
    location: {
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "State is required"] },
    },
    status: {
      type: String,
      default: "available",
    },
  },
  { timestamps: true }
);

// Export Property model
export default mongoose.model("Property", propertySchema);
