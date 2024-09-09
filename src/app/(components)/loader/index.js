'use client';
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import './index.css';
const Loader = () => {
  const [showVideo, setShowVideo] = useState(true);
  const bodyRef = useRef(null);
  useEffect(() => {
    bodyRef.current = document.body;
    bodyRef.current.classList.add('no-scroll');
    window.scrollTo(0, 0);
    const loaderTimeout = setTimeout(() => {
      setShowVideo(false);
      startLoaderAnimation();
    }, 1200);
    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);
  const startLoaderAnimation = () => {
    const timeline = gsap.timeline();
    timeline.to('.mil-preloader-animation', {
      opacity: 1,
    });
    const animationDuration = 0.5;
    timeline.fromTo(
      '.mil-animation-1 .mil-h3',
      { y: '30px', opacity: 0 },
      { y: '0px', opacity: 1, stagger: 0.4 }
    );
    timeline.to('.mil-animation-1 .mil-h3', { opacity: 0, y: '-30' }, '+=.3');
    timeline.fromTo(
      '.mil-reveal-box',
      0.1,
      { opacity: 0 },
      { opacity: 1, x: '-30' }
    );
    timeline.to('.mil-reveal-box', 0.45, { width: '100%', x: 0 }, '+=.1');
    timeline.to('.mil-reveal-box', { right: '0' });
    timeline.to('.mil-reveal-box', 0.3, { width: '0%' });
    timeline.fromTo(
      '.mil-animation-2 .mil-h3',
      { opacity: 0 },
      { opacity: 1 },
      '-=.5'
    );
    timeline.to(
      '.mil-animation-2 .mil-h3',
      0.6,
      { opacity: 0, y: '-30' },
      '+=.5'
    );
    timeline.to('.mil-preloader', animationDuration, {
      opacity: 0,
      ease: 'sine',
    });
    timeline.fromTo(
      '.mil-up',
      animationDuration,
      {
        opacity: 0,
        y: 40,
        scale: 0.98,
        ease: 'sine',
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        onComplete: () => {
          bodyRef.current.classList.remove('no-scroll');
          document.querySelector('.mil-preloader').classList.add('mil-hidden');
        },
      },
      '-=1'
    );
  };
  return (
    <div className="mil-preloader">
      <div className={`mil-preloader-animation ${!showVideo ? 'visible' : ''}`}>
        <div className="mil-pos-abs mil-animation-1">
          <p className="mil-h3 mil-muted text-center text-white fw-100">
            Wish Geeks Techserve
          </p>
        </div>
        <div className="mil-pos-abs mil-animation-2">
          <div className="mil-reveal-frame">
            <p className="mil-reveal-box"></p>
            <p className="mil-h3 mil-muted mil-thin text-white reltiy text-center">
              <span
                className="mil-h3 mil-muted fw-500"
                style={{ color: '#fff' }}
              >
                Forge your future today.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loader;