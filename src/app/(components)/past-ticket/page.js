"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DashboardSection from '../DashboardSection';

const PastTicket = () => {
  const [pastTickets, setPastTickets] = useState([]);

  useEffect(() => {
    try {
      const storedTickets = JSON.parse(localStorage.getItem('ticketDetails')) || [];
      if (storedTickets.length > 1) {
        setPastTickets(storedTickets.slice(1)); // Exclude the most recent ticket
      }
    } catch (error) {
      console.error('Failed to load tickets from localStorage:', error);
    }
  }, []);

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
        <DashboardSection />
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 p-4 md:p-6 lg:p-8">
        {pastTickets.length > 0 ? (
          pastTickets.map((ticket, index) => (
            <div key={index} className="flex flex-col items-center gap-4 p-4 text-black underline border-b-2 border-black w-full max-w-screen-md">
              <span className="text-xl md:text-2xl font-semibold text-blue-500 flex items-center w-full justify-between">
                <span className="flex-grow text-center md:text-left">Past Ticket {index + 1}</span>
              </span>
              <div className="border border-gray-300 p-4 md:p-6 rounded-md max-w-full sm:max-w-lg w-full bg-blue-100 border-t-12 border-t-blue-500 shadow-lg col-span-1 md:col-span-3 lg:col-span-8 relative"  style={{borderTopColor:"rgb(51 141 251)",borderTopWidth:"12px",boxShadow:"2px 5px 22px white"}}>
                <div className="mb-4">
                  <h3 className="text-lg md:text-xl font-medium">Service Selected: {ticket.selectedService || 'Not Selected'}</h3>
                  {/* <p className="text-sm mt-2">Overview: You selected plan {ticket.selectedPlan?.name || 'N/A'} of our services. Additional details can be provided here.</p> */}
                  <p className="text-sm mt-2">Overview: You selected plan {ticket.selectedPlan?.name || 'N/A'}</p>of our services.
                </div>
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm sm:text-base">Purchased Date:</span>
                    <span className="text-sm sm:text-base">{ticket.purchasedDate || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-sm sm:text-base">Delivered Date:</p>
                    <p className="text-sm sm:text-base">{ticket.deliveredDate || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">No past tickets available.</p>
        )}
      </div>

      {/* Cart Section */}
      <div className="cart-section hidden md:block w-full md:w-1/4 lg:w-1/5 p-4 bg-white border-l-2 border-gray-300">
        <h2 className="text-2xl font-semibold mb-6">Cart Details</h2>
        {pastTickets.length > 0 ? (
          pastTickets.map((ticket, index) => (
            <div key={index} className="mb-6">
              {renderCartDetails(ticket)}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">No details available.</p>
        )}
      </div>
    </div>
  );
};

export default PastTicket;




// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const PastTicket = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [ticketDetails, setTicketDetails] = useState({
//     selectedService: '',
//     selectedPlan: { name: '', price: '' },
//     purchasedDate: new Date().toLocaleDateString(), // Default to current date
//   });
//   const [cartDetails, setCartDetails] = useState({
//     selectedPlan: { name: '', price: '' },
//     selectedService: '',
//     totalAmount: 0,
//   });

//   const router = useRouter();

//   useEffect(() => {
//     // Fetch ticket details from localStorage
//     const storedTicketDetails = localStorage.getItem('ticketDetails');
//     if (storedTicketDetails) {
//       const parsedDetails = JSON.parse(storedTicketDetails);
//       setTicketDetails(parsedDetails);
//       setCartDetails({
//         selectedPlan: parsedDetails.selectedPlan,
//         selectedService: parsedDetails.selectedService,
//         totalAmount: parseFloat(parsedDetails.selectedPlan.price.replace(/[^0-9.-]+/g, '')),
//       });
//     }
//   }, []);

//   const handleEditClicks = () => {
//     setIsModalOpen(true); // Show the modal
//   };

//   const handleConfirms = () => {
//     setIsModalOpen(false); // Close the modal
//     router.push('/website-calculator'); // Redirect to View Plans page
//   };

//   const handleCancels = () => {
//     setIsModalOpen(false); // Close the modal without redirecting
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Dashboard Section */}
//       <div className="dashboard-section w-full md:w-1/4 lg:w-1/5 p-4 bg-white border-r-2 border-gray-300">
//         <div className="text-2xl font-semibold mb-6 text-left mt-5">Dashboard</div>
//         <div className="dashboard-item mb-2">
//           <a href="website-calculator" className="text-black hover:text-blue-600">Select Services</a>
//         </div>
//         <div className="dashboard-item mb-2">
//           <a href="view-plans" className="text-black hover:text-blue-600">View Plans</a>
//         </div>
//         <div className="dashboard-item mb-2">
//           <a href="#" className="text-black hover:text-blue-600" onClick={() => toggleService("Raise a Ticket")}>Raise a Ticket</a>
//         </div>
//         <div className="dashboard-item mb-2">
//           <a href="#" className="text-black hover:text-blue-600" onClick={() => toggleService("Raise a Ticket")}>Recent Ticket</a>
//         </div>
//         <div className="dashboard-item mb-2">
//           <a href="/past-ticket" className="text-black hover:text-blue-600">Past Ticket</a>
//         </div>
//       </div>
  
//       {/* Main Content */}
//       <div className="main-content flex-1 p-4 md:p-6 lg:p-8">
//         {/* Ticket Details */}
//         <div className="flex flex-col items-center gap-4 p-4 text-black underline border-b-2 border-black w-full max-w-screen-md" style={{borderBottomColor:"black",borderBottomWidth:"2px"}}>
//           <span className="text-xl md:text-2xl font-semibold text-blue-500 flex items-center w-full justify-between">
//             <span className="flex-grow text-center md:text-left" style={{ marginRight: '45px', textDecoration: 'underline'}}>Past Ticket</span>
//             <span 
//               className="hidden md:block text-black cursor-pointer" style={{ marginLeft: '145px', color: 'black',textDecoration:"none" }}
//               onClick={handleEditClicks}
//             >
//               Edit Ticket
//             </span>
//           </span>
//         </div>
//         <div className="border border-gray-300 p-4 md:p-6 rounded-md max-w-full sm:max-w-lg w-full bg-blue-100 border-t-12 border-t-blue-500 shadow-lg relative" style={{borderTopColor:"rgb(51 141 251)",borderTopWidth:"12px",boxShadow:"2px 5px 22px white"}}>
//           <div className="mb-4">
//             <h3 className="text-lg md:text-xl font-medium">Service Selected: {ticketDetails.selectedService}</h3>
//             <p className="text-sm mt-2">Overview: You selected plan {ticketDetails.selectedPlan.name} of our services. Additional details can be provided here.</p>
//           </div>
//           <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
//             <div className="flex flex-col gap-1">
//               <span className="font-semibold text-sm sm:text-base">Purchased Date:</span>
//               <span className="text-sm sm:text-base">{ticketDetails.purchasedDate}</span>
//             </div>
//             <div className="flex flex-col gap-1">
//               <p className="font-semibold text-sm sm:text-base">Delivered Date:</p>
//               <p className="text-sm sm:text-base">........</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white p-6 rounded-md shadow-lg w-80 md:w-96">
//               <h2 className="text-lg font-semibold mb-4">Confirm Redirect</h2>
//               <p className="mb-4">Are you sure, You will be redirected to the Service page.</p>
//               <div className="flex justify-end gap-4">
//                 <button 
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                   onClick={handleConfirms}
//                 >
//                   Confirm
//                 </button>
//                 <button 
//                   className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
//                   onClick={handleCancels}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
  
//       {/* Cart Section */}
//       <div className="cart-section w-full md:w-1/4 lg:w-1/5 p-4 bg-white border-l-2 border-gray-300">
//         <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
//         <div className="space-y-4">
//           {cartDetails.selectedPlan.name ? (
//             <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
//               <p className="text-lg font-medium">{cartDetails.selectedPlan.name}</p>
//               <p className="text-gray-700">{cartDetails.selectedPlan.price}</p>
//             </div>
//           ) : (
//             <p className="text-gray-700">No plan selected</p>
//           )}

//           {/* Display Selected Service */}
//           {cartDetails.selectedService ? (
//             <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
//               <p className="text-lg font-medium">Service: {cartDetails.selectedService}</p>
//             </div>
//           ) : (
//             <p className="text-gray-700">No service selected</p>
//           )}

//           {/* Total Cost */}
//           <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
//             <p className="text-sm font-medium">Grand Total</p>
//             <p className="text-lg font-bold">{cartDetails.totalAmount.toFixed(2)}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PastTicket;
