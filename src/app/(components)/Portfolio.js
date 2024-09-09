import Image from 'next/image';
import data from '../../../public/assets/data';
import Link from 'next/link';
import { useEffect } from 'react';
import Aos from 'aos';

const Portfolio = () => {
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
        <h5 className="relative text-black font-bold text-3xl md:text-4xl mt-3 leading-tight tracking-tight">
          OUR PORTFOLIO
        </h5>
      </div>
      <div className="flex flex-wrap -mx-4">
        {data.projects.map((item) => (
          <div key={item.id} className="w-full sm:w-1/3 p-4 relative group">
            <div className="relative w-full overflow-hidden"
            data-aos="flip-down">
              <Image
                src={item.image}
                className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                alt={item.title}
              />
              <div className="absolute inset-0  h-full  flex flex-col justify-center p-4 mt-5 bg-opacity-70">
                <p className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </p>
                <span className="text-white mb-3  font-semibold">{item.description}</span>
                <span className="text-white mb-3  font-semibold">{item.visit}</span>
                <Link href={item.url}>
                  <p className="text-blue-700 py-3 px-5 rounded-full bg-white w-fit	">
                    {item.url}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
