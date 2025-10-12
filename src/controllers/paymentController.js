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
