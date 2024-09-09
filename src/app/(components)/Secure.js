import Image from 'next/image';
import Trend from '../../../public/assets/image/secur/trend.png';
import Watch from '../../../public/assets/image/secur/watch.png';
import map from '../../../public/assets/image/secur/map.gif';

const Security = () => {
  return (
    <div className="container mx-auto mt-5 px-4 md:px-20">
      <div className="flex flex-col items-center py-5">
        <h5 className="relative text-center text-black font-bold text-3xl md:text-4xl mt-3 leading-tight tracking-tight">
          OUR SECURITY PARTNERS
        </h5>
      </div>

      <div className="container mx-auto  mt-7">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 p-4">
            <div className=" featured relative flex flex-col h-full justify-between  p-4  rounded-md">
              <div className="flex flex-col items-center mb-3">
                <Image src={Trend} className="w-9/12	 h-auto mb-2" alt="logo" />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 p-4">
            <div className=" featured relative flex flex-col h-full justify-between  p-4  rounded-md">
              <div className="flex flex-col items-center mb-3">
                <Image src={Watch} className="w-9/12	 h-auto mb-2" alt="logo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight text-red-700">
            We are
          </h2>
          <h2 className="text-2xl md:text-6xl font-bold mt-2 leading-tight">
            Available in
          </h2>
        </div>

        <div className="w-full md:w-1/2 flex justify-start mb-6 md:mb-0">
          <Image
            src={map}
            alt="Description of image"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Security;
