// const costs = {
//     types: {
//         "Informative": 100,
//         "Dynamic": 200,
//         "E-commerce": 300,
//         "Corporate": 400
//     },
//     number: {
//         "1-4": 50,
//         "5-8": 100,
//         "9-20": 150,
//         "20-25": 200,
//         "Unlimited": 250
//     },
//     pages: {
//         "Home": 20,
//         "About": 15,
//         // Add costs for other pages
//     },
//     requirements: {
//         "Call Button": 10,
//         "Edit Pages": 20,
//         // Add costs for other requirements
//     },
//     brand: {
//         "Blue": 5,
//         "White": 5,
//         // Add costs for other colors
//     },
//     completed: {
//         "15 Days": 50,
//         "1 Month": 100,
//         "1-3 months": 150,
//         "3-6 months": 200,
//         "Flexible": 250
//     },
//     technology: {
//         "PHP": 20,
//         "HTML": 10,
//         // Add costs for other technologies
//     }
// };


// const calculateTotalCost = () => {
//     let total = 0;

//     total += selectedTypes.reduce((sum, type) => sum + (costs.types[type] || 0), 0);
//     total += SelectedNumber.reduce((sum, num) => sum + (costs.number[num] || 0), 0);
//     total += SelectedPage.reduce((sum, page) => sum + (costs.pages[page] || 0), 0);
//     total += SelectedRequirements.reduce((sum, req) => sum + (costs.requirements[req] || 0), 0);
//     total += SelectedBrand.reduce((sum, color) => sum + (costs.brand[color] || 0), 0);
//     total += SelectedCompleted.reduce((sum, comp) => sum + (costs.completed[comp] || 0), 0);
//     total += SelectedTechnology.reduce((sum, tech) => sum + (costs.technology[tech] || 0), 0);

//     return total;
// };






// import React, { useRef, useEffect, useState } from 'react';
// import { FaPlus } from "react-icons/fa";
// import { MdOutlineFileUpload } from "react-icons/md";
// import useCostCalculator from './useCostCalculator'; // Import your custom hook

// const costs = {
//     // Define your costs mapping here
// };

// const WebDevelopment = () => {
//     const [selectedOptions, toggleSelection, getSelectedItemsWithCosts, calculateTotalCost] = useCostCalculator({
//         types: [],
//         number: [],
//         pages: [],
//         requirements: [],
//         brand: [],
//         completed: [],
//         technology: []
//     });

//     const imageRef = useRef(null);
//     const documentRef = useRef(null);
//     const [uploadedFile, setUploadedFile] = useState({ logo: null, document: null });

//     useEffect(() => {
//         // Fetch website data and initialize state
//     }, []);

//     return (
//         <>
//             {/* Existing form elements */}

//             {/* Cost Breakdown and Total Cost */}
//             <div className="mt-5 border border-blue-300 rounded-lg p-4">
//                 <p className="text-lg font-semibold mb-3">Cost Breakdown</p>
//                 <ul>
//                     {getSelectedItemsWithCosts().map(({ item, price }) => (
//                         <li key={item} className="flex justify-between mb-2">
//                             <span>{item}</span>
//                             <span>${price.toFixed(2)}</span>
//                         </li>
//                     ))}
//                 </ul>
//                 <div className="mt-4 border-t border-blue-300 pt-2">
//                     <p className="text-lg font-semibold">Total Estimated Cost</p>
//                     <p className="text-xl font-bold">${calculateTotalCost().toFixed(2)}</p>
//                 </div>
//             </div>

//             {/* Existing form elements */}
//         </>
//     );
// };

// export default WebDevelopment;



        
 
