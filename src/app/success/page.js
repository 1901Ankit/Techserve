"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const selectedPlans = JSON.parse(localStorage.getItem('selectedPlans')) || [];
    const selectedService = localStorage.getItem('selectedService') || 'Not Selected';

    if (selectedPlans.length === 0) {
      console.error('No plans selected.');
      return;
    }

    const newTicket = {
      selectedPlan: selectedPlans[0], // Assuming the first plan is the one selected
      selectedService,
      purchasedDate: new Date().toLocaleDateString(),
      deliveredDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString(),
      status: "Completed",
      costBreakdown: selectedPlans
    };

    // Retrieve existing tickets from localStorage
    let pastTickets = JSON.parse(localStorage.getItem('ticketDetails')) || [];

    // If there's already a recent ticket, push it to pastTickets
    if (pastTickets.length > 0) {
      pastTickets.unshift(pastTickets.pop()); // Move the most recent ticket to pastTickets
    }

    // Add the new ticket as the most recent one
    pastTickets.unshift(newTicket);

    // Save updated tickets to localStorage
    localStorage.setItem('ticketDetails', JSON.stringify(pastTickets));

    // Clear temporary data
    localStorage.removeItem('selectedPlans');
    localStorage.removeItem('selectedService');

    router.push('/RecentTicket');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold">Payment Successful!</h1>
    </div>
  );
};

export default Success;
