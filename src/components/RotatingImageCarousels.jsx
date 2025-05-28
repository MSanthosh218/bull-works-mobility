import React from 'react';
import { useNavigate } from 'react-router-dom';

const RotatingImageCarousels = () => {
  const navigate = useNavigate();

  const clockwiseImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', alt: 'Woman with laptop' },
    { id: 2, src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', alt: 'Gray laptop computer' },
    { id: 3, src: 'https://images.unsplash.com/photo-1518770660439-4636190af475', alt: 'Circuit board' },
    { id: 4, src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', alt: 'Java programming' },
    { id: 5, src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', alt: 'Woman coding' },
    { id: 6, src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', alt: 'Matrix style' },
  ];

  const counterClockwiseImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1', alt: 'Laptop on surface' },
    { id: 2, src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81', alt: 'Video screens display' },
    { id: 3, src: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b', alt: 'Blue light bulb' },
    { id: 4, src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', alt: 'MacBook with code' },
    { id: 5, src: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901', alt: 'Orange tabby cat' },
    { id: 6, src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04', alt: 'Living room' },
  ];

  const renderRotatingCarousel = (images, reverse = false) => {
    const animationStyle = {
      animation: `spin 20s linear infinite ${reverse ? 'reverse' : ''}`,
    };

    return (
      <div className="relative w-72 h-72 sm:w-80 sm:h-80">
        <div className="absolute inset-0" style={animationStyle}>
          {images.map((image, index) => {
            const angle = (360 / images.length) * index;
            return (
              <div
                key={image.id}
                className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-lg border-4 border-white transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-[#fbfbfd] py-16 px-4 md:px-20 text-center sm:px-12 ">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Our Visual Story</h2>
      <p className="text-gray-600 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
        Experience our journey with us the bullworks mobility—showcasing innovation, technology, and creativity.
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Clockwise Carousel */}
        <div className="flex flex-col items-center">
          {renderRotatingCarousel(clockwiseImages, false)}
          <div className="mt-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">PRESS RELEASES</h2>
          </div>
        </div>

        {/* Counter-Clockwise Carousel */}
        <div className="flex flex-col items-center">
          {renderRotatingCarousel(counterClockwiseImages, true)}
          <div className="mt-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">AWARDS AND CERTIFICATIONS</h2>
          </div>
        </div>
      </div>

      {/* View More Button */}
      <div className="mt-12">
        <button
          onClick={() => navigate('/awards')}
          className="px-4 py-2 bg-gradient-to-l from-[#57115E] to-[#A100B1] text-white text-lg rounded transition-colors duration-300 shadow-md"
        >
          View More
        </button>
      </div>

      {/* Spin keyframes */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default RotatingImageCarousels;
