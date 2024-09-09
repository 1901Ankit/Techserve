import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/lib/context/userContext';

const Ticket = () => {
  const router = useRouter();
  const { state } = useContext(UserContext); // Access the UserContext
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); // State for managing loading

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (!state.token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('/api/get-all-tickets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }

        const data = await response.json();
        if (data.success) {
          setTickets(data.tickets);
        } else {
          console.error('Error fetching tickets:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false); // Stop loading once the request is done
      }
    };

    fetchTickets();
  }, [state.token]);

  const handleEditClick = () => {
    setIsModalOpen(true); // Show the modal
  };

  const handleConfirm = () => {
    setIsModalOpen(false); // Close the modal
    router.push('/view-plans'); // Redirect to the View Plans page
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal without redirecting
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Loader
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 md:p-6 lg:p-8 col-span-1 md:col-span-3 lg:col-span-8 relative">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4 p-4 text-black underline border-b-2 border-black w-full max-w-screen-md" style={{ borderBottomColor: "black", borderBottomWidth: "2px" }}>
        <span className="text-xl md:text-2xl font-semibold text-blue-500 flex items-center w-full justify-between">
          <span className="flex-grow text-center md:text-left" style={{ marginRight: '45px', textDecoration: 'underline' }}>Raise Ticket</span>
          <span
            className="hidden md:block text-black cursor-pointer" style={{ marginLeft: '145px', color: 'black', textDecoration: "none" }}
            onClick={handleEditClick}
          >
            Edit Ticket
          </span>
        </span>
      </div>

      {/* Display only the first ticket */}
      {tickets.length > 0 && (
        <div key={tickets[0]._id} className="border border-gray-300 p-4 md:p-6 rounded-md w-full hover:bg-blue-100 border-t-12 border-t-blue-500 shadow-lg relative" style={{ borderTopColor: "rgb(51 141 251)", borderTopWidth: "12px", boxShadow: "2px 5px 22px white" }}>
          <div className="mb-3">
            <h3 className="font-bold text-base">Service Selected: <span className='font-normal'>{tickets[0].pricingEnquiryDetailsId?.serviceType || 'N/A'}</span></h3>
            <p className="font-bold text-base mt-1">Overview: <span className='font-normal'>{tickets[0].pricingEnquiryDetailsId?.selectedServiceDetails.issue || 'You selected a plan of our services. Additional details can be provided here.'}</span></p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between mb-3 gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-base">Purchased Date: <span className='font-normal'>{new Date(tickets[0].createdAt).toLocaleDateString() || 'N/A'}</span></span>
            </div>
            <div className="flex flex-col gap-1">
              <p className={`font-bold text-base text-${tickets[0].progress == 'Completed' ? 'green-600' : 'bg-yellow-600'}`}>{tickets[0].progress}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="font-semibold text-green-600 text-sm sm:text-base">{tickets[0].status || 'N/A'}</p>
            {/* <p className="text-red-600 cursor-pointer underline text-sm sm:text-base mt-2 sm:mt-0" onClick={handleEditClick}>
              Click to Edit →
            </p> */}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80 md:w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Redirect</h2>
            <p className="mb-4">Are you sure? You will be redirected to the plan page.</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
