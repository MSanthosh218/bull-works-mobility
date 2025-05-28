import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainHome = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full text-center overflow-hidden">
      {/* Image with ORDER NOW button overlay */}
      <div className="relative w-full h-[45vh] sm:h-[80vh] md:h-screen">
        <img
          src="/assets/vehicles.png"
          alt="Bullwork Vehicles"
          className="w-full h-full object-cover"
        />

        {/* Order Now button overlaid on the image */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={() => navigate("/order")}
            className="bg-gradient-to-l from-[#57115E] to-[#A100B1] hover:bg-[#7e32b2] text-white font-semibold text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-3 rounded shadow-lg tracking-wider uppercase"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Tagline and Subtitle below image for mobile & tablet, overlay on desktop */}
      <div className="px-4 py-6 md:absolute md:bottom-20 md:w-full md:text-center">
        <p
          className="text-xs sm:text-lg md:text-2xl lg:text-3xl font-semibold text-black leading-snug max-w-6xl mx-auto"
          style={{ wordSpacing: '0.3rem' }}
        >
          WE PROVIDE FULL STACK ELECTRIC AUTONOMOUS SOLUTIONS FOR CLEANER GREENER TOMORROW
        </p>
        <p className="text-xs sm:text-sm md:text-base text-[#791ea7] mt-2 tracking-widest uppercase">
          Electric Tractors | Sprayers | Loaders | Bots
        </p>
      </div>

      {/* Scroll Icon (visible on md and up) */}
      <div className="hidden md:block absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <span className="text-xl animate-bounce">⌄</span>
      </div>
    </section>
  );
};

export default MainHome;
