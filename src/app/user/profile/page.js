"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/lib/context/userContext';
import editprofile from '../../../../public/assets/image/profile/edit-profile.png';
import { ToastContext } from '@/lib/context/ToastContext';

const Page = () => {
    const { state, logoutReducer, loginReducer } = useContext(UserContext);
    const { showToast } = useContext(ToastContext);

    const [formData, setFormData] = useState({
        firstName: state.user?.firstName || '',
        lastName: state.user?.lastName || '',
        email: state.user?.email || '',
        address: state.user?.address || '',
        phone: state.user?.phone || '',
        city: state.user?.city || '',
        state: state.user?.state || ''
    });

    useEffect(() => {
        if (state.user) {
            setFormData({
                firstName: state.user.firstName || '',
                lastName: state.user.lastName || '',
                email: state.user.email || '',
                address: state.user.address || '',
                phone: state.user.phone || '',
                city: state.user.city || '',
                state: state.user.state || ''
            });
        }
    }, [state.user]);

    const router = useRouter();

    const handleLogOut = async () => {
        try {
            const res = await fetch('/api/user/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                const errorResponse = await res.json();
                const message = errorResponse.error || 'Login failed. Please try again.'
                throw new Error(message);
            }
            logoutReducer();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if address is empty
        if (!formData.address) {
            showToast('Please fill in your address.', 'warning');
            return;
        }

        // Check if city is empty
        if (!formData.city) {
            showToast('Please fill in your city.', 'warning');
            return;
        }

        // Check if state is empty
        if (!formData.state) {
            showToast('Please fill in your state.', 'warning');
            return;
        }

        try {
            const res = await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });


            if (!res.ok) {
                const errorResponse = await res.json();
                const message = errorResponse.message || 'Update failed. Please try again.';
                throw new Error(message);
            }

            const data = await res.json();
            // Update the UserContext with the new user data
            loginReducer({ user: data.user, token: state.token });
            showToast('Profile updated successfully', 'success');

        } catch (error) {
            showToast('Profile ', 'error');
            console.log('Error updating profile:', error.message);
        }
    };

    return (
        <>
            <div className='flex justify-between items-center'>
                <h5 className='font-bold text-lg'>Edit Profile</h5>
                <div className='justify-end'>
                    <div
                        className="border-solid border-2 rounded-full text-white bg-gradient-to-r from-[#0094d3a2] to-[#0094D3] hover:bg-gradient-to-l hover:shadow-2xl p-[13px]"
                    >
                        {formData.firstName.charAt(0).toUpperCase()}{formData.lastName.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex">
                    <div className="w-full mr-6">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            name="firstName"
                            placeholder='Madhav'
                            className="block w-full mt-1 border-[1.5px] border-[#858585] rounded-md py-1 pl-4"
                        />
                    </div>


                    <div className="w-full">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder='Kaushik'
                            className="block w-full mt-1 border-[1.5px] border-[#858585] rounded-md py-1 pl-4"
                        />
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="w-full me-6">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='Madhavkaushik.business@gmail.com'
                            className="block w-full mt-1 border-[1.5px] border-[#858585] rounded-md py-1 pl-4"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder='33062 Zohanbegr isle'
                        className="block w-full mt-1 border-[1.5px] border-[#858585] rounded-md py-1 pl-4"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="address">Contact Number</label>
                    <div className='flex items-center justify-between'>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder='9191919191'
                            className="block w-full mt-1 border-[1.5px] border-[#858585] rounded-md py-1 mr-4 pl-4"
                        />
                        <button className='border-[1.5px] border-[#858585] py-1 px-2 rounded-md hover:bg-green-500 hover:text-white'>Verify</button>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="w-full mr-6">
                        <label htmlFor="state">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder='Mehrab'
                            className="block w-full mt-1 border-[1.5px] border-[#858585] rounded-md py-1 pl-4"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="postalCode">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder='bezorgi'
                            className="block w-full mt-1 border-[1.5px] border-[#858585] rounded-md py-1 pl-4"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label htmlFor="address">Password</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={"***********"}
                        readOnly
                        placeholder='cfhj@#$j'
                        className="block w-full mt-1 border-[1.5px] border-[#858585] rounded-md py-1 pl-4"
                    />
                </div>

                <div className='flex'>
                    <button className="bg-white text-[#338DFB] rounded-md py-[10px] mt-12 font-semibold border-[1.5px] border-[#338DFB] w-56 mr-8 hover:bg-[#f0f7ff] hover:text-[#1e7ad9] active:bg-[#e0efff] active:text-[#125bb8] transition-colors duration-200">Cancel</button>
                    <button className="bg-[#338DFB] text-white rounded-md py-[10px] mt-12 font-semibold w-56 hover:bg-[#1e7ad9] active:bg-[#125bb8] transition-colors duration-200">Save</button>
                </div>

            </form>
        </>
    )
}

export default Page;