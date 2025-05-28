import React from 'react';
// import phoneImage from './assets/techmain.webp'; // Replace with your actual phone UI image

const FrontPhoto = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video or Static Image */}
      <img
        src="./assets/techmain.webp"
        alt="Farm"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white bg-black/40">
        <h1 className="text-6xl font-bold">BHAI</h1>
        <p className="text-lg mt-2">Envisioned by Bullwork Mobility</p>

        {/* Phone Image */}
        <div className="my-8">
          <img
            src={phoneImage}
            alt="Mission Status"
            className="w-[300px] rounded-xl shadow-2xl"
          />
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full bg-white text-black text-sm py-4 flex justify-around items-center border-t border-gray-200">
          <span>1. Automation</span>
          <span>2. Control System</span>
          <span>3. BHAI App</span>
          <span>4. Analytics</span>
          <button className="ml-4 bg-primary text-white font-medium px-6 py-2 rounded-full hover:bg-purple-800 transition">
            ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrontPhoto;
