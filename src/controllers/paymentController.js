import Stripe from "stripe";
import paymentModel from "../models/paymentModel.js";
const stripe = new Stripe(process.env.PAYMENT_GATEWAY_KEY);

// Create a PaymentIntent
export const createPaymentIntent = async (req, res) => {
  const amountInCents = req.body.amountInCents;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/* 🧾 Create a new payment (POST /payments)                                   */
/* -------------------------------------------------------------------------- */
export const createPayment = async (req, res) => {
  try {
    const { amount, userId, propertyId, currency, cardholderName, TrxID } =
      req.body;

    //  Validation check
    if (!amount || !userId || !propertyId || !cardholderName || !TrxID) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    // 💾 Create payment
    const payment = new paymentModel({
      amount,
      userId,
      propertyId,
      currency,
      cardholderName,
      TrxID,
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: "Payment recorded successfully.",
      payment,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
