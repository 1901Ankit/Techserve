import { useEffect, useContext, useRef } from 'react';
import { ToastContext } from '@/lib/context/ToastContext'; // Ensure this path is correct
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRETE; // Ensure this is set in your environment

export const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded._id; // Extract userId from the decoded token
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

const useWebSocket = () => {
    const { showToast } = useContext(ToastContext);
    const wsRef = useRef(null);

    const connectWebSocket = () => {
        wsRef.current = new WebSocket('wss://websocket-connection-9rn3.onrender.com'); // Replace with your WebSocket server URL

        wsRef.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        wsRef.current.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            console.log(event);

            if (message.type === 'notification') {
                showToast(message.content, 'success');

                // Call the function to fetch tickets if the message indicates a ticket creation
                if (message.content.includes('Ticket raised successfully')) {
                    // Get the token from local storage
                    const token = localStorage.getItem('token');
                    const userId = decodeToken(token);

                    if (userId) {
                        // Fetch tickets
                        const response = await fetch('/api/get-all-tickets', {
                            method: 'GET', // Changed to POST to send body
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        if (response.ok) {
                            const data = await response.json();
                            console.log('Tickets:', data);
                        } else {
                            console.error('Failed to fetch tickets');
                        }
                    } else {
                        console.error('Failed to decode token');
                    }
                }
            }
        };

        wsRef.current.onclose = () => {
            console.log('WebSocket connection closed, attempting to reconnect in 5 seconds...');
            setTimeout(() => connectWebSocket(), 5000);
        };

        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    useEffect(() => {
        if (!showToast) {
            console.error('ToastContext is not available. Please ensure ToastProvider is wrapping the component tree.');
            return;
        }

        connectWebSocket();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [showToast]);

    return null;
};

export default useWebSocket;
