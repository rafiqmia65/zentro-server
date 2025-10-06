import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // discount: {
    //   type: Number,
    //   default: 0,
    // },
    // sellingPrice: {
    //   type: Number,
    // },
    propertyType: {
      type: String,
      enum: ["apartment", "house", "commercial", "land"],
      required: true,
    },
    propertyFeatures: {
      type: [String],
      enum: [
        "parking",
        "gym",
        "swimming pool",
        "garden",
        "home theater",
        "balcony",
        "terrace",
        "fireplace",
        "air conditioning",
        "solar panels",
        "storage room",
        "elevator",
        "security system",
      ],
      default: [],
    },
    propertyArea: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        // enum: ["sq ft", "sq m", "acre", "hectare", "marla", "bigha"],
        required: true,
      },
    },

    images: {
      type: String,
      required: true,
    },
    // videos: { type: String },
    // view360: {
    //   type: String,
    // },
    // documentimage: {
    //   type: String,
    // },
    likes: {
      type: Number,
      default: 0,
    },
    location: {
      // address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      // country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["processing", "selled", "unselled"],
      default: "unselled",
    },
  },
  { timestamps: true }
);

// sellingPrice auto-calculate
propertySchema.pre("save", function (next) {
  if (this.discount > 0) {
    this.sellingPrice = this.price - (this.price * this.discount) / 100;
  } else {
    this.sellingPrice = this.price;
  }
  next();
});

export default mongoose.model("Property", propertySchema);
