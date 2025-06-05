import React from 'react';

const AutomaticElectricVehicleSection = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 flex flex-col items-center text-center" >
      {/* Heading */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black uppercase tracking-wide">
        Unleash Electric Vehicle's True Power with BHAI by Your Side
      </h2>

      {/* Subheading */}
      <p className="text-sm sm:text-base md:text-lg mt-2 text-gray-700 max-w-7xl">
        Experience the future of electric vehicles, seamlessly controlled via mobile app,featuring autonomous navigation guided by mission files
      </p>

      {/* Video section */}
      <div className="mt-10 w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
        <video
          className="w-full h-auto rounded-xl"
          src="/assets/videoes/Technology_page.mp4" // Update path if needed
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        />
      </div>
    </section>
  );
};

export default AutomaticElectricVehicleSection;
