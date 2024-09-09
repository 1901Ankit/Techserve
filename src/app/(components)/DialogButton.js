"use client";

import React, { useState } from 'react';
import ContactDialog from './dialogBoxes/ContactDialog';

const DialogButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result); // Handle success
      alert('Form submitted successfully!');
      setFormData({ name: '', email: '', number: '' }); // Clear the form
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsOpen(false); // Optionally close the dialog after submission
    }
  };

  return (
    <div>
      <button
        className='text-[#07A9EE] hover:text-white hover:bg-[#07A9EE] font-bold border border-[#07A9EE] rounded-full text-sm py-1 px-6 mt-2'
        onClick={openDialog}
      >
        GET SUPPORT
      </button>

      <ContactDialog 
        isOpen={isOpen} 
        onClose={closeDialog} 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default DialogButton;
