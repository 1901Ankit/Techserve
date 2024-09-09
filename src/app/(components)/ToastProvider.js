import { ToastContext } from '@/lib/context/ToastContext';
import React, { useState, useCallback } from 'react';


const Toast = ({ message, type, onClose }) => {
	return (
		<div
			className={`fixed bottom-5 right-5 p-4 rounded-md shadow-lg text-white text-sm z-50 
        ${type === 'success' ? 'bg-green-500' : ''} 
        ${type === 'error' ? 'bg-red-500' : ''} 
        ${type === 'info' ? 'bg-blue-500' : ''} 
        ${type === 'warning' ? 'bg-yellow-500' : ''}`}
		>
			{message}
			<button
				className="ml-4 text-white hover:text-gray-200"
				onClick={onClose}
			>
				&times;
			</button>
		</div>
	);
};

const ToastProvider = ({ children }) => {
	const [toast, setToast] = useState({ message: '', type: '' });

	const showToast = useCallback((message, type) => {
		setToast({ message, type });
		setTimeout(() => {
			setToast({ message: '', type: '' });
		}, 5000); // Automatically close toast after 5 seconds
	}, []);

	const handleCloseToast = () => {
		setToast({ message: '', type: '' });
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast.message && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={handleCloseToast}
				/>
			)}
		</ToastContext.Provider>
	);
};

export default ToastProvider;
