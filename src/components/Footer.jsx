import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-20 pt-10 pb-6">
      {/* Logo Row */}
      <div className="flex justify-center md:justify-start mb-10">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="Bullwork Mobility" className="h-8" />
          <img src="/assets/brand-text.png" alt="Bullwork Mobility" className="h-4 md:h-5" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Social & Subscribe */}
        <div className="w-full md:w-1/3">
          <p className="font-semibold mb-4">Connect with us on</p>
          <div className="flex gap-3 mb-6">
            <img src="/assets/footer/facebook.webp" alt="Facebook" className="w-8 h-8" />
            <img src="/assets/footer/youtube.webp" alt="YouTube" className="w-8 h-8" />
            <img src="/assets/footer/instagram.webp" alt="Instagram" className="w-8 h-8" />
            <img src="/assets/footer/twitter.webp" alt="X" className="w-8 h-8" />
            <img src="/assets/footer/linkedin.webp" alt="LinkedIn" className="w-8 h-8" />
          </div>

          <p className="font-semibold mb-2">Subscribe to receive the latest updates!</p>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-transparent border border-white text-white px-3 py-2 rounded w-full sm:w-auto"
            />
            <button className="bg-white text-purple-700 font-bold px-4 py-2 rounded">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/3">
          <h3 className="font-semibold text-lg mb-4">CONTACT US</h3>
          <p>For sales : <a href="mailto:sales@bullworkmobility.com" className="hover:underline">sales@bullworkmobility.com</a></p>
          <p>For information : <a href="mailto:info@bullworkmobility.com" className="hover:underline">info@bullworkmobility.com</a></p>
          <p>Call us at : 8123596969, 8123296969</p>
          <div className="mt-4">
            <h4 className="font-semibold mb-1">Visit Us:</h4>
            <p>
              Survey No.26/1 and 27/2, Mallarabanavadi Village,<br />
              Kunigal Bypass Rd, Nelamangala Town, Karnataka<br />
              562123
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      {/* Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 className="font-semibold mb-2">COMPANY</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Blogs</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">PRODUCTS</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Electric Tractor</a></li>
            <li><a href="#" className="hover:underline">GLX E-Loader</a></li>
            <li><a href="#" className="hover:underline">Vamana</a></li>
            <li><a href="#" className="hover:underline">Warrior</a></li>
            <li><a href="#" className="hover:underline">0X-1</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">TECHNOLOGY</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Autonomy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between text-sm text-gray-400 text-center sm:text-left gap-2 sm:gap-0">
        <p>© Copyrights. All rights reserved</p>
        <a href="#" className="hover:underline">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
