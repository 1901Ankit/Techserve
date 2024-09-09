// components/Layout.js

import React from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import DashboardSection from './DashboardSection';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Layout = ({ children, selectedPlan, selectedService }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error('Stripe.js failed to load.');
      return;
    }

    if (selectedPlan.name === 'BASIC') {
      console.log('Basic plan selected. No payment required.');
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedPlan, selectedService }), // Send both selectedPlan and selectedService
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { id } = await response.json();

      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error('Error redirecting to Checkout:', error.message);
      }
    } catch (error) {
      console.error('Error handling checkout:', error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Dashboard Section */}
      <div className="w-full md:w-1/4 lg:w-1/5  border-gray-300 p-4">
        <DashboardSection />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 border-r-2 border-gray-300">
        {children}
      </div>

      {/* Cart Section */}
      <div className="w-full md:w-1/4 lg:w-1/5 p-4 bg-white border-t-2 border-gray-300 flex-shrink-0">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
        <div className="space-y-4">
          {selectedPlan.name ? (
            <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
              <p className="text-lg font-medium">{selectedPlan.name}</p>
              <p className="text-gray-700">{selectedPlan.price}</p>
            </div>
          ) : (
            <p className="text-gray-700">No plan selected</p>
          )}

          {/* Display Selected Service */}
          {selectedService ? (
            <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
              <p className="text-lg font-medium">Service: {selectedService}</p>
            </div>
          ) : (
            <p className="text-gray-700">No service selected</p>
          )}

          {/* Total Cost */}
          <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
            <p className="text-sm font-medium">Grand Total</p>
            <p className="text-lg font-bold">{selectedPlan.price}</p>
          </div>

          {/* Pay Now Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
            onClick={handleCheckout}
          >
            {selectedPlan.name === 'BASIC' ? 'Start Free Trial' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
