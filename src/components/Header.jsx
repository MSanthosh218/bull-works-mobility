import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);
  const toggleProductDropdown = () => setProductDropdownOpen(!productDropdownOpen);
  const toggleMobileProduct = () => setMobileProductOpen(!mobileProductOpen);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.product-dropdown')) {
        setProductDropdownOpen(false);
      }
    };
    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);

  const products = [
    { name: 'BEAST', image: '/assets/products/beast.png', link: '/products/6' },
    { name: 'WARRIOR', image: '/assets/products/warrior.png', link: '/products/7' },
    { name: 'GLX', image: '/assets/products/glx.png', link: '/products/8' },
    { name: 'VAMANA', image: '/assets/products/vamana.png', link: '/products/9' },
    { name: 'OX-1', image: '/assets/products/ox1.png', link: '/products/10' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#141414] shadow-md">
      <nav className="flex items-center justify-between px-4 py-2 text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/assets/logo.png" alt="Bullworks Logo" className="h-9 border p-0.5 rounded object-cover border-white w-8" />
          <img
            src="/assets/brand-text.png"
            alt="Bullworks Mobility"
            className="h-4 w-[200px] sm:w-[300px] hidden sm:block"
          />
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={toggleNav}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white rounded"></span>
          <span className="w-6 h-0.5 bg-white rounded"></span>
          <span className="w-6 h-0.5 bg-white rounded"></span>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 ml-auto text-sm uppercase font-semibold tracking-wide">
          <li>
            <Link to="/" className="hover:text-purple-400 transition">Home</Link>
          </li>

          {/* Product Dropdown */}
          <li className="relative product-dropdown">
            <button
              onClick={toggleProductDropdown}
              className="flex items-center gap-1 hover:text-purple-400"
            >
              PRODUCTS
              <img
                src={`/assets/${productDropdownOpen ? 'up' : 'down'}-arrow.png`}
                alt="Toggle Dropdown"
                className="w-3 h-3"
              />
            </button>
            {productDropdownOpen && (
              <div
                className="fixed top-[60px] left-0 right-0 bg-white text-black p-6 shadow-xl
                           grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 z-50
                           h-[45vh] overflow-y-auto"
              >
                {products.map(({ name, image, link }) => (
                  <Link
                    key={name}
                    to={link}
                    className="flex flex-col items-center hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
                    onClick={() => setProductDropdownOpen(false)}
                  >
                    <div className="w-full h-full">
                      <img
                        src={image}
                        alt={`${name} scooter`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="mt-2 font-bold text-sm">{name}</span>
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest">
                      Explore
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link to="/technology" className="hover:text-purple-400 transition">Technology</Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-purple-400 transition">About Us</Link>
          </li>
          <li>
            <Link to="/careers" className="hover:text-purple-400 transition">Careers</Link>
          </li>
          <li>
            <Link
              to="/order"
              className="px-4 py-2 bg-gradient-to-l from-[#57115E] to-[#A100B1] rounded text-white text-sm tracking-wider uppercase shadow hover:scale-105 transition-transform"
            >
              Order
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      {navOpen && (
        <div className="md:hidden bg-white text-black px-3 py-2 flex flex-col gap-2.5 text-xs uppercase tracking-wider shadow-md">
          <Link to="/" className="hover:text-purple-600" onClick={toggleNav}>Home</Link>

          {/* Mobile Product Dropdown */}
          <div>
            <button
              onClick={toggleMobileProduct}
              className="flex items-center justify-between w-full font-semibold text-left"
            >
              Products
              <img
                src={`/assets/${mobileProductOpen ? 'up' : 'down'}-arrow.png`}
                alt="Toggle"
                className="w-3 h-3"
              />
            </button>
            {mobileProductOpen && (
              <div className="flex flex-col gap-2 mt-2 pl-2">
                {products.map(({ name, link }) => (
                  <Link
                    key={name}
                    to={link}
                    className="hover:underline"
                    onClick={() => {
                      toggleNav();
                      setMobileProductOpen(false);
                    }}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/technology" className="hover:text-purple-600" onClick={toggleNav}>Technology</Link>
          <Link to="/about-us" className="hover:text-purple-600" onClick={toggleNav}>About Us</Link>
          <Link to="/careers" className="hover:text-purple-600" onClick={toggleNav}>Careers</Link>
          <Link
            to="/order"
            onClick={toggleNav}
            className="mt-2 px-4 py-2 bg-gradient-to-l from-[#57115E] to-[#A100B1] text-white rounded text-center uppercase text-sm tracking-wider shadow hover:scale-105 transition-transform"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
