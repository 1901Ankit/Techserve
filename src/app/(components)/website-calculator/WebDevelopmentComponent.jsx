"use client";
import React, { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdOutlineFileUpload } from 'react-icons/md';

const WebDevelopment = ({ selectedOptions, toggleSelection, setSelectedOptions, selectedOptionsHandler, selectedServices, handleDownloadQuotation, Errors }) => {
    const [page, setPage] = useState([
        "Home", "About", "Contact", "Services", "Career", "Portfolio", "Enquiry",
        "Testimonials", "Faq’s", "Events", "Privacy Policy", "Refund Policy",
        "Complaint", "News", "Blog"
    ]);

    const [requirements, setRequirements] = useState([
        "Call Button",
        "Edit Pages",
        "Admin Panel",
        "Whatsapp Chat",
        "Payment",
    ]);

    const [brand, setBrand] = useState(["Blue", "White", "Black", "Orange"]);

    const [technology, setTechnology] = useState([
        "PHP",
        "HTML",
        "JAVA SCRIPT",
        "REACT",
        "FLUTTER",
        "DJANGO",
        "PYTHON",
        "NODE.JS",
    ]);

    const [completed, setCompleted] = useState([
        "15 Days",
        "1 Month",
        "1-3 months",
        "3-6 months",
        "Flexible",
    ]);

    const types = ["Informative", "Dynamic", "E-commerce", "Corporate"];

    const number = ["1-4", "5-8", "9-20", "20-25", "Unlimited"];
    const appPlatform = ["IOS", "Android", "Web", "All of the Above"];

    const imageRef = useRef(null);
    const documentRef = useRef(null);

    const [uploadedFile, setUploadedFile] = useState({ logo: null, document: null });
    const [newlyAddedDetails, setNewlyAddedDetails] = useState({ newPage: "", newRequirement: "", newBrand: "", newTechnology: "", newCompleted: "" });

    const [isUploading, setIsUploading] = useState(false); // New state for loader
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [fileType, setFileType] = useState('');

    const handleFileUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            setFileToUpload(file);
            setFileType(type);
            setShowConfirmDialog(true);
        }
    };

    const confirmUpload = async () => {
        if (!fileToUpload) return;

        setIsUploading(true); // Show loader

        const formData = new FormData();
        formData.append('file', fileToUpload);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Upload successful:', result);
            setUploadedFile(prevState => ({ ...prevState, [fileType]: fileToUpload }));
            setFileToUpload(null);
            setShowConfirmDialog(false);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false); // Hide loader
        }
    };

    const cancelUpload = () => {
        setFileToUpload(null);
        setShowConfirmDialog(false);
    };

    const getFilePreview = (file) => {
        if (!file) return null;

        const fileURL = URL.createObjectURL(file);
        if (file.type.startsWith('image/')) {
            return <img src={fileURL} alt="Preview" className="max-w-xs max-h-60" />;
        } else if (file.type.startsWith('application/pdf')) {
            return <iframe src={fileURL} className="w-full h-60" title="Preview"></iframe>;
        } else {
            return <p>Preview not available for this file type.</p>;
        }
    };

    return (
        <div className='bg-[#EAF3FD] py-5 px-6 mt-5 rounded-lg drop-shadow-[0_4_4px_rgba(0,0,0,0.25)] border-2 border-[#3085ed] md:mb-6'>
            <div className="website-calculator-bg-linier py-5 -mt-4">
                <p className="text-4lg font-semibold mb-2 flex items-center justify-center ">{selectedServices === "App Development" ? "APP" : "Web"} Development</p>
                <p className="text-sm font-semibold mb-5 flex items-center justify-center text-blue-500">Please Fill-up All Required Information</p>

{/* ---------------------------- */}
<div className="mt-5">
    <div className="border border-blue-300 rounded-lg p-4">
        <p className="text-xs md:text-lg font-semibold mb-3">Select the type of your {selectedServices === "App Development" ? "APP" : "Website"}</p>
        <div className="mx-auto w-full">
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {types.map((type) => (
                     <div
                     key={type}
                     className={`flex items-center justify-center cursor-pointer 
                         ${selectedOptions.types.includes(type) ? "sm:bg-blue-500 sm:text-white  text-black" : " sm:text-black"} 
                         sm:border sm:border-blue-300 sm:rounded-lg sm:p-2`}
                     onClick={() => toggleSelection('types', type)}
                 >
                     <p className="text-center text-sm font-medium">{type}</p>
                 </div>
                ))}
            </div>
            {Errors.types && <p className="text-xs md:text-sm text-red-500 mt-2">* {Errors.types}</p>}
        </div>
    </div>
</div>


                <div className="mt-5">
    <div className="border border-blue-300 rounded-lg p-4">
        <p className="text-lg font-semibold mb-3">Number of Pages</p>
        <div className="mx-auto w-full">
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {number.map((num) => (
                    <div
                    key={num}
                    className={`flex items-center justify-center cursor-pointer 
                        ${selectedOptions.number.includes(num) ? "sm:bg-blue-500 sm:text-white  text-black" : " sm:text-black"} 
                        sm:border sm:border-blue-300 sm:rounded-lg sm:p-2`}
                    onClick={() => toggleSelection('number', num)}
                >
                    <p className="text-center text-sm font-medium">{num}</p>
                </div>
                ))}
            </div>
            {Errors.number && <p className="text-xs md:text-sm text-red-500 mt-2">* {Errors.number}</p>}
        </div>
    </div>
</div>

                {selectedServices === "App Development" && (
                    <>
                        <div className="mt-5">
    <div className="border border-blue-300 rounded-lg p-4">
        <p className="text-lg font-semibold mb-3">What platform(s) do you want the app to be available on?</p>
        <div className="mx-auto w-full">
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appPlatform.map((item) => (
                    <div
                    key={item}
                    className={`flex items-center justify-center cursor-pointer 
                        ${selectedOptions.appPlatform.includes(item) ? "sm:bg-blue-500 sm:text-white  text-black" : " sm:text-black"} 
                        sm:border sm:border-blue-300 sm:rounded-lg sm:p-2`}
                    onClick={() => toggleSelection('appPlatform', item)}
                >
                    <p className="text-center text-sm font-medium">{item}</p>
                </div>
                ))}
            </div>
            {Errors.appPlatform && <p className="text-xs md:text-sm text-red-500 mt-2">* {Errors.appPlatform}</p>}
        </div>
    </div>
</div>

                        <div className="border border-blue-300 rounded-lg p-4 mt-5">
                            <div className="flex-1">
                                <p className="font-semibold mb-2">Do you need API Documentation?</p>
                                <div className="flex gap-4">
                                    <div className={`border border-blue-300 rounded-lg text-black p-2 w-1/4 flex items-center justify-center cursor-pointer ${selectedOptions.ApiNeeded === true ? 'bg-blue-500 text-white' : ''}`} onClick={() => selectedOptionsHandler("ApiNeeded", true)}>
                                        <p className="text-sm font-medium">Yes</p>
                                    </div>
                                    <div className={`border border-blue-300 rounded-lg text-black p-2 w-1/4 flex items-center justify-center cursor-pointer ${selectedOptions.ApiNeeded === false ? 'bg-blue-500 text-white' : ''}`} onClick={() => selectedOptionsHandler('ApiNeeded', false)}>
                                        <p className="text-sm font-medium">No</p>
                                    </div>
                                </div>
                                {Errors.apiDocs && <p className="text-xs md:text-sm text-red-500">* {Errors.apiDocs}</p>}
                            </div>
                        </div>
                    </>
                )}

                {selectedServices === "Web Development" && (
<div className="mt-5">
    <div className="border border-blue-300 rounded-lg p-4">
        <p className="text-lg font-semibold mb-3">Pages Name</p>
        <div className="mx-auto w-full">
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {page.map((pg) => (
                  <div
                  key={pg}
                  className={`flex items-center justify-center cursor-pointer 
                      ${selectedOptions.pages.includes(pg) ? "sm:bg-blue-500 sm:text-white  text-black" : " sm:text-black"} 
                      sm:border sm:border-blue-300 sm:rounded-lg sm:p-2`}
                  onClick={() => toggleSelection('pages', pg)}
              >
                  <p className="text-center text-sm font-medium">{pg}</p>
              </div>
                ))}
                <div className="hidden md:flex items-center border border-blue-300 rounded-lg p-2 cursor-pointer w-full max-w-xs">
                    <input
                        type="text"
                        value={newlyAddedDetails.newPage}
                        onChange={(e) => setNewlyAddedDetails({ ...newlyAddedDetails, newPage: e.target.value })}
                        placeholder="Add"
                        className="ml-2 px-2 py-1 border rounded w-full"
                    />
                    <button
                        aria-label="Add Page"
                        className="text-blue-500 ml-2"
                        onClick={() => {
                            if (AddMore(setPage, newlyAddedDetails.newPage, page)) {
                                toggleSelection('pages', newlyAddedDetails.newPage);
                                setNewlyAddedDetails({ ...newlyAddedDetails, newPage: "" });
                            }
                        }}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
            {Errors.pages && <p className="text-xs md:text-sm text-red-500 mt-2">* {Errors.pages}</p>}
        </div>
    </div>
</div>
                )}


{/* Brand */}
<div className="mt-5">
    <div className="border border-blue-300 rounded-lg p-4 mt-5">
        <p className="text-lg font-semibold mb-3">Brand Color</p>
        <div className="mx-auto w-full">
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {brand.map((br) => (
                     <div
                     key={br}
                     className={`flex items-center justify-center cursor-pointer 
                         ${selectedOptions.brand.includes(br) ? "sm:bg-blue-500 sm:text-white  text-black" : " sm:text-black"} 
                         sm:border sm:border-blue-300 sm:rounded-lg sm:p-2`}
                     onClick={() => toggleSelection('brand', br)}
                 >
                     <p className="text-center text-sm font-medium">{br}</p>
                 </div>
                ))}
                <div className="hidden md:flex items-center border border-blue-300 rounded-lg p-2 cursor-pointer w-full max-w-xs">
                    <input
                        type="text"
                        value={newlyAddedDetails.newBrand}
                        onChange={(e) => setNewlyAddedDetails({ ...newlyAddedDetails, newBrand: e.target.value })}
                        placeholder="Add"
                        className="ml-2 px-2 py-1 border rounded w-full"
                    />
                    <button
                        aria-label="Add Brand"
                        className="text-blue-500 ml-2"
                        onClick={() => {
                            if (AddMore(setBrand, newlyAddedDetails.newBrand, brand)) {
                                toggleSelection('brand', newlyAddedDetails.newBrand);
                                setNewlyAddedDetails({ ...newlyAddedDetails, newBrand: "" });
                            }
                        }}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
            {Errors.brand && <p className="text-xs md:text-sm text-red-500 mt-2">* {Errors.brand}</p>}
        </div>
    </div>
</div>



                {/* Technology */}
                <div className="mt-5">
    <div className="border border-blue-300 rounded-lg p-4 mt-5">
        <p className="text-lg font-semibold mb-3">Technology</p>
        <div className="mx-auto w-full">
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {technology.map((tech) => (
                    <div
                    key={tech}
                    className={`flex items-center justify-center cursor-pointer 
                        ${selectedOptions.technology.includes(tech) ? "sm:bg-blue-500 sm:text-white  text-black" : " sm:text-black"} 
                        sm:border sm:border-blue-300 sm:rounded-lg sm:p-2`}
                    onClick={() => toggleSelection('technology', tech)}
                >
                    <p className="text-center text-sm font-medium">{tech}</p>
                </div>
                
                ))}
               <div className="hidden md:flex items-center border border-blue-300 rounded-lg p-2 cursor-pointer w-full max-w-xs">
    <input
        type="text"
        value={newlyAddedDetails.newTechnology}
        onChange={(e) => setNewlyAddedDetails({ ...newlyAddedDetails, newTechnology: e.target.value })}
        placeholder="Add"
        className="ml-2 px-2 py-1 border rounded w-full"
    />
    <button
        className="text-blue-500 ml-2"
        onClick={() => {
            if (AddMore(setTechnology, newlyAddedDetails.newTechnology, technology)) {
                toggleSelection('technology', newlyAddedDetails.newTechnology)
                setNewlyAddedDetails({ ...newlyAddedDetails, newTechnology: "" })
            }
        }}
    >
        <FaPlus />
    </button>
</div>

            </div>
            {Errors.technology && <p className="text-xs md:text-sm text-red-500 mt-2">* {Errors.technology}</p>}
        </div>
    </div>
</div>





{/* Requirement */}
<div className="mt-5">
    <div className="border border-blue-300 rounded-lg p-4 mt-5">
        <p className="text-lg font-semibold mb-3">Requirements</p>
        <div className="mx-auto w-full">
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {requirements.map((req) => (
                       <div
                       key={req}
                       className={`flex items-center justify-center cursor-pointer 
                           ${selectedOptions.requirements.includes(req) ? "sm:bg-blue-500 sm:text-white  text-black" : " sm:text-black"} 
                           sm:border sm:border-blue-300 sm:rounded-lg sm:p-2`}
                       onClick={() => toggleSelection('requirements', req)}
                   >
                       <p className="text-center text-sm font-medium">{req}</p>
                   </div>
                ))}
                <div className="hidden md:flex items-center border border-blue-300 rounded-lg p-2 cursor-pointer w-full max-w-xs">
                    <input
                        type="text"
                        value={newlyAddedDetails.newRequirement}
                        onChange={(e) => setNewlyAddedDetails({ ...newlyAddedDetails, newRequirement: e.target.value })}
                        placeholder="Add"
                        className="ml-2 px-2 py-1 border rounded w-full"
                    />
                    <button
                        aria-label="Add Requirement"
                        className="text-blue-500 ml-2"
                        onClick={() => {
                            if (AddMore(setRequirements, newlyAddedDetails.newRequirement, requirements)) {
                                toggleSelection('requirements', newlyAddedDetails.newRequirement);
                                setNewlyAddedDetails({ ...newlyAddedDetails, newRequirement: "" });
                            }
                        }}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
            {Errors.requirements && <p className="text-xs md:text-sm text-red-500 mt-2">* {Errors.requirements}</p>}
        </div>
    </div>
</div>

              {/* Time */}
<div className="mt-5">
    <div className="border border-blue-300 rounded-lg p-4">
        <p className="text-lg font-semibold mb-3">Project Completion Time</p>
        <div className="mx-auto w-full">
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {completed.map((time) => (
                      <div
                      key={time}
                      className={`flex items-center justify-center cursor-pointer 
                          ${selectedOptions.completed.includes(time) ? "sm:bg-blue-500 sm:text-white  text-black" : " sm:text-black"} 
                          sm:border sm:border-blue-300 sm:rounded-lg sm:p-2`}
                      onClick={() => toggleSelection('completed', time)}
                  >
                      <p className="text-center text-sm font-medium">{time}</p>
                  </div>
                ))}
                <div className="hidden md:flex items-center border border-blue-300 rounded-lg p-2 cursor-pointer w-full max-w-xs">
                    <input
                        type="text"
                        value={newlyAddedDetails.newCompleted}
                        onChange={(e) => setNewlyAddedDetails({ ...newlyAddedDetails, newCompleted: e.target.value })}
                        placeholder="Add"
                        className="ml-2 px-2 py-1 border rounded w-full"
                    />
                    <button
                        aria-label="Add Completion Time"
                        className="text-blue-500 ml-2"
                        onClick={() => {
                            if (AddMore(setCompleted, newlyAddedDetails.newCompleted, completed)) {
                                toggleSelection('completed', newlyAddedDetails.newCompleted);
                                setNewlyAddedDetails({ ...newlyAddedDetails, newCompleted: "" });
                            }
                        }}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
            {Errors.completed && <p className="text-xs md:text-sm text-red-500 mt-2">* {Errors.completed}</p>}
        </div>
    </div>
</div>

                {/* Domain Section */}
                {/* <div className="container mx-auto p-4 mt-5 border border-blue-300 rounded-lg"> */}
                <div className="flex flex-col sm:flex-row justify-between gap-8">
                    {selectedServices === "Web Development" && (
                        <div className="container mx-auto p-4 mt-5 border border-blue-300 rounded-lg">

                            <div className="flex-1">
                                <p className="font-semibold mb-2">Do you want Domain?</p>
                                <div className="flex gap-4">
                                    <div
                                        className={`border border-blue-300 rounded-lg text-black p-1 w-1/4 mt-3 cursor-pointer ${selectedOptions.domain === true ? 'bg-blue-500 text-white' : ''}`}
                                        onClick={() => {
                                            selectedOptionsHandler('domain', true)
                                        }}
                                    >
                                        <p className="text-center text-sm font-medium">Yes</p>
                                    </div>
                                    <div
                                        className={`border border-blue-300 rounded-lg text-black p-1 w-1/4 mt-3 cursor-pointer ${selectedOptions.domain === false ? 'bg-blue-500 text-white' : ''}`}
                                        onClick={() => {
                                            setSelectedOptions({ ...selectedOptions, domain: false, domainDetails: { isDomainNeeded: false, domainName: "" } })
                                        }}
                                    >
                                        <p className="text-center text-sm font-medium">No</p>
                                    </div>
                                </div>

                                {selectedOptions.domain === true && (
                                    <input
                                        type="text"
                                        value={selectedOptions.domainDetails?.domainName}
                                        onChange={(e) => {
                                            if (e.target.value !== "") {
                                                selectedOptionsHandler('domain', true)
                                            }
                                            setSelectedOptions({ ...selectedOptions, domainDetails: { isDomainNeeded: e.target.value !== "" ? true : false, domainName: e.target.value } })
                                        }}
                                        placeholder="Domain Details"
                                        className="ml-2 px-2 py-1 border rounded w-full mt-3"
                                    />
                                )}
                                {selectedOptions.domain === true && selectedOptions?.domainDetails?.domainName !== "" && (
                                    <p className="mt-2 text-sm">Domain you want: {selectedOptions.domainDetails?.domainName}</p>
                                )}
                                {Errors.domain && <p className="text-xs md:text-sm text-red-500">* {Errors.domain}</p>}
                            </div>
                        </div>


                    )}



                </div>
                {/* </div> */}

                {/* Hosting Section */}
                <div className="container mx-auto p-4 mt-5 border border-blue-300 rounded-lg">
                    <div className="flex-1">
                        <p className="font-semibold mb-2">Do you want Hosting?</p>
                        <div className="flex gap-4">
                            <div
                                className={`border border-blue-300 rounded-lg text-black p-1 w-1/4 mt-3 cursor-pointer ${selectedOptions.hosting === true ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => selectedOptionsHandler('hosting', true)}
                            >
                                <p className="text-center text-sm font-medium">Yes</p>
                            </div>
                            <div
                                className={`border border-blue-300 rounded-lg text-black p-1 w-1/4 mt-3 cursor-pointer ${selectedOptions.hosting === false ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => selectedOptionsHandler('hosting', false)}
                            >
                                <p className="text-center text-sm font-medium">No</p>
                            </div>
                        </div>
                        {Errors.hosting && <p className="text-xs md:text-sm text-red-500">* {Errors.hosting}</p>}
                    </div>

                </div>


                {/* Official Mail Section */}
                <div className="container mx-auto p-4 mt-5 border border-blue-300 rounded-lg">

                    <div className="flex-1">
                        <p className="font-semibold mb-2">Do you want Official Mail?</p>
                        <div className="flex gap-4">
                            <div
                                className={`border border-blue-300 rounded-lg text-black p-1 w-1/4 mt-3 cursor-pointer ${selectedOptions.mail === true ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => { selectedOptionsHandler('mail', true) }}
                            >
                                <p className="text-center text-sm font-medium">Yes</p>
                            </div>
                            <div
                                className={`border border-blue-300 rounded-lg text-black p-1 w-1/4 mt-3 cursor-pointer ${selectedOptions.mail === false ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() =>
                                    setSelectedOptions({ ...selectedOptions, mail: false, officialMailDetails: { isOfficialMailNeeded: false, officialMailName: "" } })
                                }
                            >
                                <p className="text-center text-sm font-medium">No</p>
                            </div>
                        </div>
                        {selectedOptions.mail === true && (
                            <input
                                type="text"
                                value={selectedOptions.officialMailDetails?.officialMailName}
                                onChange={(e) => {
                                    if (e.target.value !== "") {
                                        selectedOptionsHandler('mail', true)
                                    }
                                    setSelectedOptions({ ...selectedOptions, officialMailDetails: { isOfficialMailNeeded: e.target.value !== "" ? true : false, officialMailName: e.target.value } })
                                }}
                                placeholder="Mail Details"
                                className="ml-2 px-2 py-1 border rounded w-full mt-3"
                            />
                        )}
                        {selectedOptions.mail === true && selectedOptions?.officialMailDetails?.officialMailName !== "" && (
                            <p className="mt-2 text-sm">Mail Details: {selectedOptions?.officialMailDetails?.officialMailName}</p>
                        )}
                        {Errors.email && <p className="text-xs md:text-sm text-red-500">* {Errors.email}</p>}
                    </div>
                </div>

                {/* Logo section */}
                <div className="border border-blue-300 rounded-lg p-4 mt-5 flex flex-col">
    <p className="text-lg font-semibold mb-2">Logo</p>
    <p className="text-xm font-semibold text-gray-400">
        Do you have a company logo that you would like to incorporate into the website?
    </p>
    <div className="flex gap-4 mt-4">
        <div
            className={`border border-blue-300  rounded-lg text-black p-1 w-1/4 cursor-pointer ${selectedOptions.logo === true ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => selectedOptionsHandler('logo', true)}
        >
            <p className="text-center text-sm font-medium">Yes</p>
        </div>
        <div
            className={`border border-blue-300  rounded-lg text-black p-1 w-1/4 cursor-pointer ${selectedOptions.logo === false ? 'bg-blue-500 text-white' : ''}`}
            onClick={() =>
                setSelectedOptions({ ...selectedOptions, logo: false, logoDetails: { hasLogo: false, logoToBeCreated: false, logoImg: "" } })
            }
        >
            <p className="text-center text-sm font-medium">No</p>
        </div>
    </div>
    {selectedOptions.logo === true ? (
        <div className="flex gap-4 mt-4">
            <div
                onClick={() => imageRef.current.click()}
                className="border border-blue-300 cursor-pointer rounded-lg text-black p-2 w-fit ml-auto flex items-center justify-center"
            >
                <p className="text-sm font-medium mr-2 whitespace-nowrap">
                    {uploadedFile.logo ? uploadedFile.logo.name : "Upload your logo here"}
                </p>
                <MdOutlineFileUpload />
                <input
                    ref={imageRef}
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'logo')}
                />
            </div>
        </div>
    ) : null}
    {selectedOptions.logo === false && (
        <div className="flex items-center mt-5">
            <input
                type="checkbox"
                id="createLogo"
                name="createLogo"
                className="mr-2 h-4 w-4"
                checked={selectedOptions.logoDetails.logoToBeCreated}
                onChange={(e) =>
                    setSelectedOptions({ ...selectedOptions, createLogo: e.target.checked ? true : false, logoDetails: { hasLogo: selectedOptions.logoDetails.hasLogo, logoToBeCreated: e.target.checked ? true : false, logoImg: selectedOptions.logoDetails.logoImg } })
                }
            />
            <label
                htmlFor="createLogo"
                className="text-sm font-semibold"
            >
                Do you want us to create a logo for you?
            </label>
        </div>
    )}
    {Errors.logo && <p className="text-xs md:text-sm text-red-500">* {Errors.logo}</p>}
</div>

                {/* Logo end */}

                {/* Extra Requirements Section with Multiple File Upload option */}
                <div className="mt-5">
                    <div className="border border-blue-300 rounded-lg p-4 mt-5">
                        <p className="text-xm font-semibold text-black">
                            Describe your issues
                        </p>
                        <div className="container mx-auto">
                            <div className="mt-5 flex items-center">
                                <textarea
                                    className="w-8/12 p-3 border border-blue-300 rounded-lg resize-none mr-2"
                                    placeholder="Message..."
                                    rows="4"
                                    value={selectedOptions.issue}
                                    onChange={(e) => setSelectedOptions({ ...selectedOptions, issue: e.target.value })}
                                ></textarea>
                                <div
                                    onClick={() => documentRef.current.click()}
                                    className="flex flex-col items-center ml-2"
                                >
                                    <MdOutlineFileUpload className="mb-1 text-lg cursor-pointer" />
                                    <p className="text-sm text-center cursor-pointer">
                                        {uploadedFile.document ? uploadedFile.document.name : "Upload additional documents"}
                                    </p>
                                    <input
                                        ref={documentRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx,.txt"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e, 'document')}
                                    />
                                </div>
                            </div>
                            {uploadedFile.document && (
                                <div className="mt-2">
                                    {getFilePreview(uploadedFile.document)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Confirmation Dialog */}
                {showConfirmDialog && (
                    <div className=" modal-overlay">
                        <div className=" modal-content">
                            <h3 className="text-lg font-semibold mb-4">Preview</h3>
                            {fileToUpload && getFilePreview(fileToUpload)}
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                                    onClick={confirmUpload}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                                    onClick={cancelUpload}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loader */}
                {isUploading && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
                        <div className="text-white">Uploading...</div>
                    </div>
                )}

                {/* Additional Sections */}
                {/* <div className="flex justify-end mt-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleDownloadQuotation}
                    >
                        Download Quotation
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default WebDevelopment;
