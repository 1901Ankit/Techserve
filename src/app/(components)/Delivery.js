"use client";
import Image from "next/image";
import logd from "../../../public/assets/image/delivery.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Aos from "aos";
import { useEffect } from "react";

const Delivery = () => {
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
    <div className="container mx-auto md:py-8	 px-4 md:px-20 mt-11">
      {/* Section 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start md:items-center gap-6">
        <div className="w-full mb-8 md:mb-0" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold  leading-tight exprers">
            We’re Delivering Only
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold mt-2 leading-tight exprers">
            Exceptional Quality Work
          </h2>

          <div className="w-full" data-aos="fade-down">
            <p className="text-black font-bold text-sm md:text-xl mt-5 w-full">
              At Wish Geeks, we combine creativity, technology, and strategy to
              deliver top-notch digital marketing services.{" "}
            </p>
            <div className="mt-5">
              <ul className=" grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                <li className="border border-blue-300 rounded-lg mb-2 text-black font-semibold text-[15px] mt-1 leading-[25px] tracking-tight p-3 shadow-md shadow-blue-500/90">
                  Customized website design and development tailored to your
                  brand.
                </li>
                <li className="border border-blue-300 rounded-lg mb-2 text-black font-semibold text-[15px] mt-1 leading-[25px] tracking-tight p-3 shadow-md shadow-blue-500/90">
                  Effective social media marketing to boost your online
                  presence.
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="rounded-lg mt-5 text-white font-semibold	 py-3 text-[14px] flex items-center p-3"
              style={{
                background: "#338DFB",
              }}
            >
              READ MORE
              {/* <MdKeyboardDoubleArrowRight className="ml-2 text-[20px]" /> */}
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center mb-6 md:mb-0">
          <Image
            src={logd}
            alt="Description of image"
            className="w-full md:w-2/3 h-auto object-cover"
            data-aos="fade-up"
          />
        </div>
      </div>

      {/* Section 2 */}
      {/* <div className="flex flex-col md:flex-row items-center gap-6 mt-5">
       
        <div className="w-full md:w-1/2" data-aos="fade-down">
          <ul className="list-disc pl-5 text-sm md:text-base">
            <li className="mb-2 text-black font-medium text-[20px] mt-1 leading-[40px] tracking-tight">
              Customized website design and development tailored to your brand.
            </li>
            <li className="mb-2 text-black font-medium text-[20px] mt-1 leading-[40px] tracking-tight">
              Effective social media marketing to boost your online presence.
            </li>
            <li className="mb-2 text-black font-medium text-[20px] mt-1 leading-[40px] tracking-tight">
              Comprehensive SEO strategies to improve your search engine
              rankings.
            </li>
          </ul>
          <button
            type="button"
            className="mt-5 bg-transparent text-blue-900 font-bold py-3 text-[24px] flex items-center"
          >
            READ MORE
            <MdKeyboardDoubleArrowRight className="ml-2 text-[25px]" />
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <Image
            src={logd}
            alt="Description of image"
            className="w-full md:w-2/3 h-auto object-cover"
            data-aos="fade-up"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Delivery;
