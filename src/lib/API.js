import { useContext } from 'react';
import { fetch } from 'next/dist/client/fetch';
import { UserContext } from './context/userContext';


const API = async (url, options) => {
    const { state: { token } } = useContext(UserContext);
    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    } else {
        options.headers = {
            ...options.headers,
            Authorization: null,
        };
    }
    return fetch(url, options);
};

export default API