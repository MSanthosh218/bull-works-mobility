import React from 'react';

const EventsShowcase = () => {
  return (
    <section className="w-full py-12 bg-white text-center">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-xl md:text-4xl font-medium uppercase tracking-wide text-gray-900">
          Showcasing the Innovation
        </h1>
        <h3 className="text-xs md:text-lg text-purple-700 mt-2">
          Bullwork's Electric Vehicles at Major Events
        </h3>
      </div>

      <div className="w-full flex justify-center">
        <img
          src="/assets/images/events.webp" 
          alt="Bullwork's Major Events Showcase"
          className="rounded-xl shadow-lg max-w-6xl w-full px-2"
        />
      </div>
    </section>
  );
};

export default EventsShowcase;
