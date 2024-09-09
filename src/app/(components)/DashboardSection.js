// components/DashboardSection.js

import Link from "next/link";
import { useState } from "react";

const DashboardSection = ({ toggleService }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-2 border-r-2 border-white" style={{ borderRight: "2px solid #e2e8f0", position: "relative" }}>
      <div className="text-xl font-semibold mb-6 text-left mt-5 hidden md:block">Dashboard</div>
      <div className="grid gap-2 md:grid-cols-1">
        <div className="flex flex-wrap gap-2 md:flex-col">
          <div className="dashboard-item mb-2 flex-2 text-sm font-semibold">
            <Link href="/website-calculator" className="dashboard-link text-black hover:text-blue-600">Select Services</Link>
          </div>
          <div className="dashboard-item mb-2 flex-2 text-sm font-semibold">
            <Link href="/view-plans" className="dashboard-link text-black hover:text-blue-500">View Plans</Link>
          </div>

          {/* Mobile Dropdown Button */}
          <div className="md:hidden mb-2 flex-2 relative text-sm font-semibold">
            <button
              className=" dashboard-link text-black hover:text-blue-600 w-full text-left flex items-center"
              onClick={toggleDropdown}
            >
              Raise a Ticket
              <svg className="ml-auto w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute mt-2 space-y-2 bg-white border border-gray-200 rounded-md shadow-lg" style={{ zIndex: 50 }}>
                <Link href="/RecentTicket" className="block px-4 py-2 text-black hover:text-blue-600 "  >Recent Ticket</Link>
                <Link href="/Raise" className="block px-4 py-2 text-black hover:text-blue-600">Raise a Ticket</Link>
                <Link href="/past-ticket" className="block px-4 py-2 text-black hover:text-blue-600">Past Ticket</Link>
              </div>
            )}
          </div>

          {/* Direct Links (Visible on larger screens) */}
          <div className="dashboard-item mb-2 flex-2 hidden md:block text-sm font-semibold">
            <Link href="/Raise" className="dashboard-link text-black hover:text-blue-600">Raise a Ticket</Link>
          </div>
          <div className="dashboard-item mb-2 flex-2 hidden md:block text-sm font-semibold">
            <Link href="/RecentTicket" className="dashboard-link text-black hover:text-blue-600">Recent Ticket</Link>
          </div>
          <div className="dashboard-item mb-2 flex-2 hidden md:block text-sm font-semibold">
            <Link href="/past-ticket" className="dashboard-link text-black hover:text-blue-600">Past Ticket</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
