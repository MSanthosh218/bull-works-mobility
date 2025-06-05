import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative shadow-lg  w-full h-screen flex flex-col justify-end items-center overflow-hidden">
      {/* Hero Image */}
      <img
        src="/assets/images/hero.png"
        alt="Hero"
        className="w-full h-full object-cover object-center"
      />

      {/* Text Overlay */}
      <div className="absolute top-[30%] left-[5%] md:left-[10%] px-4 md:px-6 max-w-[90%] md:max-w-[50%] text-white z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          BHAI
        </h1>
        <p className="text-base sm:text-lg md:text-xl mt-2">
          Envisioned by Bullwork Mobility
        </p>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 w-full bg-white py-4 px-6 flex flex-col md:flex-row justify-evenly items-center gap-4 md:gap-0 text-sm md:text-base z-10 shadow-md">
        <div className="flex flex-wrap justify-center gap-4 text-black text-center">
          <span>1. Automation</span>
          <span>2. Control System</span>
          <span>3. BHAI App</span>
          <span>4. Analytics</span>
        </div>
        <Link
          to="/order"
          className="bg-gradient-to-l from-[#57115E] to-[#A100B1] text-white font-semibold py-2 px-8 rounded hover:scale-105 transition-transform duration-200"
        >
          ORDER
        </Link>
      </div>
    </section>
  );
};

export default Hero;
