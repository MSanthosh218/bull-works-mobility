import React from 'react';

const GreenerBharath = () => {
  return (
    <div className="w-full h-full">
      {/* Image Section */}
      <div id="vc" className="w-full flex justify-center">
        <img
          className="w-full h-full rounded-lg shadow-md object-cover"
          src="/assets/images/greener_bharath.webp"
          alt="Bullworkmobility | Bullwork Beast autonomous electric tractor"
        />
      </div>

      {/* Margin placeholders — can be used for spacing or future content */}
      <div className="my-1">
        <div className="h-1" />
      </div>
      <div className="my-1">
        <div className="h-1" />
      </div>
    </div>
  );
};

export default GreenerBharath;
