import React from "react";
import { Link } from "react-router-dom"; // <-- Make sure React Router is installed

const BhaiSection = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 md:px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
          INTRODUCING BHAI
        </h1>
        <p className="text-purple-700 text-s mt-2">
          Bullwork's AI companion to make our vehicles smart and enhance productivity
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Video in Phone Mockup */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-3xl border-black shadow-xl overflow-hidden max-w-xs aspect-[9/19] relative bg-black">
            {/* Top notch simulation */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gray-300 rounded-full z-10" />
            <video
              src="/assets/videoes/home_gcs.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-[120px] md:text-[150px] font-black leading-none bg-gradient-to-b from-[#57115E] to-[#A100B1] bg-clip-text text-transparent mb-4">
            bh.ai
          </h2>

          <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wide">
            One App To Rule Them All
          </h3>

          <ul className="space-y-3 text-gray-700 text-base md:text-lg mb-8">
            <li>Vehicle data at your finger tips</li>
            <li>Control your machine with the app in real time</li>
            <li>Execute your autonomous missions and track your vehicle's progress</li>
          </ul>

          <Link to="/technology">
            <button className="bg-gradient-to-l from-[#57115E] to-[#A100B1] text-white font-semibold px-4 py-2 rounded uppercase tracking-wide">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BhaiSection;
