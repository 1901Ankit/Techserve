"use client";
import { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";

const Scrollup = () => {
  const [show, setShow] = useState(false);

  const scrolltotop = () => {
    const scrollDuration = 1000; 
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  useEffect(() => {
    const handleScroll = () => setShow(window.pageYOffset > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {show && (
        <span
          className="fixed bottom-20 right-8 cursor-pointer transition-all duration-200 ease-linear z-50"
          onClick={scrolltotop}
        >
          <div
            className="w-14 h-14 bg-blue-500 flex items-center justify-center text-white text-2xl rounded-full"
          >
            <BsArrowUp />
          </div>
        </span>
      )}
    </div>
  );
};

export default Scrollup;
