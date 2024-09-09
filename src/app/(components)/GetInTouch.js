"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import mailIcon from "../../../public/assets/image/email_icon.png";
import whatsappIcon from "../../../public/assets/image/whatsapp_icon.png";
import phoneIcon from "../../../public/assets/image/phone_icon.png";
import contactImg from "../../../public/assets/image/contact.png";
import mapImg from "../../../public/assets/image/map.png";
import ResponsiveSwiper from "./ResponsiveSwiper";
import ContactDialog from "./dialogBoxes/ContactDialog";
import Link from 'next/link';

const GetInTouch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const sectionRef = useRef(null); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timer = setTimeout(() => {
            setIsOpen(true);
          }, 1000);

          return () => clearTimeout(timer); 
        }
      },
      { threshold: 0.5 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear the form
      closeDialog();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="bg-[#07A9EE] mb-48 relative"
      id="get-in-touch"
      ref={sectionRef}
    >
      <div className="desktop-contactDialogBox">
        <ContactDialog
          isOpen={isOpen}
          onClose={closeDialog}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      <div className="get-in-touch-container px-6 pt-6 pb-32 container m-auto">
        <h3 className="text-white text-center text-3xl md:text-5xl sm:text-3xl font-semibold p-5">
          Get in touch
        </h3>
        <p className="text-white text-center mt-5 text-lg md:text-xl sm:text-lg font-medium">
          Thank You for showing interest in our services. Here’s how you can
          reach us...
        </p>

        <div className="container get-in-touch-box-mobile-container mt-9 flex items-center justify-around absolute left-0 py-0 px-5">
          {/* Responsive Swiper for Mobile */}
          <ResponsiveSwiper
            isOpen={isOpen}
            onClose={closeDialog}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>

        <div className="container get-in-touch-box-container mt-9 items-center justify-around absolute hidden lg:flex">
          <div className="get-in-touch-box bg-white rounded-2xl py-8 px-6  w-[318px] h-[236px] shadow-xl border-b-[15px] border-[#07A9EE]">
            <h5 className="text-[#07A9EE] font-extrabold text-2xl mb-6">
              WE'RE HERE
            </h5>
            <div className="flex mt-3 items-center">
              <div>
                <Image src={mailIcon} alt="Mail Icon" />
              </div>
              <p className="text-base ml-2 font-medium">
                info@wishgeekstechserve.com
              </p>
            </div>
            <div className="flex mt-3 items-center">
              <div>
                <Image src={whatsappIcon} alt="WhatsApp Icon" />
              </div>
              <p className="text-base ml-2 font-medium">+91 8700133076</p>
            </div>
            <div className="flex mt-3 items-center">
              <div>
                <Image src={phoneIcon} alt="Phone Icon" />
              </div>
              <p className="text-base ml-2 font-medium">01204122558</p>
            </div>
          </div>
          <div className="get-in-touch-box bg-white rounded-2xl py-8 px-6 w-[318px] h-[236px] shadow-xl border-b-[15px] border-[#07A9EE] text-center">
            <div className="relative bottom-7">
              <Image
                src={contactImg}
                alt="Contact us illustration"
                className="m-auto"
              />
              <p className="font-bold">CONTACT SUPPORT</p>
              <button
                className="text-[#07A9EE] hover:text-white hover:bg-[#07A9EE] font-bold border border-[#07A9EE] rounded-full text-sm py-1 px-6 mt-2"
                onClick={() => setIsOpen(true)}
              >
                GET SUPPORT
              </button>
            </div>
          </div>
          <div className="get-in-touch-box bg-white rounded-2xl py-8 px-6 w-[318px] h-[236px] shadow-xl border-b-[15px] border-[#07A9EE] text-center">
            <Image src={mapImg} alt="Map illustration" className="m-auto" />
            <p className="font-bold">OUR ADDRESS</p>
            <p className="font-semibold">Sector-62, Noida, Uttar Pradesh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
