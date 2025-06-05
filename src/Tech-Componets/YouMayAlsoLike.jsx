import React from "react";
import { Link } from 'react-router-dom'; // Import Link for navigation
import ProductCard from '../components/ProductCard'; // Ensure this path is correct

export default function YouMayAlsoLike() {
  const products = [
    {
      name: "BEAST",
      description: "The Mighty Autonomous Electric Tractor",
      imageSrc: "/assets/products/beast.png", // Replace with your actual image path
      linkTo: "/products/6", // Added link path
    },
    {
      name: "WARRIOR",
      description: "The Electric Self-propelled Boom Sprayer",
      imageSrc: "/assets/products/warrior.png", // Replace with your actual image path
      linkTo: "/products/7", // Added link path
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl md:text-4xl font-semibold text-gray-900 uppercase mb-12 tracking-wide">
          YOU MAY ALSO LIKE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 justify-items-center">
          {products.map((product) => (
            // Wrap the ProductCard with a Link component
            <Link to={product.linkTo} key={product.name} className="block">
              <ProductCard
                name={product.name}
                description={product.description}
                imageSrc={product.imageSrc}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
