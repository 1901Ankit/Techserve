"use client";
import { useState } from 'react';
import Image from 'next/image';
import editIcon from '../../../public/assets/image/profile/edit-icon.png';
import purchaseHistoryIcon from '../../../public/assets/image/profile/purchase-history-icon.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Button for Mobile Menu Icon */}
            <button
                className='absolute top-[6rem] left-4 z-100 md:hidden'
                onClick={toggleSidebar}
            >
                <FaBars size={24} />
            </button>

            <div className='profile-section flex h-full'>
                {/* Sidebar */}
                <div
                    className={`profile-sidebar absolute top-0 left-0 h-full bg-white px-[3%] py-[3%] transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:relative md:w-[20%] shadow-lg md:shadow-none`}
                >
                    {/* Close Button */}
                    <button
                        className='absolute top-[6rem] right-4 md:hidden'
                        onClick={toggleSidebar}
                    >
                        <FaTimes size={24} />
                    </button>

                    <h5 className='font-bold text-lg pt-[100px] md:pt-8'>Profile</h5>
                    <div className='flex items-center justify-start mt-7'>
                        <Image src={editIcon} alt="Edit Icon" className="mr-2" />
                        <Link href={'/user/profile'} className={`${pathname === '/user/profile' ? 'text-blue-500 font-bold' : ''}`} onClick={toggleSidebar}>Edit Profile</Link>
                    </div>
                    <div className='flex items-center justify-start mt-3'>
                        <Image src={purchaseHistoryIcon} alt="Purchase History Icon" className="mr-2" />
                        <Link href={'/user/purchases'} className={`${pathname === '/user/purchases' ? 'text-blue-500 font-bold' : ''}`} onClick={toggleSidebar} >Purchase History</Link>
                    </div>
                </div>

                {/* Content Area */}
                <div className={`profile-information-container w-full md:w-[80%] px-[3%] py-[3%] mt-10 md:mt-0 border-l-2`}>
                    {children}
                </div>
            </div>
        </>
    );
}
