import mongoose from 'mongoose';

const checkoutSessionSchema = new mongoose.Schema({
  email: String,
  planName: String,
  planPrice: String,
  service: String,
  paymentIntent: String,
  customerEmail: String,
  shippingAddress: {
    address: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
  },
  paymentMethodTypes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CheckoutSession = mongoose.models.CheckoutSession || mongoose.model('CheckoutSession', checkoutSessionSchema);

export default CheckoutSession;
