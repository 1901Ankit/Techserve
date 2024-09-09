"use client";
import { useState, useEffect, useContext, Suspense } from "react";
import WebDevelopmentComponent from "../(components)/website-calculator/WebDevelopmentComponent";
import ServicesModal from "../(components)/website-calculator/ServicesModal";
import useCostCalculator from "@/lib/useCostCalculator";
import Seoplan from "../(components)/Seoplan";
import { formatPrice, FormattedCurrencyPrice } from "../../lib/formattedCurrencyPrice";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { logoBase64 } from "../(fileImports)/constant";
import Ticket from "../(components)/Ticket";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/lib/context/userContext";
import { validateCalculatorSelections } from "@/lib/validateCalculatorOptions";
import EmailModal from "../(components)/EmailModal";
import { ToastContext } from '@/lib/context/ToastContext';
import Cart from "../(components)/Cart/Cart";
import DashboardSection from "../(components)/DashboardSection";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function WebsiteCalculator() {
  const { state: { user, token, isAuthenticated, country } } = useContext(UserContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const triggerDownload = searchParams.get('triggerDownload') === 'true';
  const defaultData = {
    types: [],
    number: [],
    pages: [],
    requirements: [],
    brand: [],
    completed: [],
    technology: [],
    appPlatform: [],
    ApiNeeded: Boolean,
    domain: Boolean,
    mail: Boolean,
    hosting: Boolean,
    logo: Boolean,
    createLogo: Boolean,
    domainDetails: { isDomainNeeded: Boolean, domainName: "" },
    officialMailDetails: { isOfficialMailNeeded: Boolean, officialMailName: "" },
    logoDetails: { hasLogo: Boolean, logoToBeCreated: false, logoImg: "" },
    budget: "",
    issue: "",
    referenceFiles: []
  };
  let initialData = JSON.parse(localStorage.getItem('items')) || defaultData;
  const [Errors, setErrors] = useState({});
  const initialSelectedServices = localStorage.getItem('service') || "";
  const [selectedServices, setSelectedServices] = useState(initialSelectedServices);
  const [selectedOptions, toggleSelection, selectedOptionsHandler, setSelectedOptions, getSelectedItemsWithCosts, calculateTotalCost] = useCostCalculator({ initialData, country, selectedServices });
  const [selectedItemAndCost, setSelectedItemAndCost] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [viewTicket, setViewTicket] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useContext(ToastContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    setSelectedItemAndCost(getSelectedItemsWithCosts());
    localStorage.setItem('items', JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  useEffect(() => {
    const retrievedSelectedOptions = JSON.parse(localStorage.getItem('items'));
    if (retrievedSelectedOptions) {
      setSelectedItemAndCost(getSelectedItemsWithCosts());
      setSelectedOptions(retrievedSelectedOptions);
    }


    const handleQuotationDownloadAfterRedirection = async () => {
      try {
        setSelectedOptions(retrievedSelectedOptions)
        const completed = await quotationDownloadHandler()

      } catch (error) {
        console.log(error);
      }
    };

    if (triggerDownload) {
      handleQuotationDownloadAfterRedirection();
    }
    if (selectedServices !== "") {
      setShowForm(true);
      shouldShowCloseButton();
      renderForm();
    }
  }, []);

  const services = [
    "Blockchain Development",
    "SEO Optimization",
    "Software Development",
    "App Development",
    "Web Development",
    "Data Analysis",
    "Cyber Security",
  ];

  const quotationDownloadHandler = async () => {
    setErrors({});
    if (!selectedServices) return;
    const error = await validateCalculatorSelections(selectedOptions, selectedServices);
    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else {
      if (!isAuthenticated) {
        router.push("/login?redirectUrl=website-calculator&triggerDownload=true");
        return;
      }
      setShowEmailModal(true);
    }
    return;
  };

  // Generate Pdf Invoice and send email to provided email address
  const generatePDF = async (email) => {
    const totalCost = calculateTotalCost();
    const { currencySymbol, price: totalFormattedPrice } = formatPrice(totalCost, country)

    const invoiceNumber = `INV-${Math.floor(Math.random() * 1000000)}`;
    const invoiceDate = new Date().toLocaleDateString();
    const docDefinition = {
      content: [
        {
          columns: [
            {
              image: logoBase64,
              width: 100,
              alignment: 'center',
              margin: [0, 0, 0, 20]
            },
            {
              text: 'Invoice',
              style: 'header',
              alignment: 'center',
              margin: [0, 0, 0, 20]
            }
          ]
        },
        {
          text: `Invoice Number: ${invoiceNumber}`,
          style: 'subheader',
          margin: [0, 0, 0, 10]
        },
        {
          text: `Date: ${invoiceDate}`,
          style: 'subheader',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'Wish Geeks Tech Serve\n12A02 Tower C 13th Floor \nIconic Corenthum\nSector-62, Noida, Uttar Pradesh, India, 201301\nPhone: +91 01204122558\nEmail: info@wishgeekstechserve.com',
          style: 'text'
        },
        {
          text: `${user.firstName} ${user.lastName}\n${user?.mobileNumber}\n${user.email}\n${country}`,
          style: 'text'
        },
        {
          text: 'Services:',
          style: 'sectionHeader',
          margin: [0, 20, 0, 10]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Service Description', 'Unit Cost', 'Total Cost'],
              ...selectedItemAndCost.map(({ item, price }) => {
                const { price: formattedPrice } = formatPrice(price, country)
                return [item, `${currencySymbol} ${formattedPrice}`, `${currencySymbol} ${formattedPrice}`]
              }),
              [{ text: 'Total', colSpan: 2 }, {}, `${currencySymbol} ${totalFormattedPrice}`]
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 20, 0, 20]
        },
        {
          text: 'Thank you for your business!',
          style: 'footer',
          alignment: 'center'
        }
      ],
      styles: {
        header: { fontSize: 22, bold: true },
        subheader: { fontSize: 16, bold: true },
        sectionHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        text: { fontSize: 12, margin: [0, 5, 0, 5] },
        footer: { fontSize: 12, italics: true, margin: [0, 20, 0, 0] }
      }
    };
    pdfMake.createPdf(docDefinition).getBase64((data) => {
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pdfBase64: data })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            showToast(`Invoice sent successfully to ${email}`, "success");
          } else {
            showToast("Failed to send invoice", "error");
          }
        })
        .catch(error => {
          console.error('Fetch Error:', error);
          showToast("Failed to send invoice", "error");
        });
      pdfMake.createPdf(docDefinition).download('invoice.pdf');
    });
  };

  const handleEmailModalSubmit = async (email, firstName, lastName) => {
    setLoading(true);
    try {
      // Calling Bold Sign API to send the document using the templateId
      const sendDocRes = await fetch('/api/send-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: '8728a47d-9945-4054-bd73-2e2e1c15c521',
          name: `${firstName} ${lastName}`,
          email: email,
          userId: user._id,
        }),
      });

      if (!sendDocRes.ok) {
        const errorResponse = await sendDocRes.json();
        throw new Error(errorResponse.error || 'Failed to send document. Please try again.');

      }

      // Show success modal after everything is done
      showToast('Contract and Invoice Sent Successfully', 'success');

      const { documentId } = await sendDocRes.json();

      if (!documentId) {
        throw new Error('No documentId returned from send-contract API');
      }

      // First, store the selected details
      const initialStoreRes = await fetch('/api/store-selected-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          serviceType: selectedServices,
          currentCountry: country,
          selectedServiceAndPriceDetails: selectedItemAndCost,
          selectedServiceDetails: selectedOptions,
          contractDocumentId: documentId,  // Adding documentId here
        }),
      });

      if (!initialStoreRes.ok) {
        const errorResponse = await initialStoreRes.json();
        const message = errorResponse.error || 'Failed to store details. Please try again.';
        throw new Error(message);
      }

      // Calling the Bold Sign API to get document properties using the returned documentId
      const getDocPropsRes = await fetch(`/api/get-contract-details?documentId=${documentId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!getDocPropsRes.ok) {
        const errorResponse = await getDocPropsRes.json();
        const message = errorResponse.error || 'Failed to retrieve document properties.';
        throw new Error(message);
      }
      const documentProperties = await getDocPropsRes.json();

      // Calling the function to generate and download the PDF invoice
      await generatePDF(email);
      setSelectedOptions(defaultData);
      localStorage.removeItem('service');
      localStorage.removeItem('items');

      triggerDownload && router.replace("/website-calculator");
      setErrors({});
      setShowEmailModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


 const toggleService = (service) => {
  if (service === "Raise a Ticket") {
    if (!selectedServices) {
      // alert("Please select a service before raising a ticket.");
      // return;
    }
    setShowForm(false);
    setViewTicket(true);
    return;
  }
  setErrors({});
  setSelectedServices(service);
  localStorage.setItem("service", service);
  console.log("Service set in localStorage:", service); // Debugging line
  setSelectedItemAndCost(getSelectedItemsWithCosts());
  setShowForm(true);
  setModalContent(null);
  setViewTicket(false);
};

useEffect(() => {
  const retrievedSelectedServices = localStorage.getItem('service');
  console.log("Retrieved service from localStorage:", retrievedSelectedServices); // Debugging line
  if (retrievedSelectedServices) {
    setSelectedServices(retrievedSelectedServices);
  }
}, []);


  const renderForm = () => {
    switch (selectedServices) {
      case "Blockchain Development":
        return <ServicesModal heading="Blockchain Development" />;
      case "SEO Optimization":
        return <Seoplan />;
      case "Software Development":
        return <ServicesModal heading="Software Development" />;
      case "App Development":
        return <WebDevelopmentComponent selectedServices={selectedServices} selectedOptions={selectedOptions} toggleSelection={toggleSelection} selectedOptionsHandler={selectedOptionsHandler} setSelectedOptions={setSelectedOptions} Errors={Errors} />;
      case "Web Development":
        return <WebDevelopmentComponent selectedServices={selectedServices} selectedOptions={selectedOptions} toggleSelection={toggleSelection} selectedOptionsHandler={selectedOptionsHandler} setSelectedOptions={setSelectedOptions} Errors={Errors} />;
      case "Data Analysis":
        return <ServicesModal heading="Data Analysis" />;
      case "Cyber Security":
        return (
          <ServicesModal
            heading="Cyber Security"
            content={
              <ul className="list-decimal pl-5 mt-1">
                <li className="ml-7 text-left">Trend micro Service One</li>
                <li className="ml-7 text-left">Small Office Security</li>
                <li className="ml-7 text-left">Trend micro Internet Security</li>
                <li className="ml-7 text-left">Antivirus Security</li>
                <li className="ml-7 text-left">Trend micro Vision One</li>
                <li className="ml-7 text-left">All In One Protection</li>
                <p className="mt-3 text-left">Contact us to avail the above services</p>
              </ul>
            }
          />
        );
      default:
        return null;
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedServices("");
    localStorage.removeItem("service");
    setErrors({});
    setModalContent(null);
    setViewTicket(false);
  };

  const shouldShowCloseButton = () => {
    return ["App Development", "Web Development", "SEO Optimization"].includes(selectedServices);
  };

  const isModalOpen = () => {
    return ["Blockchain Development", "Software Development", "Data Analysis", "Cyber Security"].includes(selectedServices);
  };

  const shouldHideSelectServices = () => {
    return ["App Development", "Web Development", "SEO Optimization"].includes(selectedServices);
  };

  // Dummy data for the Ticket component
  const ticketData = {
    selectedService: selectedServices || "N/A",
    purchasedDate: "1st August 2024",
    deliveredDate: "10th August 2024",
    status: "Completed",
    costBreakdown: selectedItemAndCost
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
   <div className="container px-4 md:px-8 lg:px-10 xl:px-16 min-h-full  mx-auto">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 min-h-full">
          {/* Dashboard Section */}
          <DashboardSection toggleService={toggleService} />

          {/* Main Content */}
          <div className="col-span-1 md:col-span-3 lg:col-span-8 relative " 
          // style={{ borderRight: "2px solid #e2e8f0", maxWidth: "1000px" }}
          >
            {/* Conditional Rendering Based on Current State */}
            {!shouldHideSelectServices() && (
              <div className={`select-section ${isModalOpen() ? 'opacity-1' : 'block'}`}>
                <p className="text-lg font-bold mb-6 mt-5 lg:pl-12 lg:pt-6 lg:text-center">Select Services</p>
                <div className="container mx-auto md:px-10" style={{ maxWidth: "800px" }}>
                  <div className="grid grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-2 rounded-lg md:px-12 md:py-8 md:mb-[20%] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    {services.map((service) => (
                      <div
                        key={service}
                        className={`border border-blue-300 rounded-lg p-2 flex items-center justify-center cursor-pointer 
                                    ${selectedServices === service ? "bg-blue-500 text-white" : "bg-white text-black"} 
                                    md:border-2 lg:border-2 `} 
                        onClick={() => toggleService(service)}
                      >
                        <p className="text-center text-sm md:text-xl font-medium">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Form View */}
            {showForm && (
              <>
                {shouldShowCloseButton() && (
                  <button
                    onClick={handleCloseForm}
                    className="absolute top-0 left-0 mt-8 ml-8 p-2 text-black flex items-center justify-center"
                    aria-label="Close Form"
                    style={{ float: "left", fontSize: "25px" }}
                  >
                    &larr;
                  </button>
                )}
                {renderForm()}
              </>
            )}
          </div>
          
          {/* Conditionally render the Cart Section */}
          <div 
            className={`fixed col-span-1 md:col-span-3 lg:col-span-2 mt-5  bottom-0 right-0 bg-white transition-transform
            ${isCartVisible ? 'translate-y-0' : 'translate-y-full'} md:translate-y-0 md:relative md:bottom-auto`} // Adjust for mobile
            style={{ maxWidth: "100%", transition: "transform 0.3s ease" }}
          >
            <Cart
              selectedServices={selectedServices}
              selectedItemAndCost={selectedItemAndCost}
              calculateTotalCost={calculateTotalCost}
              country={country}
              quotationDownloadHandler={quotationDownloadHandler}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="relative">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <ServicesModal heading={selectedServices} content={modalContent} />
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-0 right-0 mt-4 mr-4 p-2 text-white bg-red-500 rounded-full hover:bg-red-700"
              aria-label="Close Modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* Email Modal */}
      {showEmailModal && (
        <EmailModal
          onSend={handleEmailModalSubmit}
          onClose={() => setShowEmailModal(false)}
          loading={loading}
        />
      )}

      {/* View Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed bottom-0 right-0 m-4 p-2 bg-blue-500 text-white rounded-full shadow-lg md:hidden"
      >
        View Cart
      </button>
    </div>
  );
}








// {(selectedServices === "Web Development" || selectedServices === "App Development") && (
//   <div className="col-span-1 md:col-span-3 lg:col-span-2 mt-5">
//     <div className="sticky top-0 z-10 bg-white rounded-lg p-3">
//       <h2 className="text-2xl font-semibold mb-6 text-center mt-5">Your Cart</h2>
//       <p className="text-lg font-semibold mb-3">Cost Breakdown</p>
//       <ul className="space-y-2">
//         {selectedItemAndCost.map(({ item, price }) => (
//           <li key={item} className="flex justify-between items-center">
//             <span className="text-base">{item}</span>
//             <FormattedCurrencyPrice price={price} country={country} />
//           </li>
//         ))}
//       </ul>
//       <div className="mt-2">
//         <div className="border border-blue-300 rounded-lg p-4 flex justify-between items-center">
//           <p className="text-sm font-medium">Grand Total</p>
//           <p className="text-sm font-medium">
//             <FormattedCurrencyPrice price={calculateTotalCost()} country={country} />
//           </p>
//         </div>
//         <div className="mt-5">
//           <button
//             onClick={quotationDownloadHandler}
//             type="submit"
//             className="border border-blue-300 rounded-lg text-black p-2 w-full hover:bg-blue-100 transition-colors duration-300"
//           >
//             Download Quotation and Pay Later
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}