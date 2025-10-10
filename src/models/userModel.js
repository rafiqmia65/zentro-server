import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model, models } = mongoose;

// -----------------------------
// Create the User schema
// -----------------------------
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    token: {
      type: String,
      required: [true, "Name is required"],
    },
    photoUrl: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      select: false,
      default: null,
      validate: {
        validator: function (v) {
          if (!v) return true; // Skip validation if password is null
          return v.length >= 6;
        },
        message: "Password must be at least 6 characters",
      },
    },
    address: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "customer", "agent", "pending"],
      default: "customer",
    },
    accountCreatedAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedInfoAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
    collection: "users",
  }
);

// -----------------------------
// Pre-save middleware: Hash password and update timestamp
// -----------------------------
userSchema.pre("save", async function (next) {
  // Hash password only if it is modified
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Update 'updatedInfoAt' field whenever any user info is changed
  if (this.isModified()) {
    this.updatedInfoAt = new Date();
  }

  next();
});

// -----------------------------
// Export the User model
// -----------------------------
const userModel = models.User || model("User", userSchema);
export default userModel;
