import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/lib/context/userContext';
import Image from 'next/image';
import serviceProcessImg from '../../../public/assets/image/pixelcut.png';
import { ToastContext } from '@/lib/context/ToastContext';

export default function EmailModal({ onClose, onSend, loading, firstName, lastName }) {
  const { state } = useContext(UserContext);
  const [showQuotation, setShowQuotation] = useState(false);
  const { showToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    firstName: state.user?.firstName || '',
    lastName: state.user?.lastName || '',
    email: state.user?.email || '',
    address: state.user?.address || '',
    city: state.user?.city || '',
    state: state.user?.state || '',
  });

  useEffect(() => {
    if (state.user) {
      setFormData({
        firstName: state.user.firstName || '',
        lastName: state.user.lastName || '',
        email: state.user.email || '',
        address: state.user.address || '',
        city: state.user.city || '',
        state: state.user.state || '',
      });
    }
  }, [state.user]);

  const handleNext = () => {
    setShowQuotation(true);
  };

  const handleSubmit = async () => {
    if (!formData.firstName) {

    }
    if (!formData.lastName) {

    }
    if (!formData.email) {
      showToast('Please fill in your email', 'warning');
      return;
    }
    if (!formData.address) {
      showToast('Please fill in your address', 'warning');
      return;
    }
    if (!formData.city) {
      showToast('Please fill in your city', 'warning');
      return;
    }
    if (!formData.state) {
      showToast('Please fill in your state', 'warning');
      return;
    }
    if (formData.firstName && formData.lastName && formData.email) {
      await onSend(formData.email, formData.firstName, formData.lastName);
    } else {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[60%]">
        {!showQuotation ? (
          <div>
            <h2 className="text-xl font-bold mb-6 text-center">Our Checkout Process.</h2>
            <Image src={serviceProcessImg} alt='Our Service Process' />
            <div className='flex justify-end'>
              <button
                onClick={handleNext}
                className="bg-[#338DFB] text-white rounded-md py-[10px] font-semibold w-56 hover:bg-[#1e7ad9] active:bg-[#125bb8] transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-6">Contract and Invoice will be sent on this email.</h2>
            <div className='flex mb-8 justify-between'>
              <div className='flex items-center mr-6 w-full'>
                <label className='mr-2'>Name:</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.firstName + " " + formData.lastName}
                  onChange={(e) => {
                    const [firstName, lastName] = e.target.value.split(' ');
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      firstName,
                      lastName,
                    }));
                  }}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className='flex items-center w-full'>
                <label className='mr-2'>Email:</label>
                <input
                  type="email"
                  id='email'
                  name='email'
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="flex items-center mb-8">
              <label htmlFor="address" className='mr-2'>Address:</label>

              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder='33062 Zohanbegr isle'
                className="border border-gray-300 p-2 rounded w-full"
              />
            </div>

            <div className="flex mb-8">
              <div className="w-full mr-6 flex items-center">

                <label htmlFor="state" className='mr-2'>City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder='Mehrab'
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>

              <div className="flex items-center w-full">
                <label htmlFor="postalCode" className='mr-2'>State:</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder='bezorgi'
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-[#338DFB] text-white rounded-md py-[10px] font-semibold w-full hover:bg-[#1e7ad9] active:bg-[#125bb8] transition-colors duration-200 mr-4 flex justify-center"
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <div className="loader border-t-transparent border-solid animate-spin rounded-full border-white border-4 h-5 w-5 mr-2"></div>
                ) : (
                  'Send'
                )}
              </button>
              <button
                onClick={onClose}
                className="bg-white text-[#338DFB] rounded-md py-[10px] font-semibold border-[1.5px] border-[#338DFB] w-full hover:bg-[#f0f7ff] hover:text-[#1e7ad9] active:bg-[#e0efff] active:text-[#125bb8] transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
