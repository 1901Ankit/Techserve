"use client";
import { createContext, useState, useEffect, useRef } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: "",
        isAuthenticated: false,
        country: '',
        OTP: ""
    });

    // Fetch user details
    const fetchUserDetails = async () => {
        console.log("Fetching user details...");
        const response = await fetch('/api/user/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Failed to fetch user details:", errorResponse);
            throw new Error('Failed to fetch user details.');
        }
        const userDetails = await response.json();
        console.log("User details fetched successfully:", userDetails);
        return userDetails;
    };

    // Fetch token
    const fetchToken = async () => {
        console.log("Fetching token...");
        const response = await fetch('/api/get-token');
        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Failed to fetch token:", errorResponse);
            throw new Error('Failed to fetch token.');
        }
        const data = await response.json();
        console.log("Token fetched successfully:", data.token.value);
        return data.token.value;
    };

    // Fetch country details
    const fetchCountry = async () => {
        console.log("Fetching country details...");
        const response = await fetch('http://ip-api.com/json/');
        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Failed to fetch country details:", errorResponse);
            throw new Error('Failed to fetch country details.');
        }
        const data = await response.json();
        console.log("Country details fetched successfully:", data.country);
        return data.country;
    };

    const fetchAllData = async () => {
        console.log("Starting to fetch all data...");
        try {
            const [userDetails, token, country] = await Promise.all([
                fetchUserDetails(),
                fetchToken(),
                fetchCountry()
            ]);

            console.log("All data fetched successfully:", {
                user: userDetails.user,
                token,
                country
            });

            setState({
                user: userDetails.user,
                token: token,
                isAuthenticated: true,
                country: country,
                OTP: state.OTP // Preserve OTP state if needed
            });
            console.log("State updated successfully:", {
                user: userDetails.user,
                token,
                country,
                isAuthenticated: true
            });
        } catch (error) {
            console.error('Error fetching all data:', error);
            // Handle errors if needed, e.g., set error state or notify the user
        }
    };
console.log(state);

    useEffect(() => {
        console.log("UserProvider mounted, fetching all data...");
        fetchAllData();
    }, []); // Empty dependency array ensures this runs once on mount

    const registerReducer = async ({ user, token }) => {
        console.log("Registering user with token:", { user, token });
        setState(prevState => ({
            ...prevState,
            user: user,
            token: token,
            isAuthenticated: true
        }));
        console.log("State after registration:", {
            user,
            token,
            isAuthenticated: true
        });
    };

    const loginReducer = async ({ user, token }) => {
        console.log("Logging in user with token:", { user, token });
        setState(prevState => ({
            ...prevState,
            user: user,
            token: token,
            isAuthenticated: true
        }));
        console.log("State after login:", {
            user,
            token,
            isAuthenticated: true
        });
    };

    const logoutReducer = () => {
        console.log("Logging out...");
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        localStorage.removeItem('token');
        setState({
            user: null,
            token: "",
            isAuthenticated: false,
            country: '',
            OTP: ""
        });
        console.log("State after logout:", {
            user: null,
            token: "",
            isAuthenticated: false,
            country: '',
            OTP: ""
        });
    };

    const updateProfileDetailsReducer = (user) => {
        console.log("Updating profile details:", user);
        setState(prevState => ({
            ...prevState,
            user: user
        }));
        console.log("State after profile update:", user);
    };

    const updateCountryReducer = (country) => {
        console.log("Updating country:", country);
        setState(prevState => ({
            ...prevState,
            country: country
        }));
        console.log("State after country update:", country);
    };

    const setGlobalOTP = (otp) => {
        console.log("Setting global OTP:", otp);
        setState(prevState => ({
            ...prevState,
            OTP: otp
        }));
        console.log("State after setting OTP:", otp);
    };

    return (
        <UserContext.Provider value={{
            state,
            registerReducer,
            updateCountryReducer,
            updateProfileDetailsReducer,
            loginReducer,
            logoutReducer,
            setGlobalOTP
        }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
