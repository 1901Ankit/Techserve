"use client";
import { useEffect } from "react";
import Aos from "aos";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

// register Swiper custom elements

const Seoplan = () => {
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
    register();

  }, []);

  return (
    <div className="container mx-auto mt-5  md:px-20 md:py-8">
      <div className="container pricing mt-7">
        <div className="">
          <swiper-container slides-per-view="1" space-between="30" autoplay-delay="3000" autoplay-disable-on-interaction="false">
            <swiper-slide>
              <div className="flex-1 min-w-[360px] p-2">
                <div
                  className="box relative flex flex-col h-full justify-start bg-white p-10 shadow-custom rounded-md border-t-8 border-b-8 border-blue-600 shadow-md shadow-blue-500/90"
                  data-aos="flip-left"
                >
                  <div className="text-center">
                    <span className="text-blue-600 font-bold text-[28px]">
                      Basic
                    </span>
                    <div className="h-[2px] bg-blue-600 mt-2 mx-auto w-16"></div>
                    <h3 className="text-center mt-3 font-bold text-[24px]">
                      ₹499 / onwards
                    </h3>
                  </div>

                  <div className="flex-1">
                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-start  text-black font-bold text-[14px] ">
                        Keyword Research and Strategy
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Basic keyword research
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          5 target keywords
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Strategic market and competitor analysis.
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        On-Page SEO
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Optimize titles and metas for 5 pages.
                        </span>
                      </li>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Header tag optimization
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />{" "}
                        <span className="text-black font-normal text-[14px]">
                          Enhance images: alt, compress.
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Detailed internal linking strategy
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Technical SEO
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />{" "}
                        <span className="text-black font-normal text-[14px]">
                          Website audit (basic)
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Fixing minor technical issues
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Sitemap creation and submission
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Advanced schema markup and structured data
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Content Optimization
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Basic content review and recommendations
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Optimization for 5 pages
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Content strategy development
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Local SEO
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Google My Business setup and optimization
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Basic local citation management
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Advanced reputation and review management
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Link Building
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "30px", minHeight: "20px" }}

                        />
                        <span className="text-black font-normal text-[14px]">
                          High-quality link building (10+ high- authority backlinks
                          per month)
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Guest posting and outreach
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Monthly Reporting
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Performance report with basic analytics
                        </span>
                      </li>
                    </ul>
                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Support
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "23px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Email support with a 1-hour monthly consultation
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-center mt-5">
                    <button
                      type="submit"
                      className="border border-blue-300 rounded-lg text-black p-2 w-2/4 "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </swiper-slide>

            <swiper-slide>
              <div className="flex-1 min-w-[360px] p-2">
                <div
                  className="box relative flex flex-col h-full justify-start bg-white p-10 shadow-custom rounded-md border-t-8 border-b-8 border-blue-600 shadow-md shadow-blue-500/90"
                  data-aos="flip-left"
                >
                  <div className="text-center">
                    <span className="text-blue-600 font-bold text-[28px]">
                      Standard
                    </span>
                    <div className="h-[2px] bg-blue-600 mt-2 mx-auto w-16"></div>
                    <h3 className="text-center mt-3 font-bold text-[24px]">
                      ₹999 / onwards
                    </h3>
                  </div>

                  <div className="flex-1">
                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-start  text-black font-bold text-[14px] ">
                        Keyword Research and Strategy
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Comprehensive keyword research
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          15 target keywords
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Competitor analysis
                        </span>
                      </li>
                    </ul>
                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        On-Page SEO
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "30px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          pages Title tag and meta description optimization for up
                          to 15
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Header tag optimization
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "30px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Advanced image optimization (alt text and compression)
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Internal linking strategy
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Technical SEO
                      </span>

                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Website audit (basic)
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Detailed website audit
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          {" "}
                          Sitemap creation and submission
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Fixing technical issues
                        </span>
                      </li>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Schema markup implementation
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Content Optimization
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "25px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          {" "}
                          Content review and optimization for up to 15 pages
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Optimization for 5 pages
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "25px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Blog post recommendations (up to 2 posts per month)
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Local SEO
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Enhanced Google My Business optimization
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Local citation building (10 citations per month)
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Reputation management
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Link Building
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "25px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Basic link building (5 high-quality backlinks per month)
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <RxCross2
                          className="text-red-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Guest posting and outreach
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Monthly Reporting
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "40px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Detailed performance report with analytics, keyword
                          rankings, and competitor insights
                        </span>
                      </li>
                    </ul>
                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Support
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "25px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Priority email support with 2-hour monthly consultation
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-center mt-5">
                    <button
                      type="submit"
                      className="border border-blue-300 rounded-lg text-black p-2 w-2/4 "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </swiper-slide>

            <swiper-slide>
              <div className="flex-1 min-w-[360px] p-2">
                <div
                  className="box relative flex flex-col h-full justify-start bg-white p-10 shadow-custom rounded-md border-t-8 border-b-8 border-blue-600 shadow-md shadow-blue-500/90"
                  data-aos="flip-left"
                >
                  <div className="text-center">
                    <span className="text-blue-600 font-bold text-[28px]">
                      Premium
                    </span>
                    <div className="h-[2px] bg-blue-600 mt-2 mx-auto w-16"></div>
                    <h3 className="text-center mt-3 font-bold text-[24px]">
                      ₹1499 / onwards
                    </h3>
                  </div>

                  <div className="flex-1">
                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-start  text-black font-bold text-[14px] ">
                        Keyword Research and Strategy
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Extensive keyword research
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          30 target keywords
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Strategic market and competitor analysis.
                        </span>
                      </li>
                    </ul>
                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        On-Page SEO
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "30px", minHeight: "20px" }}
                        />{" "}
                        <span className="text-black font-normal text-[14px]">
                          pages Title tag and meta description optimization for
                          unlimited
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Comprehensive header tag optimization
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />{" "}
                        <span className="text-black font-normal text-[14px]">
                          Advanced image optimization and file management
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />{" "}
                        <span className="text-black font-normal text-[14px]">
                          {" "}
                          Detailed internal linking strategy
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Technical SEO
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />{" "}
                        <span className="text-black font-normal text-[14px]">
                          Full website audit
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "30px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          optimization, site architecture Advanced technical issue
                          resolution (e.g., mobile)
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "22px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Advanced schema markup and structured data
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Content Optimization
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Content review and optimization for
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          unlimited pages
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Monthly blog posts (4 posts) and content creation
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Content strategy development
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Local SEO
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          {" "}
                          Complete Google My Business management
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "25px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Extensive local citation building (30 citations per month)
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Advanced reputation and review management
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Link Building
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "28px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          High-quality link building (10+ high- authority backlinks
                          per month)
                        </span>
                      </li>
                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Guest posting and outreach
                        </span>
                      </li>
                    </ul>

                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Monthly Reporting
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "45px", minHeight: "10px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          Comprehensive performance report with in-depth analytics,
                          keyword rankings, competitor analysis, and ROI tracking
                        </span>
                      </li>
                    </ul>
                    <ul className=" text-sm md:text-base mt-5 text-start">
                      <span className="text-center h-[2px] text-black font-bold text-[14px] ">
                        Support
                      </span>

                      <li className="mt-2 flex items-start">
                        <TiTick
                          className="text-green-500 mr-2"
                          style={{ fontSize: "25px", minHeight: "20px" }}
                        />
                        <span className="text-black font-normal text-[14px]">
                          24/7 support with unlimited consultations and priority
                          access
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-center mt-5">
                    <button
                      type="submit"
                      className="border border-blue-300 rounded-lg text-black p-2 w-2/4 "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </div>
  );
};

export default Seoplan;
