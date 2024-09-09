import React, { useState, useEffect, useRef } from 'react';

const ViewPlans = ({ onPlanSelect, onServiceSelect }) => {
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [hasSelectedService, setHasSelectedService] = useState(false);
  const dropdownRef = useRef(null);

  const plans = {
    AppDevelopment: [
      { name: '1 Month', description: 'Access to all features and premium support.', price: '99' },
      { name: '3 Month', description: 'Everything in Premium plus exclusive features and priority support.', price: '199' },
      { name: '6 Month', description: 'Everything in Premium plus exclusive features and priority support.', price: '299' }
    ],
    WebDevelopment: [
      { name: '1 Month', description: 'Access to all features and premium support.', price: '99' },
      { name: '3 Month', description: 'Everything in Premium plus exclusive features and priority support.', price: '199' },
      { name: '6 Month', description: 'Everything in Premium plus exclusive features and priority support.', price: '299' }
    ],
  };

  useEffect(() => {
    const fetchCurrencySymbol = async () => {
      try {
        const response = await fetch('http://ip-api.com/json/');
        const data = await response.json();
        setCurrencySymbol(data.currencySymbol || '$');
      } catch (error) {
        console.error('Error fetching currency symbol:', error);
      }
    };

    fetchCurrencySymbol();
  }, []);

  const handlePlanSelect = (name, price) => {
    const existingPlans = JSON.parse(localStorage.getItem('selectedPlans')) || [];
    existingPlans.push({ name, price });
    localStorage.setItem('selectedPlans', JSON.stringify(existingPlans));
    onPlanSelect(name, price);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setHasSelectedService(true);
    setDropdownOpen(false);
    localStorage.setItem('selectedService', service); // Save selected service to localStorage
    onServiceSelect(service); // Notify parent about the selected service
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold text-blue-500 mb-6">View Plans</h1>
      <div className="flex items-center justify-start w-full relative">
        <h3 className="text-2xl font-semibold text-blue-500 mr-4">
          Select the services to view & purchase plan
        </h3>
        <span
          className="cursor-pointer text-blue-600 hover:text-blue-800 flex items-center relative"
          onClick={toggleDropdown}
        >
          SERVICES
          <svg
            className={`ml-2 w-5 h-5 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-10 p-2"
            style={{ minWidth: '200px' }}
          >
            <ul>
              {Object.keys(plans).map((service, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => handleServiceClick(service)}
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full max-w-screen-lg mt-6">
        {!hasSelectedService ? (
          <div className="flex items-center justify-center h-64 border border-gray-300 rounded-lg bg-white shadow-md p-6 text-center">
            <p className="text-lg font-semibold text-gray-700">Please select a service to view plans.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {(plans[selectedService] || []).map((plan, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-inner"
              >
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <p className="text-sm mb-4">{plan.description}</p>
                <p className="text-lg font-semibold">{currencySymbol}{plan.price}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => handlePlanSelect(plan.name, plan.price)}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPlans;









// Original ...........

// import React from 'react';

// const ViewPlans = ({ onPlanSelect }) => {
//   const plans = [
//     { name: 'BASIC', description: 'Basic access with limited features. Free for 7 days.', price: 'Free' },
//     { name: 'STANDARD', description: 'Access to all features and premium support.', price: '$99/month' },
//     { name: 'PREMIUM', description: 'Everything in Premium plus exclusive features and priority support.', price: '$199/month' }
//   ];

//   const handlePlanSelect = (name, price) => {
//     // local storage service
//     const existingPlans = JSON.parse(localStorage.getItem('selectedPlans')) || [];
//     console.log("---------test------------",existingPlans)
    
//     existingPlans.push({ name, price });
    
//     // update Service in localStorage
//     localStorage.setItem('selectedPlans', JSON.stringify(existingPlans));

//     onPlanSelect(name, price);
//   };

//   return (
//     <div className="flex flex-col items-center p-4 md:p-6 lg:p-8">
//       <h1 className="text-2xl font-semibold text-blue-500 mb-6">View Plans</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-screen-lg">
//         {plans.map((plan, index) => (
//           <div
//             key={index}
//             className="border border-gray-300 rounded-lg p-4 bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-inner"
//           >
//             <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
//             <p className="text-sm mb-4">{plan.description}</p>
//             <p className="text-lg font-semibold">{plan.price}</p>
//             <button
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
//               onClick={() => handlePlanSelect(plan.name, plan.price)}
//             >
//               Choose Plan
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewPlans;



// =================================================









