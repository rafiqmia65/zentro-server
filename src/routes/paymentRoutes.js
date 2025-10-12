import express from "express";
import { createPaymentIntent, savePayment } from "../controllers/paymentController.js";

const router = express.Router();

// Route to create a stripe-intent ;
router.post("/create-payment-intent", createPaymentIntent);
router.post("/save-payment", savePayment);

export default router;
