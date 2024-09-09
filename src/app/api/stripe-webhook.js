import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import CheckoutSession from '@/models/CheckoutSession';
import clientPromise from '../../lib/mongodb'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const sig = req.headers['stripe-signature'];
  const buf = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      // Extract information from session
      const {
        metadata,
        payment_intent,
        customer_email,
        shipping,
        payment_method_types
      } = session;

      // Save checkout session data to your database
      await saveCheckoutSession({
        email: metadata.email,
        planName: metadata.planName,
        planPrice: metadata.planPrice,
        service: metadata.service,
        paymentIntent: payment_intent,
        customerEmail: customer_email,
        shippingAddress: shipping,
        paymentMethodTypes: payment_method_types,
      });

      break;
    // Handle other event types as needed
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function saveCheckoutSession(data) {
  const client = await clientPromise;
  const db = client.db('checkout'); 
  const collection = db.collection('Checkout_details'); 

  try {
    // Insert the data into the collection
    await collection.insertOne(data);
    console.log('Checkout session saved successfully.');
  } catch (error) {
    console.error('Error saving checkout session:', error);
  }
}
