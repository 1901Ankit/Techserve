"use client";
import Image from "next/image";
import logd from "../../../public/assets/image/features.gif";
import { TiTick } from "react-icons/ti";
import data from "../../../public/assets/data";
import Aos from "aos";
import { useEffect } from "react";
import image1 from "../../../public/assets/image/featur/computer.png";
import image2 from "../../../public/assets/image/featur/human.png";
import image3 from "../../../public/assets/image/featur/tool.png";
import image4 from "../../../public/assets/image/featur/setting.png";
import image5 from "../../../public/assets/image/featur/atm.png";
import image6 from "../../../public/assets/image/featur/calculator.png";

const images = [
  { src: image1, text: "Custom Website Development" },
  { src: image2, text: "Innovative Design Solutions" },
  { src: image3, text: "Robust Security Measures" },
  { src: image4, text: "Comprehensive SEO Services" },
  { src: image5, text: "Pay Later Services" },
  { src: image6, text: "Cost calculation" },
];

const Feature = () => {
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
    <div className="container mx-auto mt-5 px-4 md:px-8 lg:px-20 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5">
        <div className="md:col-span-9 flex flex-col">
          <h5 className="relative text-black font-bold text-2xl md:text-3xl lg:text-4xl mt-3 leading-tight tracking-tight">
            <span className="absolute top-0 left-0 w-[45px] md:w-[65px] h-1 fetaues shadow-md shadow-blue-500/90"></span>
            <span className="block mt-4">FEATURES</span>
          </h5>

          <p className="text-black font-medium text-base md:text-lg lg:text-xl mt-3 w-full">
            Discover the key features that set Wish Geeks apart. Our
            comprehensive digital marketing solutions are designed to meet your
            business needs and drive success.
          </p>
        </div>
        <div className="md:col-span-3 flex items-center justify-center">
          <Image
            src={logd}
            alt="Feature Image"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((imageObj, index) => (
            <div
              key={index}
              className="border border-blue-300 rounded-lg p-4 flex flex-col justify-between text-center transition-transform duration-300 ease-in-out transform hover:shadow-lg hover:shadow-blue-500/90 hover:border-transparent"
              data-aos="zoom-in"
            >
              <p className="font-bold text-sm md:text-sm mb-2">
                {imageObj.text}
              </p>
              <div className="w-full flex items-end justify-center">
                <Image
                  src={imageObj.src}
                  alt={`Feature Image ${index + 1}`}
                  className="object-cover"
                  width={100}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
