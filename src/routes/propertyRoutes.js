import express from "express";
import {
  createProperty,
  getAllProperty,
  singleProperty,
} from "../controllers/propertyControlers.js";

const router = express.Router();

// create  post
router.post("/add-property", createProperty);

// get all porperty
router.get("/get-all-property", getAllProperty);

// sinle get property
router.get("/get-single-property/:id", singleProperty);

export default router;
