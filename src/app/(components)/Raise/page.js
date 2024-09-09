
// "use client"
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const Ticket = ({ selectedService, purchasedDate, deliveredDate, status, cartDetails }) => {
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
//   const [selectedQuery, setSelectedQuery] = useState(null);

//   const handleEditClick = () => {
//     setIsModalOpen(true); // Show the redirect modal
//   };

//   const handleConfirm = () => {
//     setIsModalOpen(false); // Close the modal
//     router.push('/view-plans'); // Redirect to the View Plans page
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false); // Close the modal without redirecting
//   };

//   const handleQueryClick = () => {
//     setIsQueryModalOpen(true); // Show the query criteria modal
//   };

//   const handleQueryConfirm = () => {
//     setIsQueryModalOpen(false); // Close the query modal
//     alert(`Your query about "${selectedQuery}" has been raised`); // Notify the user
//     setSelectedQuery(null); // Reset selected query
//   };

//   const handleQueryCancel = () => {
//     setIsQueryModalOpen(false); // Close the query modal without raising a query
//     setSelectedQuery(null); // Reset selected query
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Ticket Details */}
//       <div className="flex flex-col items-center gap-4 p-4 md:p-6 lg:p-8 col-span-1 md:col-span-3 lg:col-span-8 relative">
//         {/* Header Section */}
//         <div className="flex flex-col items-center gap-4 p-4 text-black underline border-b-2 border-black w-full max-w-screen-md">
//           <span className="text-xl md:text-2xl font-semibold text-blue-500 flex items-center w-full justify-between">
//             <span className="flex-grow text-center md:text-left">Raise Ticket</span>
//             <span 
//               className="hidden md:block text-black cursor-pointer"
//               onClick={handleEditClick}
//             >
//               Edit Ticket
//             </span>
//           </span>
//         </div>
       
//         {/* Ticket Details */}
//         <div className="border border-gray-300 p-4 md:p-6 rounded-md max-w-full sm:max-w-lg w-full bg-blue-100 border-t-12 border-t-blue-500 shadow-lg">
//           <div className="mb-4">
//             <h3 className="text-lg md:text-xl font-medium">Service Selected: {selectedService}</h3>
//             <p className="text-sm mt-2">Overview: You selected this plan and service. Additional details can be provided here.</p>
//           </div>
//           <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
//             <div className="flex flex-col gap-1">
//               <span className="font-semibold text-sm sm:text-base">Purchased Date:</span>
//               <span className="text-sm sm:text-base">{purchasedDate}</span>
//             </div>
//             <div className="flex flex-col gap-1">
//               <p className="font-semibold text-sm sm:text-base">Delivered Date:</p>
//               <p className="text-sm sm:text-base">{deliveredDate}</p>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row justify-between items-center">
//             <p className="font-semibold text-green-600 text-sm sm:text-base">{status}</p>
//             <p className="text-red-600 cursor-pointer underline text-sm sm:text-base mt-2 sm:mt-0" onClick={handleQueryClick}>
//               Click to Raise a Query →
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Cart Details Section */}
//       <div className="cart-section w-full md:w-1/4 lg:w-1/5 p-4 bg-white border-l-2 border-gray-300">
//         <h2 className="text-2xl font-semibold mb-6">Cart Details</h2>
//         <div className="space-y-4">
//           {cartDetails ? (
//             cartDetails.map((item, index) => (
//               <div key={index} className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
//                 <p className="text-lg font-medium">{item.name}</p>
//                 <p className="text-gray-700">{item.price}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-700">No cart details available.</p>
//           )}
//         </div>
//       </div>

//       {/* Edit Ticket Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg w-80 md:w-96">
//             <h2 className="text-lg font-semibold mb-4">Confirm Redirect</h2>
//             <p className="mb-4">Are you sure you want to be redirected to the View Plans page?</p>
//             <div className="flex justify-end gap-4">
//               <button 
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 onClick={handleConfirm}
//               >
//                 Confirm
//               </button>
//               <button 
//                 className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Query Criteria Modal */}
//       {isQueryModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg w-80 md:w-96">
//             <h2 className="text-lg font-semibold mb-4">Select Query Criteria</h2>
//             <p className="mb-4">Please choose the criteria for your query:</p>
//             <div className="flex flex-col gap-4">
//               <button 
//                 className={`px-4 py-2 rounded-md ${selectedQuery === 'Order Status' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:${selectedQuery === 'Order Status' ? 'bg-blue-600' : 'bg-gray-400'}`}
//                 onClick={() => setSelectedQuery('Order Status')}
//               >
//                 Order Status
//               </button>
//               <button 
//                 className={`px-4 py-2 rounded-md ${selectedQuery === 'Delivery Issues' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:${selectedQuery === 'Delivery Issues' ? 'bg-blue-600' : 'bg-gray-400'}`}
//                 onClick={() => setSelectedQuery('Delivery Issues')}
//               >
//                 Delivery Issues
//               </button>
//               <button 
//                 className={`px-4 py-2 rounded-md ${selectedQuery === 'Product Quality' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:${selectedQuery === 'Product Quality' ? 'bg-blue-600' : 'bg-gray-400'}`}
//                 onClick={() => setSelectedQuery('Product Quality')}
//               >
//                 Product Quality
//               </button>
//               <button 
//                 className={`px-4 py-2 rounded-md ${selectedQuery === 'Refund/Return' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:${selectedQuery === 'Refund/Return' ? 'bg-blue-600' : 'bg-gray-400'}`}
//                 onClick={() => setSelectedQuery('Refund/Return')}
//               >
//                 Refund/Return
//               </button>
//               <button 
//                 className={`px-4 py-2 rounded-md ${selectedQuery === 'Payment Issues' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:${selectedQuery === 'Payment Issues' ? 'bg-blue-600' : 'bg-gray-400'}`}
//                 onClick={() => setSelectedQuery('Payment Issues')}
//               >
//                 Payment Issues
//               </button>
//               <button 
//                 className={`px-4 py-2 rounded-md ${selectedQuery === 'Others' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:${selectedQuery === 'Others' ? 'bg-blue-600' : 'bg-gray-400'}`}
//                 onClick={() => setSelectedQuery('Others')}
//               >
//                 Others
//               </button>
//               <div className="flex justify-end gap-4 mt-4">
//                 <button 
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                   onClick={handleQueryConfirm}
//                   disabled={!selectedQuery}
//                 >
//                   Submit Query
//                 </button>
//                 <button 
//                   className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
//                   onClick={handleQueryCancel}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Ticket;









"use client";

import React, {  useEffect, useState } from 'react';
import DashboardSection from '../DashboardSection';

const Ticket = () => {
  const [recentTicket, setRecentTicket] = useState(null);
  const [pastTickets, setPastTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [viewChoice, setViewChoice] = useState(null); // Tracks user choice for view
  const [isModalOpen, setIsModalOpen] = useState(true); // Open modal initially
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  

  useEffect(() => {
    try {
      const storedTickets = JSON.parse(localStorage.getItem('ticketDetails')) || [];
      console.log('Loaded tickets:', storedTickets); // Debugging line
      if (storedTickets.length > 0) {
        setRecentTicket(storedTickets[0]); // Most recent ticket
        if (storedTickets.length > 1) {
          setPastTickets(storedTickets.slice(1)); // Past tickets
        }
      }
    } catch (error) {
      console.error('Failed to load tickets from localStorage:', error);
    }
  }, []);

  const handleTicketSelect = (choice) => {
    setViewChoice(choice);
    setIsModalOpen(false); // Close modal after selection

    if (choice === 'recent') {
      setSelectedTicket(recentTicket);
    } else {
      setSelectedTicket(pastTickets.length > 0 ? pastTickets[0] : null); // Default to first past ticket
    }
  };

  const handlePastTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(false); // Close modal after selection
  };

  const handleQueryClick = () => {
    if (!selectedTicket) {
      alert("Please select a ticket before raising a query.");
      return;
    }
    setIsQueryModalOpen(true); // Show the query criteria modal
  };

  const handleQueryConfirm = async () => {
    if (!selectedQuery) {
      alert("Please select a query type.");
      return;
    }

    try {
      const userId =user._id; 

      const response = await fetch('/api/queryTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          queryType: selectedQuery,
          queryDetails: 'Additional details can be added here',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Your query about "${selectedQuery}" has been raised successfully.`);
      } else {
        alert(`Failed to raise query: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error raising query:', error);
      alert('An error occurred while raising your query.');
    }

    setIsQueryModalOpen(false); // Close the query modal
    setSelectedQuery(null); // Reset selected query
  };

  const handleQueryCancel = () => {
    setIsQueryModalOpen(false); // Close the query modal without raising a query
    setSelectedQuery(null); // Reset selected query
  };

  const renderDetails = (ticket) => {
    if (!ticket) {
      return (
        <div className="text-center text-gray-700">No ticket selected.</div>
      );
    }

    const { selectedPlan, selectedService, purchasedDate, deliveredDate } = ticket;

    return (
      <div className="border border-gray-300 p-4 md:p-6 rounded-md max-w-full sm:max-w-lg w-full bg-blue-100 border-t-12 border-t-blue-500 shadow-lg col-span-1 md:col-span-3 lg:col-span-8 relative"  style={{borderTopColor:"rgb(51 141 251)",borderTopWidth:"12px",boxShadow:"2px 5px 22px white"}}>
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-medium">
            Service Selected: {selectedService || 'Not Selected'}
          </h3>
          <p className="text-sm mt-2">
            Overview: You selected plan {selectedPlan?.name || 'N/A'} of our plans.
            {/* Overview: You selected plan {selectedPlan?.name || 'N/A'} of our services. Additional details can be provided here. */}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm sm:text-base">Purchased Date:</span>
            <span className="text-sm sm:text-base">{purchasedDate || 'N/A'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-sm sm:text-base">Delivered Date:</p>
            <p className="text-sm sm:text-base">{deliveredDate || 'N/A'}</p>
          </div>
        </div>
        <button 
          className="text-red-600 cursor-pointer underline mt-4"
          onClick={handleQueryClick}
        >
          Click to Raise a Query →
        </button>
      </div>
    );
  };

  const renderCartDetails = (ticket) => {
    if (!ticket) {
      return (
        <div className="space-y-4">
          <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
            <p className="text-lg font-medium">No Plan Selected</p>
            <p className="text-gray-700">N/A</p>
          </div>
          <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
            <p className="text-sm font-medium">Grand Total</p>
            <p className="text-lg font-bold">0.00</p>
          </div>
        </div>
      );
    }

    const { selectedPlan, selectedService } = ticket;

    return (
      <>
        <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
          <p className="text-lg font-medium">{selectedPlan?.name || 'N/A'}</p>
          <p className="text-gray-700">{selectedPlan?.price || 'N/A'}</p>
        </div>

        {selectedService && (
          <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
            <p className="text-lg font-medium">Service: {selectedService}</p>
          </div>
        )}

        <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
          <p className="text-sm font-medium">Grand Total</p>
          <p className="text-lg font-bold">
            {parseFloat(selectedPlan?.price.replace(/[^0-9.-]+/g, '') || '0').toFixed(2)}
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
       {/* Dashboard Section */}
  <div className="w-full md:w-1/4 lg:w-1/5  border-gray-300 p-4">
        <DashboardSection/>
      </div>
      {/* Main Content */}
      <div className="main-content flex-1 p-4 md:p-6 lg:p-8">
        {selectedTicket ? (
          <div className="flex flex-col items-center gap-4 p-4 text-black underline border-b-2 border-black w-full max-w-screen-md">
            <span  className="text-xl md:text-2xl font-semibold text-blue-500 flex items-center w-full justify-between">
              <span className="flex-grow text-center md:text-left">
                {viewChoice === 'recent' ? 'Recent Ticket' : 'Selected Past Ticket'}
              </span>
            </span>
            {renderDetails(selectedTicket)}
          </div>
        ) : (
          <p className="text-center text-gray-700">No ticket selected.</p>
        )}
      </div>

      {/* Cart Section */}
      <div className="cart-section hidden md:block w-full md:w-1/4 lg:w-1/5 p-4 bg-white border-l-2 border-gray-300">
        <h2 className="text-2xl font-semibold mb-6">Cart Details</h2>
        {selectedTicket ? (
          renderCartDetails(selectedTicket)
        ) : (
          <p className="text-center text-gray-700">No details available.</p>
        )}
      </div>

      {/* Modal for Selecting Ticket */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Select Ticket Type</h3>
            <div className="mb-4">
              <button
                onClick={() => handleTicketSelect('recent')}
                className="w-full text-left p-2 border border-gray-300 rounded mb-2"
              >
                Recent Ticket
              </button>
              {pastTickets.length > 0 && (
                <>
                  <button
                    onClick={() => handleTicketSelect('past')}
                    className="w-full text-left p-2 border border-gray-300 rounded mb-2"
                  >
                    Past Ticket
                  </button>
                  {pastTickets.map((ticket, index) => (
                    <button
                      key={index}
                      onClick={() => handlePastTicketSelect(ticket)}
                      className="w-full text-left p-2 border border-gray-300 rounded mb-2"
                    >
                      {`Past Ticket ${index + 1}`}
                    </button>
                  ))}
                </>
              )}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Query Selection */}
      {isQueryModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Select Your Query Type</h3>
            <select
              value={selectedQuery}
              onChange={(e) => setSelectedQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">Select a query type</option>
              <option value="Order Status">Order Status</option>
              <option value="Delivery Issues">Delivery Issues</option>
              <option value="Product Information">Product Information</option>
              <option value="Pricing Inquiries">Pricing Inquiries</option>
              <option value="Returns & Exchanges">Returns & Exchanges</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={handleQueryConfirm}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={handleQueryCancel}
                className="bg-gray-500 text-white p-2 rounded"
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
