import { useState } from 'react';

export default function ServicesModal({ heading, content, setSelectedServices, setModalContent, isModalOpen }) {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    if (setSelectedServices) {
      setSelectedServices("");
    }
    localStorage.removeItem('service');
    setShowModal(false);
    if (setModalContent) {
      setModalContent(null);
    }
    isModalOpen()

  };

  if (!showModal) return null;

  return (
    <div className='fixed inset-0 flex justify-center items-center z-50 p-4'>
      <div className='bg-white border border-blue-500 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col relative overflow-hidden'>
        <div className="flex flex-col justify-between items-center h-16 border-b border-blue-500 p-4 bg-blue-500 relative">
          <h5 className="text-lg font-semibold text-white text-center w-full">
            {heading}
          </h5>
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white hover:text-gray-200"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="text-center mt-4">
            {content}
          </div>
          <p className="text-center mt-4">
            Email - info@wishgeekstechserve.com
          </p>
          <p className="text-center mt-2 text-blue-500 underline">
            <a href='GetInTouch'>Get in touch</a>
          </p>
        </div>
      </div>
    </div>
  );
}
