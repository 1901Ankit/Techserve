import logo from '../../../public/assets/image/work/logo.png';
import combo from '../../../public/assets/image/work/combo.png';
import combo2 from '../../../public/assets/image/work/combo2.png';
import website from '../../../public/assets/image/work/website.png';
import arrow from '../../../public/assets/image/about/arrow.png';
import cannon from '../../../public/assets/image/about/cannon.png';
import image1 from '../../../public/assets/image/portflio/image1.png';
import image2 from '../../../public/assets/image/portflio/image2.png';
import image3 from '../../../public/assets/image/portflio/image3.png';
import image4 from '../../../public/assets/image/portflio/image4.png';
import image5 from '../../../public/assets/image/portflio/image5.png';
import image6 from '../../../public/assets/image/portflio/image6.png';


const data = {
  faq: [
    {
      question: 'What services do you offer?',
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: 'What is the importance of IT product development?',
      answer:
        'User-friendly and attractive applications keep bringing back users to your products and services. They are instrumental in enhancing customer service, increasing sales, and product visibility.',
    },
    {
      question:
        'Do you provide ownership of codes while outsourcing an IT product development service?',
      answer:
        'Yes, we provide full ownership of the codes to the client after development. We also offer annual maintenance plans for clients who require ongoing support, including software updates, performance monitoring, and 24/7 technical support.',
    },
    {
      question: 'What makes your company stand out from your competitors?',
      answer:
        'Our company differentiates itself from its competitors through its approach to brainstorming and problem-solving, which involves a free-flowing and creative process that involves input from all team members. We also pride ourselves on our cordial relationships and collaborative approach with our clients, ensuring that we build a positive rapport that leads to successful collaborations.',
    },
    {
      question: 'How do you optimize a website for search engines?',
      answer:
        'We optimize a website for search engines by conducting keyword research, creating high-quality and relevant content, building high-quality backlinks, and ensuring that the website is mobile-friendly and has a fast loading speed.',
    },
    {
      question:
        'How do you track the effectiveness of your digital marketing efforts?',
      answer:
        'We track various digital marketing metrics such as website traffic, conversion rates, engagement on social media, lead generation, KPIs, return on investment, and customer satisfaction levels. This helps us to monitor the effectiveness of our marketing efforts and identify areas for improvement.',
    },
  ],
  features: [
    {
      id: 1,
      text: 'Custom Website Development',
    },
    {
      id: 2,
      text: 'Innovative Design Solutions',
    },
    {
      id: 3,
      text: 'Robust Security Measures',
    },
    {
      id: 4,
      text: 'Comprehensive SEO Services',
    },
  ],
  projects: [
    {
      id: 1,
      image: image1,
      title: 'Printing Solution',
      description: 'Digital Marketing Services',
      url: 'https://printingsolution.us/',
    },
    {
      id: 2,
      image: image2,
      title: 'Printing Work',
      description: 'Digital Marketing Services',
      url: 'https://printingswork.com/',
    },
    {
      id: 3,
      image: image3,
      title: 'Click Install Setup',
      description: 'Digital Marketing Services',
      url: 'https://clickinstallsetup.com/',
    },
    {
      id: 4,
      image: image4,
      title: 'HN Concept',
      description: 'Digital Marketing',
      url: 'https://hnconcepts.com/',
    },
    {
      id: 5,
      image: image5,
      title: 'ZoomWebmediallc',
      description: 'Digital Marketing Service',
      url: 'https://zoomwebmediallc.com/',
    },
    {
      id: 6,
      image: image6,
      title: 'Printing Blog',
      description: 'We Have The Best Offer For You',
      url: 'https://printersblogs.com/',
    },
  ],

  pricing: [
    {
      id: 1,
      image: logo,
      title: 'Logo',
      price: '₹499 / onwards',
      features: [
        '1 Creative concept design',
        '100% Copyright',
        'Various color combinations',
        'Design revisions',
        'Phone consultation with branding experts',
      ],
    },
    {
      id: 2,
      image: combo,
      title: 'Combo',
      price: '₹999 / onwards',
      features: [
        'Unlimited Creative Concept Design',
        'All are made from scratch level',
        '100% Copyright free',
        'Various color combinations',
        'Design revisions',
        'Phone consultation with branding expert',
      ],
    },
    {
      id: 3,
      image: website,
      title: 'Website Design',
      price: '₹1999 / onwards',
      features: ['Single page website excluding domain hosting'],
    },
    {
      id: 4,
      image: combo2,
      title: 'Combo',
      subtitle:
        '(Logo + LetterHead + Stamp + Visiting Card + Qr Code + Social Media Kit)',
      price: '₹1899 / onwards',
      features: [
        'Unlimited Creative Concept Design',
        'All are made from scratch level',
        '100% Copyright free',
        'Various color combinations',
        'Design revisions',
        'Phone consultation with branding expert',
      ],
    },
    {
      id: 5,
      image: website,
      title: 'Website',
      price: '₹3999 / month',
      features: [
        'Website Development (5 - 6 Pages)',
        'Company email IDs - 10',
        'Home page',
        'About us page',
        'Contact us page',
        'Product/Service pages',
        'Contact form integration',
        'WhatsApp chat integration',
      ],
      note: 'Excluding domain hosting integration with 6 months maintenance and support',
    },
  ],
  mission: [
    {
      id: 1,
      type: 'section',
      title: 'OUR MISSION',
      description: `Wish Geeks' mission is to help businesses in redefining their
                    excellence and values. We have set out foot in the path of
                    visibility, paving ways from local limitations towards the
                    world-wide presence.`,
      additional: `Ensuring that they do not go unnoticed. Promising a milestone
                    towards their achievement. Here to make a difference. Here to
                    make every click count.`,
      image: arrow,
    },
    {
      id: 2,
      type: 'section',
      title: 'OUR VISION',
      description: `Wish Geeks' vision is to redefine service excellence. We have a
                    promise, made to our self and to our members, to make their
                    online presence visible. And we ensure that every promise we
                    make is a guarantee of exceptional care, dedicated to bring
                    happiness and satisfaction to all our members.`,
      additional: `It is our vision to bring the best and hassle free service for
                    you. We are determined to provide the best at the most pocket
                    friendly prices.`,
      image: cannon,
    },
  ],
};

export default data;


// Service Process SVG's
// export const processArrow1 = () => `
// <svg width="206" height="197" viewBox="0 0 206 197" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
// <rect width="206" height="197" fill="url(#pattern0_501_3748)"/>
// <defs>
// <pattern id="pattern0_501_3748" patternContentUnits="objectBoundingBox" width="1" height="1">
// <use xlink:href="#image0_501_3748" transform="matrix(0.00655007 0 0 0.00684932 -0.0010806 0)"/>
// </pattern>
// <image id="image0_501_3748" width="153" height="146" xlink:href="data:image/png;base64,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"/>
// </defs>
// </svg>
// `
// export const processArrow2 =`
// <svg width="283" height="171" viewBox="0 0 283 171" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
// <g filter="url(#filter0_d_501_3750)">
// <rect x="4" width="275" height="163" fill="url(#pattern0_501_3750)" shape-rendering="crispEdges"/>
// </g>
// <defs>
// <filter id="filter0_d_501_3750" x="0" y="0" width="283" height="171" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// <feOffset dy="4"/>
// <feGaussianBlur stdDeviation="2"/>
// <feComposite in2="hardAlpha" operator="out"/>
// <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
// <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_501_3750"/>
// <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_501_3750" result="shape"/>
// </filter>
// <pattern id="pattern0_501_3750" patternContentUnits="objectBoundingBox" width="1" height="1">
// <use xlink:href="#image0_501_3750" transform="matrix(0.00354927 0 0 0.00598802 -0.00044638 0)"/>
// </pattern>
// <image id="image0_501_3750" width="282" height="167" xlink:href="data:image/png;base64,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"/>
// </defs>
// </svg>
// `
// export const processArrow3 =`
// <svg width="313" height="166" viewBox="0 0 313 166" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
// <rect x="5.35938" width="307" height="155" transform="rotate(1.98183 5.35938 0)" fill="url(#pattern0_501_3751)"/>
// <defs>
// <pattern id="pattern0_501_3751" patternContentUnits="objectBoundingBox" width="1" height="1">
// <use xlink:href="#image0_501_3751" transform="matrix(0.00341297 0 0 0.00675988 0 -0.010371)"/>
// </pattern>
// <image id="image0_501_3751" width="293" height="151" xlink:href="data:image/png;base64,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"/>
// </defs>
// </svg>
// `

// export const processArrow4 =`
// <svg width="197" height="191" viewBox="0 0 197 191" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
// <rect width="197" height="191" fill="url(#pattern0_501_3752)"/>
// <defs>
// <pattern id="pattern0_501_3752" patternContentUnits="objectBoundingBox" width="1" height="1">
// <use xlink:href="#image0_501_3752" transform="matrix(0.00664071 0 0 0.00684932 -0.00801405 0)"/>
// </pattern>
// <image id="image0_501_3752" width="153" height="146" xlink:href="data:image/png;base64,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"/>
// </defs>
// </svg>
// `