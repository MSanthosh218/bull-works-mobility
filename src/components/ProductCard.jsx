import React from 'react';

const ProductCard = ({ name, description, imageSrc }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-1 md:p-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-xl text-gray-800 tracking-tight uppercase">{name}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;