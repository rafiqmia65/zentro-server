import express from "express";
import {
  createPayment,
  createPaymentIntent,
} from "../controllers/paymentController.js";

const router = express.Router();

// Route to create a stripe-intent ;
router.post("/create-payment-intent", createPaymentIntent);

//  POST: /api/payments
router.post("/save-payment", createPayment);

export default router;
