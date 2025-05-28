import React, { useRef, useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/assets/products/glx.png",
    title: "GLX E-LOADER",
    subtitle: "The Electric Skid-Steer Loader",
    info: ["HP 30-60", "Operating Hours 6–8 Hrs", "Trailer Capacity 5 Tonnes"],
  },
  {
    id: 2,
    image: "/assets/products/beast.png",
    title: "BEAST",
    subtitle: "The Mighty Autonomous Electric Tractor",
    info: ["HP 30-60", "Operating Hours 6–8 Hrs", "Trailer Capacity 5 Tonnes"],
  },
  {
    id: 3,
    image: "/assets/products/warrior.png",
    title: "WARRIOR",
    subtitle: "The Electric Self-Propelled Boom Sprayer",
    info: ["Track Width 2 m", "Boom Length 14 m", "Operating Hours 6–8 Hrs"],
  },
  {
    id: 4,
    image: "/assets/products/vamana.png",
    title: "VAMANA",
    subtitle: "The Ultimate Unmanned Ground Vehicle",
    info: ["Payload 350 Kg", "Operational Hours 6–8 Hrs", "Charging Time 5 Hrs"],
  },
  {
    id: 5,
    image: "/assets/products/ox1.png",
    title: "0X-1",
    subtitle: "The Omni-Directional Material Handler",
    info: ["Load 2500 Kg", "Operational Hours 6–8 Hrs", "Charging Time 3–4 Hrs"],
  },
];

const ResponsiveSlider = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getVisibleCount = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    const cardWidth = container.offsetWidth / getVisibleCount();
    const scrollLeft = container.scrollLeft;
    const center = scrollLeft + container.offsetWidth / 2;

    let minDiff = Infinity;
    let index = 0;

    slides.forEach((_, i) => {
      const cardCenter = cardWidth * i + cardWidth / 2;
      const diff = Math.abs(center - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        index = i;
      }
    });

    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const cardWidth = container.offsetWidth / getVisibleCount();
    const offset = direction === "left" ? -cardWidth : cardWidth;
    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="w-full relative mt-12 px-4">
      {/* Heading Section */}
      <div className="flex flex-col items-center text-center cursor-pointer">
        <h1 className="text-4xl font-extrabold tracking-widest uppercase">Products</h1>
        <h3 className="text-xs mt-5 mb-6 text-purple-600 tracking-wider uppercase">
          Agriculture | Construction | Material Handling | Mining
        </h3>
        <div className="my-6 w-full h-1 bg-gray-200"></div>
        
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-6 hide-scrollbar"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const scale = isActive ? "scale-100" : "scale-90";
          const zIndex = isActive ? "z-10" : "z-0";
          const widthClass =
            getVisibleCount() === 1
              ? "w-full"
              : getVisibleCount() === 2
              ? "w-1/2"
              : "w-1/3";

          return (
            <div
              key={slide.id}
              className={`snap-start flex-shrink-0 transition-all duration-300 transform ${scale} ${zIndex} ${widthClass} bg-white rounded-3xl shadow-xl overflow-hidden`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-64 object-contain bg-gradient-to-b from-purple-100 to-white"
              />
              <div className="p-4 text-center">
                <h3 className="text-2xl font-extrabold tracking-wide">{slide.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{slide.subtitle}</p>
                <div className="flex justify-center gap-3 mt-4 text-sm text-gray-700 flex-wrap">
                  {slide.info.map((i, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full">
                      {i}
                    </span>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 bg-yellow-400 text-sm font-bold rounded-full hover:bg-yellow-500 transition">
                  ORDER NOW
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100 z-20"
      >
        ‹
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100 z-20"
      >
        ›
      </button>
    </div>
  );
};

export default ResponsiveSlider;
