import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const pressLogos = [
  {
    id: 1,
    src: 'https://upload.wikimedia.org/wikipedia/en/5/5a/F6S_Logo.png',
    alt: 'F6S',
  },
  {
    id: 2,
    src: 'https://startus-insights.com/wp-content/uploads/startus-logo.png',
    alt: 'StartUs Insights',
  },
  {
    id: 3,
    src: 'https://logos-download.com/wp-content/uploads/2021/01/Razorpay_Logo.png',
    alt: 'Razorpay',
  },
  {
    id: 4,
    src: 'https://the-ken.com/wp-content/themes/theken/assets/images/logo-black.svg',
    alt: 'The Ken',
  },
  {
    id: 5,
    src: 'https://images.yourstory.com/cs/images/yourstory-logo.png',
    alt: 'YourStory',
  },
];

const awardLogos = [
  {
    id: 1,
    src: 'https://msme.gov.in/sites/default/files/MSMELogo.png',
    alt: 'MSME',
  },
  {
    id: 2,
    src: 'https://www.startupindia.gov.in/content/dam/invest-india/startupindia/logos/StartupIndia-Logo.png',
    alt: 'Startup India',
  },
  {
    id: 3,
    src: 'https://static.startupmaharashtra.org/images/smc-logo.png',
    alt: 'Startup Maharathi',
  },
  {
    id: 4,
    src: 'https://naarm.org.in/wp-content/uploads/2020/02/aidea.png',
    alt: 'a-IDEA',
  },
  {
    id: 5,
    src: 'https://i.postimg.cc/X7jDcGG1/goi.png',
    alt: 'Government of India',
  },
];

const PressAwardsSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-20 text-center">
      {/* Press Releases */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">PRESS RELEASES</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {pressLogos.map((logo) => (
            <SwiperSlide key={logo.id}>
              <div className="w-full h-20 flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
                <img src={logo.src} alt={logo.alt} className="max-h-16 object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Awards and Certifications */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">AWARDS AND CERTIFICATIONS</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {awardLogos.map((logo) => (
            <SwiperSlide key={logo.id}>
              <div className="w-full h-20 flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
                <img src={logo.src} alt={logo.alt} className="max-h-16 object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PressAwardsSection;
