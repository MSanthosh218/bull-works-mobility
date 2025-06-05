import { useState } from "react";

const slides = [
  {
    title: "Elevate from action to insight Track metrics, Optimize operations",
    description: "", // Description is not used in the final render based on the request
    image: "/assets/images/slider1.png",
    bottomText: "Bullwork's electric vehicles are equipped with a smart app that provides detailed insights into its live location, current speed, remaining battery charge and real-time performance metrics.",
  },
  {
    title: "Elevate from action to insight Track metrics, Optimize operations",
    description: "", // Description is not used in the final render based on the request
    image: "/assets/images/slider2.png",
    bottomText: "Bullwork's electric vehicles are equipped with a smart app that provides detailed insights into its live location, current speed, remaining battery charge and real-time performance metrics.",
  },
];


export default function FeatureSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides?.[index]; // Use optional chaining for safer access

  return (
    <div className="w-full px-4 py-12 bg-white text-black flex flex-col items-center relative overflow-hidden">
      {/* Top Heading */}
      <h1 className="heading2 text-center font-bold tracking-wide uppercase mb-4 text-xl md:text-3xl">
        {slide?.title}
      </h1>

      <div className="relative w-full max-w-6xl flex justify-center items-center">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-all duration-200 z-10"
        >
          ⟵
        </button>

        {/* Slider container with overflow hidden and a flexible inner div */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((s, idx) => (
              <div key={idx} className="w-full flex-shrink-0 flex justify-center items-center">
                <img
                  src={s.image}
                  alt={`Slide ${idx + 1}`}
                  className="w-[80%] h-[80%] object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 z-10"
        >
          ⟶
        </button>
      </div>

      {/* Bottom Text */}
      {slide?.bottomText && ( // Conditionally render if bottomText exists
        <h2 className="product_heading3 text-center px-4 max-w-2xl text-base md:text-lg text-gray-700">
          {slide.bottomText}
        </h2>
      )}
    </div>
  );
}