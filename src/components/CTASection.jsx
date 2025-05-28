import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 py-16 text-center">
      <h2 className="text-xl md:text-2xl font-semibold tracking-widest uppercase text-black mb-8">
        Join the Bullwork Family
      </h2>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => navigate("/order")}
          className="px-8 py-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-purple-800 text-white font-medium hover:opacity-90 transition duration-300"
        >
          Order
        </button>
        <button
          onClick={() => navigate("/demo")}
          className="px-8 py-2 rounded-md border border-purple-800 text-purple-800 font-medium hover:bg-purple-100 transition duration-300"
        >
          Book Demo
        </button>
      </div>
    </section>
  );
};

export default CTASection;
