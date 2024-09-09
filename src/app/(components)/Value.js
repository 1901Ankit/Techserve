'use client';
import Image from 'next/image';
import bulb from '../../../public/assets/image/about/bulb.png';
import medal from '../../../public/assets/image/about/medal.png';
import star from '../../../public/assets/image/about/star.png';
import { useEffect } from 'react';
import Aos from 'aos';
const Value = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      offset: 20,
      delay: 50,
      easing: 'ease-in-out',
      mirror: false,
      once: false,
      anchorPlacement: 'top',
    });
  }, []);
  return (
    <div className="container mx-auto mt-5 px-4 md:px-20">
      <div className="flex flex-col items-center py-5">
        <h5 className="relative text-black  font-bold text-3xl md:text-4xl mt-3 leading-tight tracking-tight">
          OUR VALUES
        </h5>
      </div>
      <div className="container mx-auto pricing mt-7">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/3 p-4">
            <div
              className="box featured relative flex flex-col h-full justify-between bg-white p-4  rounded-md"
              data-aos="flip-left"
            >
              <div className="flex flex-col items-center mb-3">
                <Image src={star} className="w-10/12 h-auto mb-2" alt="logo" />
                <span className="text-black font-normal text-[18px] mt-1 leading-tight tracking-tight">
                  Customer-Centric Focus
                </span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/3 p-4">
            <div
              className="box featured relative flex flex-col h-full justify-between bg-white p-4  rounded-md"
              data-aos="flip-right"
            >
              <div className="flex flex-col items-center mb-3">
                <Image
                  src={medal}
                  className="w-10/12 h-auto mb-2"
                  alt="website"
                />
                <span className="text-black font-normal text-[18px] mt-1 leading-tight tracking-tight">
                  Quality Excellence
                </span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/3 p-4">
            <div
              className="box featured relative flex flex-col h-full justify-between bg-white p-4  rounded-md"
              data-aos="flip-left"
            >
              <div className="flex flex-col items-center mb-3">
                <Image
                  src={bulb}
                  className="w-10/12 h-auto mb-2"
                  alt="website"
                />
                <span className="text-black font-normal text-[18px] mt-1 leading-tight tracking-tight">
                  Innovation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Value;
