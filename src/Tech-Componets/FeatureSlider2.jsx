import { useState } from "react";

const slides = [
  {
    title: "REAL-TIME ANALYTICS AND LIVE STREAMING",
    // This description will now appear below the title
    description: "Stay informed with real-time updates on your vehicle's performance and live camera feeds, all accessible through a user-friendly interface.",
    image: "/assets/images/slider2a.png",
    // bottomText is no longer needed here as it's moved to description
    // bottomText: "Stay informed with real-time updates on your vehicle's performance and live camera feeds, all accessible through a user-friendly interface.",
  },
  {
    title: "REAL-TIME ANALYTICS AND LIVE STREAMING",
    // This description will now appear below the title
    description: "Stay informed with real-time updates on your vehicle's performance and live camera feeds, all accessible through a user-friendly interface.",
    image: "/assets/images/slider2b.png",
    // bottomText is no longer needed here as it's moved to description
    // bottomText: "Stay informed with real-time updates on your vehicle's performance and live camera feeds, all accessible through a user-friendly interface.",
  },
];

export default function FeatureSlider2() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides?.[index]; // Use optional chaining for safer access

  return (
    <div className="w-full px-4 py-12 bg-gray-100  text-black flex flex-col items-center relative overflow-hidden">
      {/* Top Heading and Description */}
      <div className="text-center mb-8"> {/* Added a div to group title and description */}
        <h1 className="heading2 font-bold tracking-wide uppercase mb-2 text-xl md:text-3xl">
          {slide?.title}
        </h1>
        {slide?.description && ( // Conditionally render description if it exists
          <p className="product_heading3 text-gray-700 text-base md:text-lg max-w-3xl mx-auto">
            {slide.description}
          </p>
        )}
      </div>

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
                  className="w-[92%] h-[92%] object-contain"
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

      {/* The original bottomText rendering logic is removed as it's now part of the top section */}
      {/* {slide?.bottomText && (
        <h2 className="product_heading3 mt-6 text-center px-4 max-w-2xl text-base md:text-lg text-gray-700">
          {slide.bottomText}
        </h2>
      )} */}
    </div>
  );
}