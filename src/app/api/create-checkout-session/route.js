import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// MongoDB connection URL for checkout details
const MONGODB_CHECKOUT_URI = process.env.MONGODB_CHECKOUT_URI;
const DB_NAME = 'checkout'; 
const COLLECTION_NAME = 'Checkout_details'; 

// Connect to MongoDB for checkout details
async function connectToCheckoutDatabase() {
  const client = new MongoClient(MONGODB_CHECKOUT_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db(DB_NAME).collection(COLLECTION_NAME);
}

// Main handler function
export async function POST(req) {
  try {
    const { selectedPlan, selectedService, email } = await req.json(); // Include email in request
    const userIp = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr');
    const userCountry = await getCountryFromIp(userIp);

    let currency = 'usd'; // Default currency
    let currencySymbol = '$'; // Default symbol
    switch (userCountry) {
      case 'IN':
        currency = 'inr';
        currencySymbol = '₹';
        break;
      case 'AU':
        currency = 'aud';
        currencySymbol = 'A$';
        break;
      case 'GB':
        currency = 'gbp';
        currencySymbol = '£';
        break;
      case 'BD':
        currency = 'bdt';
        currencySymbol = '৳';
        break;
      case 'CA':
        currency = 'cad';
        currencySymbol = 'C$';
        break;
      default:
        currency = 'usd';
        currencySymbol = '$';
        break;
    }

    if (!selectedPlan || !selectedPlan.name || !selectedPlan.price) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Check if the plan is 'BASIC'
    if (selectedPlan.name === 'BASIC') {
      return NextResponse.json({
        success: true,
        message: 'Basic Plan selected. No Payment Required.',
        currencySymbol
      });
    }

    const amount = parseFloat(selectedPlan.price.replace(/[^0-9.-]+/g, '')) * 100; // Handle price with symbol

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `${selectedService ? selectedService + ' - ' : ''}${selectedPlan.name}`, // Combine service and plan names
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        service: selectedService || 'Not Selected',
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        email: email || 'Not Provided',
      },
    });

    // Store checkout details in MongoDB
    const collection = await connectToCheckoutDatabase();
    await collection.insertOne({
      sessionId: session.id,
      selectedPlan,
      selectedService,
      email,
      userIp,
      userCountry,
      currency,
      amount: amount / 100, // Store amount in the original currency format
      timestamp: new Date()
    });

    return NextResponse.json({
      id: session.id,
      currencySymbol
    });
  } catch (error) {
    console.error(error, "--checkout-session error--");
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Function to get country from IP
async function getCountryFromIp(ip) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    if (data && data.countryCode) {
      return data.countryCode;
    }
    return 'US';
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return 'US';
  }
}



// ------------------
// =================================================




// Original ...........

// import Stripe from 'stripe';
// import { NextResponse } from 'next/server';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const IPSTACK_ACCESS_KEY = process.env.IPSTACK_ACCESS_KEY; 
// export async function POST(req) {
//   try {
//     const { selectedPlan } = await req.json();
//     const userIp = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr');
//     //  user's country using IPstack
//     const userCountry = await getCountryFromIp(userIp);
//     let currency = 'usd'; // Default currency
//     if (userCountry === 'IN') {
//       currency = 'inr'; 
//     }
//     if (!selectedPlan || !selectedPlan.name || !selectedPlan.price) {
//       return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
//     }
//     if (selectedPlan.name === 'BASIC') {
//       return NextResponse.json({ success: true, message: 'Basic Plan selected. No Payment Required.' });
//     }
//     // price to amount in cents 
//     const amount = parseFloat(selectedPlan.price.replace('$', '').replace(',', '')) * 100;
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: currency,
//             product_data: {
//               name: selectedPlan.name,
//             },
//             unit_amount: amount,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
//     });
//     return NextResponse.json({ id: session.id });
//   } catch (error) {
//     console.error(error, "--checkout-session error--");
//     return NextResponse.json({ error: '--Internal Server Error---' }, { status: 500 });
//   }
// }

// async function getCountryFromIp(ip) {
//   try {
//     const response = await fetch(`http://api.ipstack.com/${ip}?access_key=${IPSTACK_ACCESS_KEY}`);
//     const data = await response.json();
//     if (data && data.country_code) {
//       return data.country_code; 
//     }
//     return 'US'; // Default to 'US' 
//   } catch (error) {
//     console.error('Error fetching IP info from IPstack:', error);
//     return 'US'; 
//   }
// }





// =================================================