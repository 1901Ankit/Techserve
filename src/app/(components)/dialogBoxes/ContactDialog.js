import { useEffect, useState } from 'react';
import Image from 'next/image';
import cross from '../../../../public/assets/image/cross.png';

const ContactDialog = ({ isOpen, onClose, formData, handleChange, handleSubmit }) => {
    const [transitionClass, setTransitionClass] = useState('');

    useEffect(() => {
        if (isOpen) {
            setTransitionClass('dialog-open');
        } else {
            setTransitionClass('dialog-close');
        }
    }, [isOpen]);

    return (
        <dialog id='getInTouchModel' className={`contact-dialog-box px-5 py-10 ${transitionClass} rounded-lg`} open={isOpen}>
            <button onClick={onClose} className="font-bold absolute left-3 top-3">
                <Image src={cross} alt='Cross Symbol' />
            </button>
            <form onSubmit={handleSubmit}>
                <div className="block md:flex items-center justify-between mb-6">
                    <div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="border-solid border border-black rounded-lg px-3 py-2 w-full md:w-48 mr-4 mb-6 md:mb-0"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="border-solid border border-black rounded-lg px-3 py-2 w-full md:w-48"
                            required
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="border-solid border border-black w-full rounded-lg px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-6">
                    <textarea
                        rows="4"
                        cols="50"
                        type="text"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message"
                        className="border-solid border border-black w-full rounded-lg px-3 py-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-[#0094D3] text-white rounded-lg py-2 px-10 text-[1.2rem] font-bold">Send Message</button>
            </form>
        </dialog>
    );
};

export default ContactDialog;
