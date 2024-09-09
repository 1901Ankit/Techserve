'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import {
  uiux,
  serviceImg,
  seo,
  cyberSecurity,
  softwareDevelopment,
  blockChain,
  dataAnalysis,
} from '../(fileImports)/constant';
import Aos from 'aos';

const Services = () => {
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
    <div className="container mx-auto md:py-8   mt-5 px-3 md:px-20">
      <div className="flex flex-col items-start py-5">
        <h5 className="relative text-black font-bold text-3xl md:text-4xl mt-3 leading-tight tracking-tight">
        <span className="absolute top-0 left-0 w-[45px] md:w-[65px] h-1 fetaues shadow-md shadow-blue-500/90"></span>
          <span className="block mt-4">SERVICES WE OFFER</span>
        </h5>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-y-6 md:gap-y-0 md:gap-x-4 lg:gap-x-10 items-center md:items-start ">
        <div className="w-full md:w-3/5 ">
          <p className="text-black font-medium text-sm md:text-xl mt-3 w-full">
            Discover the wide range of digital marketing services we offer to
            help you grow your business. Our expertise spans across various
            areas to ensure comprehensive and impactful solutions.
          </p>
          <Image src={serviceImg} alt="service section image" />
        </div>
        <div className="w-[80%] md:w-2/5 md:mr-4 lg:mr-auto">
          <Image
            src={uiux}
            alt="UI/UX designer"
            className="max-h-20 w-auto"
            data-aos="flip-right"
          />
          {/* </div> */}
          <Image
            src={cyberSecurity}
            alt="Cyber Security"
            className="ml-14 max-h-20 w-auto"
            data-aos="flip-left"
          />
          <Image
            src={softwareDevelopment}
            alt="Software Development"
            className="max-h-20 w-auto"
            data-aos="flip-right"
          />
          <Image
            src={seo}
            alt="SEO Optimization"
            className="ml-14 max-h-20 w-auto"
            data-aos="flip-left"
          />
          <Image
            src={blockChain}
            alt="Blockchain Development"
            className="max-h-20 w-auto"
            data-aos="flip-right"
          />
          <Image
            src={dataAnalysis}
            alt="Data Analysis"
            className="ml-14 max-h-20 w-auto"
            data-aos="flip-left"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
