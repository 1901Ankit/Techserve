"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Ticket from '../Ticket';
import DashboardSection from '../DashboardSection';

const RecentTicket = () => {
  const [recentTicket, setRecentTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTicket, setEditedTicket] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedTickets = JSON.parse(localStorage.getItem('ticketDetails')) || [];
      setRecentTicket(storedTickets[0] || null); // The most recent ticket is the first item
      setEditedTicket(storedTickets[0] || null);
    } catch (error) {
      console.error('Failed to load ticket details from localStorage:', error);
    }
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true); // Show the modal
  };

  const handleConfirm = () => {
    // Update localStorage with the edited ticket
    const storedTickets = JSON.parse(localStorage.getItem('ticketDetails')) || [];
    storedTickets[0] = editedTicket;
    localStorage.setItem('ticketDetails', JSON.stringify(storedTickets));

    setRecentTicket(editedTicket); // Update recentTicket state
    setIsModalOpen(false); // Close the modal
    router.push('/view-plans'); // Redirect to the View Plans page
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal without redirecting
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderCartDetails = () => {
    if (!recentTicket) {
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

    const { selectedPlan, selectedService } = recentTicket;

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
        {recentTicket ? (
          <div className="flex flex-col items-center gap-4 p-4 text-black underline border-b-2 border-black w-full max-w-screen-md">
            <span className="text-xl md:text-2xl font-semibold text-blue-500 flex items-center w-full justify-between">
              <span className="flex-grow text-center md:text-left">Recent Ticket</span>
              {/* <span 
                className="hidden md:block text-black cursor-pointer"
                onClick={handleEditClick}
              >
                Edit Ticket
              </span> */}
            </span>
            <div className="border border-gray-300 p-4 md:p-6 rounded-md max-w-full sm:max-w-lg w-full bg-blue-100 border-t-12 border-t-blue-500 shadow-lg col-span-1 md:col-span-3 lg:col-span-8 relative"  style={{borderTopColor:"rgb(51 141 251)",borderTopWidth:"12px",boxShadow:"2px 5px 22px white"}}>
              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-medium">Service Selected: {recentTicket.selectedService || 'Not Selected'}</h3>
                <p className="text-sm mt-2">Overview: You selected plan {recentTicket.selectedPlan?.name || 'N/A'} of our plans.</p>  
                {/* <p className="text-sm mt-2">Overview: You selected plan {recentTicket.selectedPlan?.name || 'N/A'} of our services. Additional details can be provided here.</p> */}
              </div>
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-sm sm:text-base">Purchased Date:</span>
                  <span className="text-sm sm:text-base">{recentTicket.purchasedDate || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm sm:text-base">Delivered Date:</p>
                  <p className="text-sm sm:text-base">{recentTicket.deliveredDate || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">No recent tickets available.</p>
          // <Ticket />
        )}
      </div>

      {/* Cart Section */}
      <div className="cart-section w-full md:w-1/4 lg:w-1/5 p-4 bg-white border-l-2 border-gray-300">
        <h2 className="text-2xl font-semibold mb-6">Cart Details</h2>
        {renderCartDetails()}
      </div>

      {/* Modal for Editing Ticket */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Ticket</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="selectedService">Service Selected</label>
              <input
                id="selectedService"
                name="selectedService"
                type="text"
                value={editedTicket?.selectedService || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="planName">Plan Name</label>
              <input
                id="planName"
                name="selectedPlan.name"
                type="text"
                value={editedTicket?.selectedPlan?.name || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="planPrice">Plan Price</label>
              <input
                id="planPrice"
                name="selectedPlan.price"
                type="text"
                value={editedTicket?.selectedPlan?.price || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleConfirm} className="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTicket;























// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const RecentTicket = () => {
//   const [recentTicket, setRecentTicket] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     try {
//       const storedTickets = JSON.parse(localStorage.getItem('ticketDetails')) || [];
//       setRecentTicket(storedTickets[0] || null); // The most recent ticket is the first item
//     } catch (error) {
//       console.error('Failed to load ticket details from localStorage:', error);
//     }
//   }, []);

//   const handleEditClick = () => {
//     setIsModalOpen(true); // Show the modal
//   };

//   const handleConfirm = () => {
//     setIsModalOpen(false); // Close the modal
//     router.push('/view-plans'); // Redirect to the View Plans page
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false); // Close the modal without redirecting
//   };


//   const renderCartDetails = () => {
//     if (!recentTicket) {
//       return (
//         <div className="space-y-4">
//           <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
//             <p className="text-lg font-medium">No Plan Selected</p>
//             <p className="text-gray-700">N/A</p>
//           </div>
//           <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
//             <p className="text-sm font-medium">Grand Total</p>
//             <p className="text-lg font-bold">0.00</p>
//           </div>
//         </div>
//       );
//     }

//     const { selectedPlan, selectedService } = recentTicket;

//     return (
//       <>
//         <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
//           <p className="text-lg font-medium">{selectedPlan?.name || 'N/A'}</p>
//           <p className="text-gray-700">{selectedPlan?.price || 'N/A'}</p>
//         </div>

//         {selectedService && (
//           <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
//             <p className="text-lg font-medium">Service: {selectedService}</p>
//           </div>
//         )}

//         <div className="border border-blue-300 rounded-lg p-4 bg-white shadow-md">
//           <p className="text-sm font-medium">Grand Total</p>
//           <p className="text-lg font-bold">
//             {parseFloat(selectedPlan?.price.replace(/[^0-9.-]+/g, '') || '0').toFixed(2)}
//           </p>
//         </div>
//       </>
//     );
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
//           <a href="#" className="text-black hover:text-blue-600" onClick={() => console.log("Raise a Ticket")}>Raise a Ticket</a>
//         </div>
//         <div className="dashboard-item mb-2">
//           <a href="#" className="text-black hover:text-blue-600" onClick={() => console.log("Recent Ticket")}>Recent Ticket</a>
//         </div>
//         <div className="dashboard-item mb-2">
//           <a href="/past-ticket" className="text-black hover:text-blue-600">Past Ticket</a>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content flex-1 p-4 md:p-6 lg:p-8">
//         {recentTicket ? (
//           <div className="flex flex-col items-center gap-4 p-4 text-black underline border-b-2 border-black w-full max-w-screen-md">
//             <span className="text-xl md:text-2xl font-semibold text-blue-500 flex items-center w-full justify-between">
//               <span className="flex-grow text-center md:text-left">Recent Ticket</span>
//               <span 
//                 className="hidden md:block text-black cursor-pointer"
//                 onClick={handleEditClick}
//               >
//                 Edit Ticket
//               </span>
//             </span>
//             <div className="border border-gray-300 p-4 md:p-6 rounded-md max-w-full sm:max-w-lg w-full bg-blue-100 border-t-12 border-t-blue-500 shadow-lg relative">
//               <div className="mb-4">
//                 <h3 className="text-lg md:text-xl font-medium">Service Selected: {recentTicket.selectedService || 'Not Selected'}</h3>
//                 <p className="text-sm mt-2">Overview: You selected plan {recentTicket.selectedPlan?.name || 'N/A'} of our services. Additional details can be provided here.</p>
//               </div>
//               <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
//                 <div className="flex flex-col gap-1">
//                   <span className="font-semibold text-sm sm:text-base">Purchased Date:</span>
//                   <span className="text-sm sm:text-base">{recentTicket.purchasedDate || 'N/A'}</span>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <p className="font-semibold text-sm sm:text-base">Delivered Date:</p>
//                   <p className="text-sm sm:text-base">{recentTicket.deliveredDate || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p className="text-center text-gray-700">No recent tickets available.</p>
//         )}
//       </div>

//       {/* Cart Section */}
//       <div className="cart-section w-full md:w-1/4 lg:w-1/5 p-4 bg-white border-l-2 border-gray-300">
//         <h2 className="text-2xl font-semibold mb-6">Cart Details</h2>
//         {renderCartDetails()}
//       </div>
//     </div>
//   );
// };

// export default RecentTicket;
