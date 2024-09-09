import Image from 'next/image';
import wish from '../../../public/assets/image/wish.png';
import Link from 'next/link';
import instagram from '../../../public/assets/image/instagram.png';
import facebook from '../../../public/assets/image/facebook.png';
import linkedin from '../../../public/assets/image/linkedin.png';

import { IoIosArrowForward } from 'react-icons/io';
import {
  faceBookFooter,
  instagramFooter,
  linkedinFooter,
} from '../(fileImports)/constant';
import CountriesTFN from './CountriesTFN';

const links = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Services', url: '/services' },
  { name: 'Terms of Service', url: '/terms' },
  { name: 'Privacy Policy', url: '/privacy' },
];

const services = [
  { name: 'SEO Optimization', url: '/service/seo-optimisation' },
  { name: 'App Development', url: '/service/app-development' },
  { name: 'Software Development', url: '/service/software-development' },
  { name: 'Block Chain Development', url: '/service/block-chain-development', },
  { name: 'Data Analysis', url: '/service/data-analysis' },
  { name: 'Cyber Security', url: '/service/cyber-security' },
  { name: 'UI & UX Designing', url: '/service/ui-ux-design' },
];

const Footer = () => {
  return (
    <footer className="text-black py-9 lg:py-16 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-y-12 md:gap-y-0 md:ml-14 lg:ml-20 md:mr-0 pb-12">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-2xl mb-8 font-semibold uppercase">
              <Link href="/">
                <Image
                  src={wish}
                  alt="Wish Geeks Logo"
                  width={192}
                  height={75}
                  className="w-48"
                />
              </Link>
            </h3>

            <h4 className="text-lg font-extrabold uppercase">HEADQUATERED IN:</h4>
            <p className="text-base font-inter">
              12A02 Tower C 13th Floor Iconic Corenthum <br />
              Sector-62, Noida, Uttar Pradesh
              <br />
              India, 201301
              <br />
              <br />
              <strong>
                Phone:
                <Link href="tel:01204122558">
                  <span>+91</span>
                  <span className="text-black-600 underline ml-1">
                    01204122558
                  </span>
                </Link>
              </strong>
              <br />
              <strong className=''>Email:
                <Link href="mailto:info@wishgeekstechserve.com">
                  <span className="text-black-600 ml-1">
                    info@wishgeekstechserve.com
                  </span>
                </Link>
              </strong>
            </p>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 sm:pt-0 lg:pt-8 sm:pl-4 lg:pl-14">
            <h4 className="text-lg font-extrabold mb-4 text uppercase">Useful Links</h4>
            <div className='flex flex-wrap md:block md:flex-nowrap'>
              {links.map((link) => (
                <div key={link.name} className='flex items-center mr-3 md:mr-0'>
                  <i className='footer-list-circle'></i>
                  <div className="py-2 flex items-center">
                    <Link href={link.url}>
                      <span className="text-gray-800 underline text-base">{link.name}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className='mobile-social-icons-container flex md:hidden items-center justify-start md:justify-evenly'>
              <div className='mobile-social-icon facebook'>
                <Link href="https://www.facebook.com/people/Wish-Geeks-Techserve/61561598433636/">
                  <Image src={facebook} alt='Facebook Logo' />
                </Link>
              </div>
              <div className='mobile-social-icon instagram'>
                <Link href="https://www.instagram.com/wishgeekstechserve/?igsh=cWl4cGlxeTltZng0">
                  <Image src={instagram} alt='Instagram Logo' />
                </Link>
              </div>
              <div className='mobile-social-icon linkedin'>
                <Link href="https://www.linkedin.com/company/wishgeekstechserve/?originalSubdomain=in">
                  <Image src={linkedin} alt='Linkedin Logo' />
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 sm:pt-0 lg:pt-8">
            <h4 className="text-lg font-extrabold mb-4 uppercase">Our Services</h4>
            <div>
              {services.map((service) => (
                <div key={service.name} className='flex items-center'>
                  <i className='footer-list-circle'></i>
                  <div className="py-2 flex items-center">
                    <Link href={service.url}>
                      <span className="text-gray-800 underline text-base">
                        {service.name}
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CountriesTFN />
      <div className="absolute top-1/2 md:top-1/3 hidden md:flex flex-col gap-y-2 transform -translate-y-1/2">
        <Link href="https://www.facebook.com/people/Wish-Geeks-Techserve/61561598433636/">
          <Image
            src={faceBookFooter}
            alt="facebook icon"
            className="w-14 h-auto"
          />
        </Link>
        <Link href="https://www.instagram.com/wishgeekstechserve/?igsh=cWl4cGlxeTltZng0">
          <Image
            src={instagramFooter}
            alt="instagram icon"
            className="w-14 h-auto"
          />
        </Link>
        <Link href="https://www.linkedin.com/company/wishgeekstechserve/?originalSubdomain=in">
          <Image
            src={linkedinFooter}
            alt="linkedin icon"
            className="w-14 h-auto"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
