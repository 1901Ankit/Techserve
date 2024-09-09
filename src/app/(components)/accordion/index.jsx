'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import styles from './index.module.css';

const FAQ = ({ data, icon = true }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [contentHeight, setContentHeight] = useState({});
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        setContentHeight((prev) => ({
          ...prev,
          [index]: ref.scrollHeight,
        }));
      }
    });
  }, [data, contentRefs.current]);

  return (
    <div className="w-full max-w-1xl mx-auto">
      {data.map((val, i) => (
        <div key={i} className="mb-4 rounded-lg shadow-lg bg-white">
          <div
            onClick={() => toggleAccordion(i)}
            className={`cursor-pointer p-5 flex items-center justify-between transition-all duration-1000 ${styles.accordion_header}`}
          >
            <div className="flex items-center">
              {icon && (
                <FaQuestionCircle
                  className="mr-3 text-[25px]"
                  style={{ color: '#08529A' }}
                />
              )}
              <h6
                className="font-medium text-sm md:text-xl"
                style={{ color: '#08529A' }}
              >
                {val.question}
              </h6>
            </div>
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                activeIndex === i ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          <div
            ref={(el) => (contentRefs.current[i] = el)}
            className={`${styles.accordion_content} ${
              activeIndex === i ? 'open' : ''
            }`}
            style={{
              maxHeight: activeIndex === i ? `${contentHeight[i]}px` : '0px',
            }}
          >
            <div className="p-4">
              <p className="text-sm">{val.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
