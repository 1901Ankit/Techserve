'use client';
import React, { useState } from 'react';
import {
  australiaFlag,
  BangladeshFlag,
  canadaFlag,
  IndiaFlag,
  UKFlag,
  USAFlag,
} from '../(fileImports)/constant';
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const CountriesTFN = () => {
  const countries = [
    { img: USAFlag, number: '+1 888 708-1786', name: 'USA' },
    { img: canadaFlag, number: '+1 888 708-1786', name: 'Canada' },
    { img: UKFlag, number: '+44 1444 39 1231', name: 'United Kingdom' },
    { img: IndiaFlag, number: '+91 01204122558', name: 'India' },
    { img: BangladeshFlag, number: '+880 9988776655', name: 'Bangladesh' },
    { img: australiaFlag, number: '+61 8887081786', name: 'Australia' },
  ];

  const [openCountry, setOpenCountry] = useState(null);

  const toggleCountry = (index) => {
    setOpenCountry(openCountry === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 md:px-20">
      <div className="hidden md:flex justify-between">
        {countries.map((details, index) => (
          <div key={index}>
            <div
              onClick={() => toggleCountry(index)}
              className="flex items-center justify-center gap-1 cursor-pointer"
            >
              <Image
                src={details.img}
                alt={details.name}
                className="h-[25px] w-auto"
              />
              <p className="font-semibold">{details.name}</p>
              <span className="lg:ml-2">
                {openCountry === index ? (
                  <MdOutlineExpandLess />
                ) : (
                  <MdOutlineExpandMore />
                )}
              </span>
            </div>
            <p
              style={{
                visibility: openCountry === index ? 'visible' : 'hidden',
              }}
              className="text-center my-1"
            >
              {details.number}
            </p>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          pagination={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {countries.map((details, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => toggleCountry(index)}
                className="flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <Image
                  src={details.img}
                  alt={details.name}
                  className="max-w-full w-16 md:h-16"
                />
                <div className="flex items-center">
                  <p className=" text-[9px] md:text-4xl font-semibold text-center mt-2">{details.name}</p>
                  <span className="ml-1">
                    {openCountry === index ? (
                      <MdOutlineExpandLess />
                    ) : (
                      <MdOutlineExpandMore />
                    )}
                  </span>
                </div>
              </div>
              <p
                style={{
                  visibility: openCountry === index ? 'visible' : 'hidden',
                }}
                className="text-center my-1 text-[9px] md:text-xs"
              >
                {details.number}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CountriesTFN;
