"use client";

import Image from 'next/image';
import mailIcon from '../../../public/assets/image/email_icon.png';
import whatsappIcon from '../../../public/assets/image/whatsapp_icon.png';
import phoneIcon from '../../../public/assets/image/phone_icon.png';
import contactImg from '../../../public/assets/image/contact.png';
import mapImg from '../../../public/assets/image/map.png';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import DialogButton from './DialogButton';
import ContactDialog from './dialogBoxes/ContactDialog';

// register Swiper custom elements
register();

const ResponsiveSwiper = ({ isOpen, onClose, formData, handleChange, handleSubmit, openDialog }) => {
    return (
        <div className='block lg:hidden w-full'>
            <swiper-container slides-per-view="1" space-between="30">
                <swiper-slide>
                    <div className="get-in-touch-box bg-white rounded-2xl py-8 px-6 shadow-xl border-b-[15px] border-[#07A9EE]">
                        <h5 className='text-[#07A9EE] font-extrabold text-2xl mb-6'>WE'RE HERE</h5>
                        <div className='flex mt-3 items-center'>
                            <div>
                                <Image src={mailIcon} alt='Mail Icon' />
                            </div>
                            <p className='text-base ms-2 font-medium'>info@wishgeekstechserve.com</p>
                        </div>
                        <div className='flex mt-3 items-center'>
                            <div>
                                <Image src={whatsappIcon} alt='WhatsApp Icon' />
                            </div>
                            <p className='text-base ms-2 font-medium'>+91 8700133076</p>
                        </div>
                        <div className='flex mt-3 items-center'>
                            <div>
                                <Image src={phoneIcon} alt='Phone Icon' />
                            </div>
                            <p className='text-base ms-2 font-medium'>01204122558</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div className="get-in-touch-box bg-white rounded-2xl py-8 px-6 shadow-xl border-b-[15px] border-[#07A9EE] text-center">
                        <div className='relative bottom-7'>
                            <Image src={contactImg} alt='Contact us illustration' className='m-auto' />
                            <p className='font-bold'>CONTACT SUPPORT</p>
                            <button className='text-[#07A9EE] hover:text-white hover:bg-[#07A9EE] font-bold border border-[#07A9EE] rounded-full text-sm py-1 px-6 mt-2' onClick={openDialog}>GET SUPPORT</button>
                            {/* <DialogButton /> */}
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div className="get-in-touch-box bg-white rounded-2xl py-8 px-6 shadow-xl border-b-[15px] border-[#07A9EE] text-center">
                        <Image src={mapImg} alt='Map illustration' className='m-auto' />
                        <p className='font-bold'>OUR ADDRESS</p>
                        <p className='font-semibold'>Sector-62, Noida, Uttar Pradesh</p>
                    </div>
                </swiper-slide>
            </swiper-container>

            <ContactDialog
                isOpen={isOpen}
                onClose={onClose}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default ResponsiveSwiper