import express from "express";
import {
  createProperty,
  getAllProperty,
} from "../controllers/propertyControlers.js";

const router = express.Router();

// create  post
router.post("/add-property", createProperty);
router.get("/get-all-property", getAllProperty);

export default router;
