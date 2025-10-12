import express from "express";
import {
  createProperty,
  deleteProperty,
  getAllProperty,
  getDashboardProperty,
  singleProperty,
  updateProperty,
} from "../controllers/propertyControllers.js";

const router = express.Router();

router.post("/get-dashboard-property", getDashboardProperty);

// Create a new property
router.post("/add-property", createProperty);

// Get all properties
router.get("/get-all-property", getAllProperty);

// Get a single property by ID
router.get("/get-single-property/:propertyId", singleProperty);

// Update a property by ID
router.patch("/update-property/:propertyId", updateProperty);

// Delete a property by ID
router.delete("/delete-property/:propertyId", deleteProperty);

export default router;
