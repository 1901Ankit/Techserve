"use client";
import Image from "next/image";
import {
  aboutImg1,
  aboutImg2,
  aboutImg3,
  aboutImg4,
  aboutImg5,
} from "../(fileImports)/constant";
import Value from "../(components)/Value";
import Portfolio from "../(components)/Portfolio";
import Security from "../(components)/Secure";
import data from "../../../public/assets/data";
import bannerabout from "../../../public/assets/image/about/about-banner.png";
import { useEffect } from "react";
import Aos from "aos";
export default function About() {
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
      {/* <div className="video-wrapper relative"> */}
      {/* <video
            className="absolute inset-0 object-cover w-full h-full"
            autoPlay={true}
            muted
            loop
          >
            <source src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/18069166-uhd_3840_2160_24fps.mp4" />
          </video> */}
      {/* </div> */}
      <div className="relative bg-blue-500 h-[200px] md:h-[300px]">
        {/* Blue background with a fixed height */}
        <Image
          src={bannerabout}
          className="absolute inset-0 object-cover w-full h-full"
          alt="Banner Image"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="container">
            <div className="row">
              <div className="min-h-[100px] relative z-10 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center p-6 wishgekabout">
                <h2 className="mb-6 font-bold	 text-xl	 md:text-5xl">ABOUT US</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative mx-auto p-3 ">
        <div className=" flex justify-around bg-white py-4 w-[95%] md:w-10/12 mx-auto border shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-lg relative z-10 mt-[-13.5%] md:mt-[-6.5%]">
          <Image
            src={aboutImg1}
            alt="about img 1"
            className="w-10 md:w-16 lg:w-24 h-auto"
          />
          <Image
            src={aboutImg4}
            alt="about img 4"
            className=" w-10 md:w-16 lg:w-24 h-auto"
          />
          <Image
            src={aboutImg2}
            alt="about img 2"
            className="w-10 md:w-16 lg:w-24 h-auto"
          />
          <Image
            src={aboutImg5}
            alt="about img 5"
            className="w-10 md:w-16 lg:w-24 h-auto"
          />
          <Image
            src={aboutImg3}
            alt="about img 3"
            className=" w-10 md:w-16 lg:w-24 h-auto"
          />
        </div>
        <div className="flex justify-center pt-3" data-aos="fade-up">
          <div className="w-full sm:w-10/12 p-5">
            <p className="text-gray-600 font-medium text-sm md:text-lg text-justify leading-relaxed">
              At Wish Geeks, we merge innovation, technology, and strategic
              planning to offer exceptional digital marketing solutions. Our
              approach blends creative thinking with cutting-edge technology to
              craft effective marketing strategies that drive results. By
              integrating these elements, we deliver high-quality services that
              cater to our clients' unique needs and help them achieve their
              marketing goals.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-5 px-4 md:px-20">
        {data.mission.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center mb-4">
            {item.id % 2 !== 0 ? (
              <>
                <div className="w-full sm:w-1/2 pr-8" data-aos="zoom-out-up">
                  <div>
                    <h5 className="text-black font-extrabold text-3xl md:text-4xl mt-3 leading-snug tracking-tight">
                      {item.title}
                    </h5>
                    <p className="text-medium text-black mt-5 text-sm md:text-lg text-justify">
                      {item.description}
                      <span className="block mt-4 mb-10">
                        {item.additional}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 pl-10 mb-4 sm:mb-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover"
                    data-aos="zoom-in-left"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="w-full sm:w-1/2 pr-8 mb-4 sm:mb-0 order-2 sm:order-1">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover"
                    data-aos="zoom-in-right"
                  />
                </div>
                <div
                  className="w-full sm:w-1/2 pl-0 md:pl-10 order-1 sm:order-2"
                  data-aos="zoom-out-down"
                >
                  <div>
                    <h5 className="text-black font-extrabold text-3xl md:text-4xl mt-3 leading-snug tracking-tight">
                      {item.title}
                    </h5>
                    <p className="text-medium text-black mt-5 text-sm md:text-lg text-justify">
                      {item.description}
                      <span className="block mt-4 mb-10">
                        {item.additional}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <Value />
      <Portfolio />
      <Security />
    </>
  );
}
