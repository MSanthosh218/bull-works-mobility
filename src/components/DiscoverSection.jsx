import React from 'react';

const discoverItems = [
  {
    img: '/assets/media/media1.png',
    title: 'Lowest Operational Cost',
    description: 'Electric Tractors save up to 80% on diesel expenses',
  },
  {
    img: '/assets/media/media2.png',
    title: 'Next-gen Technology',
    description: 'Autonomous and drive-by-wire system smart, data driven and connected',
  },
  {
    img: '/assets/media/media3.png',
    title: 'Automation',
    description: 'Automating repetitive skilled tasks to enhance productivity',
  },
  {
    img: '/assets/media/media4.png',
    title: 'Save Environment',
    description: 'Reduces upto 10 tons of CO2 annually per machine',
  },
];

const DiscoverSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 my-10">
      {/* Heading Container */}
      <div className="heading_conatiner text-center mb-12">
        <h1 className="heading1 text-4xl font-bold uppercase tracking-wide text-[#510059]">
          Why Choose Bullwork Mobility
        </h1>
        <h3 className="heading3 text-lg font-semibold text-gray-600 mt-2">
          Designed in Bharath, Made for the World
        </h3>
      </div>

      {/* Margin separator */}
      <div className="margin mb-12">
        <div className="margin1 mx-auto w-24 h-1 bg-[#510059] rounded"></div>
      </div>

      {/* Discover Container */}
      <div className="discoverconatiner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {discoverItems.map(({ img, title, description }, idx) => (
          <div
            key={idx}
            className="saving flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md
                       transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <div className="discover_content_container">
              <img
                className="discover_image w-20 h-20 mb-6 block mx-auto transition-transform duration-300 hover:scale-110"
                src={img}
                alt={title}
              />
              <h3 className="discover_headingtext text-xl mb-5 text-[#510059]">{title}</h3>
              <h3 className="discover_text text-xs text-gray-700">{description}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscoverSection;
