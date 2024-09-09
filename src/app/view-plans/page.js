"use client";
import React, { useState } from 'react';
import Layout from '../(components)/Layout'; 
import ViewPlans from '../(components)/ViewPlans'; 

const ViewPlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: '' });
  const [selectedService, setSelectedService] = useState(null); // Add state for selected service

  const handlePlanSelect = (name, price) => {
    setSelectedPlan({ name, price });
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  return (
    <Layout selectedPlan={selectedPlan} selectedService={selectedService}>
      <ViewPlans onPlanSelect={handlePlanSelect} onServiceSelect={handleServiceSelect} />
    </Layout>
  );
};

export default ViewPlansPage;
