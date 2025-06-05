import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Import Link for navigation

// Get the backend URL from environment variables.
// Use 'import.meta.env.VITE_BACKEND_URL' if you are using Vite.
// Use 'process.env.REACT_APP_BACKEND_URL' if you are using Create React App.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null); // 'success', 'error', 'submitting'
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubscribeChange = (e) => {
    setSubscribeEmail(e.target.value);
  };

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    setSubscribeStatus('submitting');
    setSubscribeMessage('');

    // Ensure BACKEND_URL is defined before attempting to fetch
    if (!BACKEND_URL) {
      console.error("BACKEND_URL is not defined. Check your .env file and environment variables.");
      setSubscribeStatus('error');
      setSubscribeMessage('Failed to subscribe: Backend URL not configured.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/subscribe`, { // Replaced localhost
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscribeEmail }),
      });

      // Clone the response so it can be read multiple times if needed
      const clonedResponse = response.clone();

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          // Attempt to parse JSON error from server using the original response
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonParseError) {
          // If original response could not be parsed as JSON, read the cloned response as text for debugging
          const rawText = await clonedResponse.text();
          console.error("Failed to parse error response as JSON, raw text:", rawText);
          errorMessage = `Server responded with non-JSON: ${rawText.substring(0, 100)}...`; // Truncate for message
        }
        throw new Error(errorMessage);
      }

      // If response was OK, parse it as JSON
      await response.json(); // Consume the original response body as JSON (even if it's just an empty object or success message)

      setSubscribeStatus('success');
      setSubscribeMessage('Thank you for subscribing!');
      setSubscribeEmail(''); // Reset form
    } catch (err) {
      setSubscribeStatus('error');
      setSubscribeMessage(`Failed to subscribe: ${err.message}`);
      console.error('Subscription error:', err);
    }
  };

  return (
    <footer className="bg-black text-white px-6 md:px-20 pt-10 pb-6">
      {/* Logo Row */}
      <div className="flex justify-center md:justify-start mb-10">
        <div className="flex items-center gap-3">
          {/* Assuming these image assets are correctly located in your public/assets folder */}
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
            {/* Social media icons - assuming these are static links or will be handled externally */}
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/assets/footer/facebook.webp" alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/assets/footer/youtube.webp" alt="YouTube" className="w-8 h-8" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/assets/footer/instagram.webp" alt="Instagram" className="w-8 h-8" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/assets/footer/twitter.webp" alt="X" className="w-8 h-8" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/assets/footer/linkedin.webp" alt="LinkedIn" className="w-8 h-8" />
            </a>
          </div>

          <p className="font-semibold mb-2">Subscribe to receive the latest updates!</p>
          {/* Subscription Form */}
          <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-transparent border border-white text-white px-3 py-2 rounded w-full sm:w-auto"
              value={subscribeEmail}
              onChange={handleSubscribeChange}
              required
            />
            <button
              type="submit"
              className="bg-white text-purple-700 font-bold px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={subscribeStatus === 'submitting'}
            >
              {subscribeStatus === 'submitting' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </button>
          </form>
          {subscribeStatus && (
            <div className={`mt-2 text-sm text-center sm:text-left ${
              subscribeStatus === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {subscribeMessage}
            </div>
          )}
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
            <li><Link to="/blogs" className="hover:underline">Blogs</Link></li>
            <li><Link to="/about-us" className="hover:underline">About Us</Link></li>
            <li><Link to="/careers" className="hover:underline">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">PRODUCTS</h4>
          <ul className="space-y-1">
            <li><Link to="/products/6" className="hover:underline">Electric Tractor</Link></li>
            <li><Link to="/products/8" className="hover:underline">GLX E-Loader</Link></li>
            <li><Link to="/products/9" className="hover:underline">Vamana</Link></li>
            <li><Link to="/products/7" className="hover:underline">Warrior</Link></li>
            <li><Link to="/products/10" className="hover:underline">0X-1</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">TECHNOLOGY</h4>
          <ul className="space-y-1">
            <li><Link to="/technology" className="hover:underline">Autonomy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between text-sm text-gray-400 text-center sm:text-left gap-2 sm:gap-0">
        <p>© Copyrights. All rights reserved</p>
        <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
