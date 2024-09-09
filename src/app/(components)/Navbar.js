"use client";
import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import wish from "../../../public/assets/image/wish.png";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { UserContext } from "@/lib/context/userContext";
import { useRouter } from "next/navigation";

const Navbar = ({ activePath }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Profile Icon Menu
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const toggleDropdown = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  // Profile Icon Menu

  const { state, logoutReducer } = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const serviceIndex = links.findIndex((link) => link.url === activePath);
    setActiveDropdown(serviceIndex);
  }, [activePath]);

  const handleSmoothScroll = (event, url) => {
    if (url.startsWith("#")) {
      event.preventDefault();
      const targetElement = document.querySelector(url);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };
  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        const message = data.error || "Please try again.";
        throw new Error(message);
      }
      logoutReducer();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    {
      name: "Service",
      url: "/service/seo-optimisation",
      icon: <FaChevronDown className="ml-1" />,
      subLinks: [
        { name: "Seo Optimization", url: "/service/seo-optimisation" },
        { name: "App Development", url: "/service/app-development" },
        { name: "Software Development", url: "/service/software-development" },
        {
          name: "Block Chain Development",
          url: "/service/block-chain-development",
        },
        { name: "Data Analysis", url: "/service/data-analysis" },
        { name: "Cyber Security", url: "/service/cyber-security" },
        { name: "UI & UX Designing", url: "/service/ui-ux-design" },
      ],
    },
    { name: "Website Calculator", url: "/website-calculator" },
    { name: "Contact", url: "#get-in-touch" },
  ];
  const renderLinks = (isMobile = false) =>
    links.map((link, index) => (
      <li
        key={index}
        className="relative py-3 list-none"
        // Toggle dropdown on click
        onClick={() =>
          setActiveDropdown(activeDropdown === index ? null : index)
        }
      >
        {link.subLinks ? (
          <div className="relative">
            <div className="flex items-center justify-between px-3">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 transition duration-300 hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {link.name}
              </a>
              {link.icon && <FaChevronDown className="ml-2 cursor-pointer" />}
            </div>

            {activeDropdown === index && (
              <ul className="absolute left-0 mt-2 w-52 bg-white shadow-lg rounded-lg z-10 transition-all duration-300 ease-in-out">
                {link.subLinks.map((subLink, subIndex) => (
                  <li key={subIndex} className="py-2 px-4 hover:bg-gray-200">
                    <Link href={subLink.url} className="text-sm text-gray-700">
                      {subLink.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <Link
            href={link.url}
            className="flex items-center justify-between px-3 text-sm font-semibold text-gray-700 transition duration-300 hover:text-black"
          >
            {link.name}
            {link.icon && link.icon}
          </Link>
        )}
      </li>
    ));

  return (
    <nav className="bg-white shadow-lg sticky top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-20">
        <div className="flex justify-between items-center py-1">
          <div className="flex items-center">
            <Link href="/" className="">
              <Image src={wish} alt="Company Logo" className="w-48" />
            </Link>
            {/* Add to Cart Icon for Mobile Screens */}
            <div className="md:hidden ml-4">
              <Link href="/cart">
                <FaShoppingCart
                  size={24}
                  className="text-gray-700 transition duration-300 hover:text-black"
                />
              </Link>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            {renderLinks()}
            {state.isAuthenticated ? (
              <div
                className="relative inline-block text-left"
                onMouseEnter={() => setIsProfileMenuOpen(true)} // Open on hover
                onMouseLeave={() => {
                  if (!isClicked) {
                    setIsProfileMenuOpen(false); // Close on hover out if not clicked
                  }
                }}
              >
                <button
                  className="border-solid border-2 rounded-full text-white bg-gradient-to-r from-[#0094d3a2] to-[#0094D3] hover:from-[#0079AD] hover:to-[#005B89] w-[50px] h-[50px] hover:shadow-lg transition-all duration-200 ease-in-out"
                  onClick={() => {
                    setIsProfileMenuOpen(!isProfileMenuOpen); // Toggle menu on click
                    setIsClicked(!isClicked); // Toggle clicked state
                  }}
                >
                  {state.user?.firstName?.charAt(0)?.toUpperCase() || "W"}
                  {state.user?.lastName?.charAt(0)?.toUpperCase() || "G"}
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 p-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <Link
                      href="/user/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/user/purchases"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Purchase History
                    </Link>
                    <Link
                      href="/logout"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-3 ml-6 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#0094d3a2] to-[#0094D3] hover:bg-gradient-to-l"
              >
                Sign Up
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center py-4">
            {renderLinks(true)}
            <li className="py-2 list-none">
              {state.isAuthenticated ? (
                <Link href="/user/profile" className="border-solid border-2">
                  {/* <FaUser /> */}
                  Profile
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="px-6 py-2 ml-6 rounded border-2 border-gray-600 text-sm font-semibold text-black transition duration-200 hover:text-white hover:bg-gradient-to-r from-purple-600 to-purple-800"
                  style={{
                    backgroundColor: "#0079AD",
                    
                  }}
                >
                  Sign up
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Sidebar Backdrop */}
      <div
        className={`fixed inset-0 bg-black opacity-50 transition-opacity duration-300 ${isOpen ? "block" : "hidden"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center py-4">
          {renderLinks(true)}
          <li className="py-2 list-none">
            {state.isAuthenticated ? (
              <Link href="/user/profile" className="border-solid border-2">
                {/* <FaUser /> */}
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 ml-6 rounded-lg text-sm font-semibold text-white"
                style={{
                  backgroundColor: "#0079AD",
                }}
              >
                Sign up
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
