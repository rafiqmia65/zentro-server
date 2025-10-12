import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";

const router = express.Router();

// Route to create a stripe-intent ;
router.post("/create-payment-intent", createPaymentIntent);

export default router;
