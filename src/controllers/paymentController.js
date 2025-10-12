import Stripe from 'stripe'
const stripe = new Stripe(process.env.PAYMENT_GATEWAY_KEY);

// Create a PaymentIntent
export const createPaymentIntent = async (req, res) => {
    const amountInCents = req.body.amountInCents
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            payment_method_types: ['card'],
        });
        res.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};



export const savePayment = async (req, res) => {
    try {
        const { amount, currency, cardholderName, TrxID, userEmail, propertyId, createdAt } = req.body;

        const payment = new PaymentModel({
            amount,
            currency,
            cardholderName,
            TrxID,
            userEmail,
            propertyId,
            createdAt
        });

        await payment.save();
        res.status(201).json({ success: true, data: payment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};