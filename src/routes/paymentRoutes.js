import express from "express";
import { createPaymentIntent, savePayment } from "../controllers/paymentController.js";

const router = express.Router();

// Route to create a stripe-intent ;
router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-payment", savePayment);

export default router;
