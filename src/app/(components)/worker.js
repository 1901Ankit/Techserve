"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import client from "../../../public/assets/image/service/client.gif";
import project from "../../../public/assets/image/service/project.gif";
import hour from "../../../public/assets/image/service/hour.gif";
import hard from "../../../public/assets/image/service/hard.gif";
import Aos from "aos";

const Worker = () => {
  const [clients, setClients] = useState(0);
  const [projects, setProjects] = useState(0);
  const [hours, setHours] = useState(0);
  const [workers, setWorkers] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const componentRef = useRef(null);

  const startCounting = () => {
    const countTo = (setCounter, target) => {
      let count = 0;
      const interval = setInterval(() => {
        count += Math.ceil(target / 100); // Adjust the speed by changing the divisor
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        setCounter(count);
      }, 30); // Adjust the speed by changing the interval time
    };

    countTo(setClients, 232);
    countTo(setProjects, 521);
    countTo(setHours, 15);
    countTo(setWorkers, 1463);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.unobserve(componentRef.current);
          }
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasStarted) {
      startCounting();
    }
  }, [hasStarted]);

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
    <div ref={componentRef} className="container mx-auto mt-5">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div
          className="p-4 flex flex-col items-center justify-center"
          data-aos="fade-down"
        >
          <Image
            src={client}
            className="w-full max-w-[130px] h-auto"
            alt="Client"
          />
          <span className="shadow-black-500/90 text-black font-bold text-[40px] mt-1 leading-tight tracking-tight dynamic-numbers">
            {clients}+
          </span>
          <span className="text-black font-normal text-[20px] mt-1 leading-tight tracking-tight">
            Clients
          </span>
        </div>
        <div
          className="p-4 flex flex-col items-center justify-center"
          data-aos="fade-down"
        >
          <Image
            src={project}
            className="w-full max-w-[130px] h-auto"
            alt="Project"
          />
          <span className="shadow-black-500/90 text-black font-bold text-[40px] mt-1 leading-tight tracking-tight dynamic-numbers">
            {projects}
          </span>
          <span className="text-black font-normal text-[20px] mt-1 leading-tight tracking-tight">
            Projects
          </span>
        </div>
        <div
          className="p-4 flex flex-col items-center justify-center"
          data-aos="fade-down"
        >
          <Image
            src={hour}
            className="w-full max-w-[130px] h-auto"
            alt="Hours of support"
          />
          <span className="shadow-black-500/90 text-black font-bold text-[40px] mt-1 leading-tight tracking-tight dynamic-numbers">
            {hours}
          </span>
          <span className="text-black font-normal text-[20px] mt-1 leading-tight tracking-tight">
            Hours of support
          </span>
        </div>
        <div
          className="p-4 flex flex-col items-center justify-center"
          data-aos="fade-down"
        >
          <Image
            src={hard}
            className="w-full max-w-[130px] h-auto"
            alt="Hard workers"
          />
          <span className="shadow-black-500/90 text-black font-bold text-[40px] mt-1 leading-tight tracking-tight dynamic-numbers">
            {workers}
          </span>
          <span className="text-black font-normal text-[20px] mt-1 leading-tight tracking-tight">
            Hard workers
          </span>
        </div>
      </div>
    </div>
  );
};

export default Worker;
