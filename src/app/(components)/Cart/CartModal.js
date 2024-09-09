// components/CartModal.js
import React from 'react';
import Cart from './Cart/Cart';
const CartModal = ({ onClose, selectedServices, selectedItemAndCost, calculateTotalCost, country, quotationDownloadHandler }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-700 hover:text-black"
          aria-label="Close Modal"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Your Cart</h2>
        <Cart
          selectedServices={selectedServices}
          selectedItemAndCost={selectedItemAndCost}
          calculateTotalCost={calculateTotalCost}
          country={country}
          quotationDownloadHandler={quotationDownloadHandler}
        />
      </div>
    </div>
  );
};

export default CartModal;
