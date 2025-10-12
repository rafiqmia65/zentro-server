import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    propertyId: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: 'USD',
        required: true
    },
    cardholderName: {
        type: String,
        required: true
    },
    TrxID: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default mongoose.model('Payment', paymentSchema);
