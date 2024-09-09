'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

// Mobile technologies
import android from '../../../public/assets/image/technologies/android.png';
import flutter from '../../../public/assets/image/technologies/flutter.png';
import xamarin from '../../../public/assets/image/technologies/xamarin.png';
import kotlin from '../../../public/assets/image/technologies/kotlin.png';
import react from '../../../public/assets/image/technologies/react.png';
import swift from '../../../public/assets/image/technologies/swift.png';
import objectiveC from '../../../public/assets/image/technologies/objc.png';

// Frontend technologies
import typescript from '../../../public/assets/image/technologies/ts.png';
import css from '../../../public/assets/image/technologies/css.png';
import angular from '../../../public/assets/image/technologies/angular.png';
import javascript from '../../../public/assets/image/technologies/js.png';
import html from '../../../public/assets/image/technologies/html.png';
import vue from '../../../public/assets/image/technologies/vue.png';

// Backend technologies
import php from '../../../public/assets/image/technologies/php.png';
import java from '../../../public/assets/image/technologies/java.png';
import dotnet from '../../../public/assets/image/technologies/dotnet.png';
import chash from '../../../public/assets/image/technologies/csharp.png';
import scala from '../../../public/assets/image/technologies/scala.png';
import nodejs from '../../../public/assets/image/technologies/nodejs.png';
import python from '../../../public/assets/image/technologies/python.png';

// Other technologies
import jenkins from '../../../public/assets/image/technologies/jenkins.png';
import magento from '../../../public/assets/image/technologies/magento.png';
import docker from '../../../public/assets/image/technologies/docker.png';
import rubyOnRails from '../../../public/assets/image/technologies/rubyOnRails.png';
import goLang from '../../../public/assets/image/technologies/go.png';
import kubernetes from '../../../public/assets/image/technologies/kubernetes.png';
import wordpress from '../../../public/assets/image/technologies/wordpress.png';

// Importing technologies
const technologies = {
  mobile: [
    { src: flutter, alt: 'Flutter', text: 'Flutter' },
    { src: xamarin, alt: 'Xamarin', text: 'Xamarin' },
    { src: react, alt: 'React Native', text: 'React Native' },
    { src: swift, alt: 'Swift', text: 'Swift' },
    { src: kotlin, alt: 'Kotlin', text: 'Kotlin' },
    { src: android, alt: 'Android', text: 'Android' },
    { src: objectiveC, alt: 'Objective-C', text: 'Objective-C' },
  ],
  frontend: [
    { src: typescript, alt: 'TypeScript', text: 'TypeScript' },
    { src: css, alt: 'CSS', text: 'CSS' },
    { src: react, alt: 'React', text: 'React' },
    { src: angular, alt: 'Angular', text: 'Angular' },
    { src: javascript, alt: 'JavaScript', text: 'JavaScript' },
    { src: html, alt: 'HTML', text: 'HTML' },
    { src: vue, alt: 'Vue', text: 'Vue' },
  ],
  backend: [
    { src: php, alt: 'PHP', text: 'PHP' },
    { src: java, alt: 'Java', text: 'Java' },
    { src: dotnet, alt: '.NET', text: '.NET' },
    { src: chash, alt: 'C#', text: 'C#' },
    { src: scala, alt: 'Scala', text: 'Scala' },
    { src: nodejs, alt: 'Node.js', text: 'Node.js' },
    { src: python, alt: 'Python', text: 'Python' },
  ],
  other: [
    { src: jenkins, alt: 'Jenkins', text: 'Jenkins' },
    { src: magento, alt: 'Magento', text: 'Magento' },
    { src: docker, alt: 'Docker', text: 'Docker' },
    { src: rubyOnRails, alt: 'Ruby on Rails', text: 'Ruby on Rails' },
    { src: goLang, alt: 'GoLang', text: 'GoLang' },
    { src: kubernetes, alt: 'Kubernetes', text: 'Kubernetes' },
    { src: wordpress, alt: 'WordPress', text: 'WordPress' },
  ]
};

const Technologies = () => {
  const [activeTab, setActiveTab] = useState('mobile');

  useEffect(() => {
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      Object.assign(swiperEl, {
        breakpoints: {
          100: { slidesPerView: 3, spaceBetween: 20 },
          640: { slidesPerView: 4, spaceBetween: 20 },
          768: { slidesPerView: 5, spaceBetween: 40 },
          1024: { slidesPerView: 6, spaceBetween: 100 },
        },
      });
      swiperEl.initialize();
    }
  }, [activeTab]);

  const renderContent = (category) => (
    <div>
      <swiper-container loop="true" space-between="30" speed="300" autoplay-delay="1000" autoplay-disable-on-interaction="false">
        {technologies[category].map((tech, index) => (
          <swiper-slide key={index}>
            <div className='flex items-center flex-col justify-center'>
              <Image src={tech.src} alt={tech.alt} />
              <p className='font-bold mt-2 text-xl text-nowrap text-center'>{tech.text}</p>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );

  return (
    <div className='technologies-section'>
      <div className="tabs">
        <div className='tabs-section-mobile'>
          <button className={`${activeTab === 'mobile' ? 'active' : ''} left-end-btn`} onClick={() => setActiveTab('mobile')}>Mobile Technologies</button>
          <button className={activeTab === 'frontend' ? 'active' : ''} onClick={() => setActiveTab('frontend')}>Front-End Technologies</button>
        </div>
        <div className='tabs-section-mobile'>
          <button className={activeTab === 'backend' ? 'active' : ''} onClick={() => setActiveTab('backend')}>Back-End Technologies</button>
          <button className={`${activeTab === 'other' ? 'active' : ''} right-end-btn`} onClick={() => setActiveTab('other')}>Other Technologies</button>
        </div>
      </div>
      <div className="content">
        {renderContent(activeTab)}
      </div>
    </div>
  );
};

export default Technologies;
