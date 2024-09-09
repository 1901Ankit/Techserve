import FAQ from "./(components)/accordion";
import data from "../../public/assets/data";
import Feature from "./(components)/Feature";
import Pricing from "./(components)/Pricing";
import Delivery from "./(components)/Delivery";
import Worker from "./(components)/worker";
import Services from "./(components)/Services.js";
import Testimonials from "./(components)/Testimonials";
import Technologies from "./(components)/Technologies";
import Loader from "./(components)/loader";
import CalculatorPricing from "./(components)/CalculatorPricing";
import Seoplan from "./(components)/Seoplan";
import { UserProvider } from "@/lib/context/userContext";

export default function Home() {
  return (
    <>
      <Loader />
      <div>
        <div className="relative">
          <div className="video-wrapper relative">
            <video
              className="container-fluid p-0 absolute inset-0 object-cover w-full h-full"
              autoPlay={true}
              loop
            >
              <source src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/18069166-uhd_3840_2160_24fps.mp4" />
            </video>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-center p-4">
            <div className="container">
              <div className="row">
                <div className="min-h-[100px] relative z-10 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center p-6 wishgekshead">
                  <h2 className="mb-6 font-bold	 text-xl	 md:text-6xl">
                    Wish Geeks
                    <br />
                    Your ultimate technical solution
                  </h2>
                  <p className=" text-xs	md:text-base text-italic font-semibold text-center  mb-6">
                    Even when your luck is not by your side, we are
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Technologies />
        <Delivery />
        <Services />
        <Worker />
        <Feature />
        <Pricing />
        <Testimonials />
        <CalculatorPricing />

        <div className="container mx-auto px-4 md:px-20 mt-10 md:py-8">
          <h1 className="text-start text-1xl md:text-4xl font-extrabold mb-3 py-5">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <span className="text-start text-1xl md:text-text-base font-medium mb-3">
            General Information About Our Product and Services
          </span>
          <div className="flex flex-col  mt-7">
            <div className="w-full ">
              <FAQ data={data.faq} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
