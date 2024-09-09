// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";

// register Swiper custom elements
register();
import Image from "next/image";
import testimonialPersonImg1 from "../../../public/assets/image/testimonials/testimonial-person1.png";
import testimonialPersonImg2 from "../../../public/assets/image/testimonials/testimonial-person2.png";
import testimonialPersonImg3 from "../../../public/assets/image/testimonials/testimonial-person3.png";
import testimonialPersonImg4 from "../../../public/assets/image/testimonials/testimonial-person4.png";
import testimonialPersonImg5 from "../../../public/assets/image/testimonials/testimonial-person5.png";
import star from "../../../public/assets/image/testimonials/star.png";
import commaIcon from "../../../public/assets/image/testimonials/comma-icon.png";
import commaIcon2 from "../../../public/assets/image/testimonials/comma-icon2.png";
import leftArrow from "../../../public/assets/image/testimonials/left-arrow.png";
import rightArrow from "../../../public/assets/image/testimonials/right-arrow.png";

const testimonialsData = [
  {
    message:
      "The digital marketing solutions provided by Wish Geeks have helped us reach a wider audience and grow our business significantly.",
    image: testimonialPersonImg1,
    name: "John Larson",
    title: "Entrepreneur",
    stars: 5,
  },
  {
    message:
      "The team at Wish Geeks delivered a stunning website that perfectly represents our brand. Their SEO services have also helped us rank higher on search engines.",
    image: testimonialPersonImg2,
    name: "Sara Wilsson",
    title: "Entrepreneur",
    stars: 5,
  },
  {
    message:
      "The digital marketing solutions provided by Wish Geeks have helped us reach a wider audience and grow our business significantly.",
    image: testimonialPersonImg3,
    name: "Soul Goodman",
    title: "Entrepreneur",
    stars: 5,
  },
  {
    message:
      "The digital marketing solutions provided by Wish Geeks have helped us reach a wider audience and grow our business significantly.",
    image: testimonialPersonImg4,
    name: "Matt Larson",
    title: "Entrepreneur",
    stars: 5,
  },
  {
    message:
      "Their digital marketing strategies have significantly boosted our online sales. The team's expertise is evident in the results we've seen.",
    image: testimonialPersonImg5,
    name: "Lara Larson",
    title: "Entrepreneur",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-container mt-16 relative">
      <Image
        src={leftArrow}
        className="absolute left-0 top-14 hidden md:block"
      />
      <Image
        src={rightArrow}
        className="absolute right-0 top-14 hidden md:block"
      />

      <div className="text-center relative">
        <h5 className="relative text-black font-bold text-2xl md:text-3xl lg:text-4xl mt-3 leading-tight tracking-tight">
          <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-[45px] md:w-[65px] h-1 bg-blue-500 shadow-md shadow-blue-500/90"></span>
          <span className="text-4xl block mt-0">Why customers love</span>
          <span className="font-bold inline-block relative">
            working with us
          </span>
        </h5>
      </div>

      <div className="testimonials-wrapper w-5/6 md:w-2/5 mx-auto text-center mt-16 relative">
        <Image
          src={commaIcon}
          alt="Review quotations"
          className="absolute top-[-15px] left-[-35px] md:left-[-40px]"
        />
        <Image
          src={commaIcon2}
          alt="Review quotations"
          className="absolute top-[30%] right-[-35px] md:right-[-40px]"
        />
        <swiper-container
          slides-per-view="1"
          loop="true"
          space-between="30"
          speed="900"
          autoplay-delay="3000"
          autoplay-disable-on-interaction="false"
        >
          {testimonialsData.map((testimonial, index) => (
            <swiper-slide key={index}>
              <div className="testimonials flex items-center justify-center flex-col">
                <p className="font-semibold text-[#718096] text-[1.2rem] leading-9">
                  {testimonial.message}
                </p>
                <Image
                  src={testimonial.image}
                  alt="Our Testimonials"
                  className="mt-8"
                />
                <div className="ratings-stars-container flex mt-2">
                  {[...Array(testimonial.stars)].map((_, starIndex) => (
                    <Image
                      key={starIndex}
                      src={star}
                      alt="Our Ratings (Stars)"
                    />
                  ))}
                </div>
                <p className="mt-2 text-[#57007B] font-bold text-[1.2rem]">
                  {testimonial.name}
                </p>
                <p className="text-[0.92rem] ">{testimonial.title}</p>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </div>
  );
};

export default Testimonials;
