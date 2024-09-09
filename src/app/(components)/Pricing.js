"use client";
import { useEffect } from "react";
import Aos from "aos";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import pylet from "../../../public/assets/image/pixelcut.png";

const Pricing = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      offset: 20,
      delay: 50,
      easing: "ease-in-out",
      mirror: false,
      once: false,
      anchorPlacement: "top",
    });
  }, []);

  return (
    <>
      <div className="container mx-auto mt-5 px-4 md:px-8 lg:px-20 md:py-8">
        <div className="flex flex-col md:flex-row gap-8 py-5">
          {/* Text Content */}
          <div className="flex flex-col items-start py-5 w-full md:w-1/2">
            <h5 className="relative text-black font-bold text-2xl md:text-3xl lg:text-4xl mt-3 leading-tight tracking-tight">
              <span className="absolute top-0 left-0 w-[45px] md:w-[65px] h-1 fetaues shadow-md shadow-blue-500/90"></span>
              <span className="block mt-4">PAY LATER SERVICE</span>
            </h5>
            <p
              className="text-black font-bold text-xl md:text-2xl lg:text-3xl mt-3 w-full leading-snug"
              style={{
                color: "#338DFB",
              }}
            >
              Shop now, pay later with the flexibility of up to 7 days.
            </p>

            <div className="mt-5 text-black font-bold text-lg flex items-center">
              Explore Pay Later With Our
              <div className="flex items-center ml-2">
                <span className="relative inline-block">
                  <span
                    className="text-blue-500 text-[11px] md:text-xl"
                    style={{
                      color: "#338DFB",
                    }}
                  >
                    Cost Calculator
                  </span>

                  <div className="absolute left-0 bottom-0 w-full border-b-2 border-blue-500" />
                </span>
                <FaArrowRight
                  className="ml-2 text-xl"
                  style={{ color: "#338DFB" }}
                />
              </div>
            </div>
          </div>

          {/* Image and Text Blocks */}
          <div className="flex flex-col items-start w-full md:w-1/2">
            <Image
              src={pylet}
              alt="Description of image"
              className="w-full h-auto object-cover"
              data-aos="flip-right"
            />
            <div className="flex flex-col sm:flex-row mt-4 w-full max-w-4xl">
              <div className="flex flex-col items-start text-start p-2 border-r-2 border-dotted border-gray-300 sm:w-1/4">
                <p className="font-bold  text-[13px]" style={{ color: "#2C5D81" }}>
                  SELECT SERVICE
                </p>
                <span
                  className="block mt-2 font-bold text-black"
                  style={{ fontSize: "11px" }}
                >
                  Customers browse and select the services you want to buy.
                </span>
              </div>
              <div className="flex flex-col items-start text-start p-2 border-r-2 border-dotted border-gray-300 sm:w-1/4">
                <p className="font-bold text-[13px]" style={{ color: "#2C5D81" }}>
                  CALCULATE COST
                </p>
                <span
                  className="block mt-2 font-bold text-black"
                  style={{ fontSize: "11px" }}
                >
                  Determine the total purchase value of what you selected
                </span>
              </div>
              <div className="flex flex-col items-start text-start p-2 border-r-2 border-dotted border-gray-300 sm:w-1/4">
                <p className="font-bold text-[13px]" style={{ color: "#2C5D81" }}>
                  SIGN CONTRACT
                </p>
                <span
                  className="block mt-2 font-bold text-black"
                  style={{ fontSize: "11px" }}
                >
                  Sign here to accept the terms and finalize your agreement.
                </span>
              </div>
              <div className="flex flex-col items-start text-start p-2 sm:w-1/4">
                <p className="font-bold text-[13px]" style={{ color: "#2C5D81" }}>
                  PAY LATER
                </p>
                <span
                  className="block mt-2 font-bold text-black"
                  style={{ fontSize: "11px" }}
                >
                  Pay for your purchase with the flexibility of upto 7 days.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
