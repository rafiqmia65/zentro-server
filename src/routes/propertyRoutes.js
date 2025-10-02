import express from "express";
import {
  createProperty,
  deleteProperty,
  getAllProperty,
  singleProperty,
  updateProperty,
} from "../controllers/propertyControlers.js";

const router = express.Router();

// create  post
router.post("/add-property", createProperty);

// get all porperty
router.get("/get-all-property", getAllProperty);

// sinle get property
router.get("/get-single-property/:id", singleProperty);

// update property by id
router.patch("/update-property/:id", updateProperty);

// DELETE property by ID
router.delete("/delete-property/:id", deleteProperty);

export default router;
