// import Seo from '../(components)/Seo';
// import Seo2 from '../(components)/Seo2';

export default function Service() {
  return (
    <>
      <div className="relative">
        <div className="video-wrapper relative">
          <video
            className="absolute inset-0 object-cover w-full h-full"
            autoPlay={true}
            muted
            loop
          >
            <source src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/18069166-uhd_3840_2160_24fps.mp4" />
          </video>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="container">
            <div className="row">
              <div className="min-h-[100px] relative z-10 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center p-6 wishgekshead">
                <h2 className="mb-6 font-bold	 text-xl	 md:text-6xl">Service</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" inset-0 flex items-center justify-center text-center p-4">
        <div className="container">
          <div className="flex flex-col items-center">
            <h5 className="relative text-black  font-bold text-3xl md:text-4xl mt-3 leading-tight tracking-tight">
              Overview
            </h5>
          </div>
          <div className="flex justify-center   ">
            <div className="w-full sm:w-10/12 p-5">
              <p className="text-gray-600 font-medium text-sm md:text-base text-center leading-relaxed		">
                Our SEO services are designed to optimize your website for
                search engines, ensuring maximum visibility and traffic. We
                employ advanced strategies including keyword optimization,
                content creation, link building, and technical SEO to improve
                your search engine rankings and attract more visitors. Whether
                you're looking to improve local SEO or target a global audience,
                our tailored solutions ensure measurable results and long-term
                success.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="mt-4	text-white text-base py-3 px-6 border border-white rounded-lg "
            style={{
              backgroundColor: '#0079AD',
            }}
          >
            Enquire Now
          </button>
        </div>
      </div>
    </>
  );
}
