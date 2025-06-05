import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; // Please ensure this file exists at src/components/Footer.jsx
import CTASection from '../components/CTASection'; // Please ensure this file exists at src/components/CTASection.jsx

// Get the backend URL from environment variables.
// Use 'import.meta.env.VITE_BACKEND_URL' if you are using Vite.
// Use 'process.env.REACT_APP_BACKEND_URL' if you are using Create React App.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

const OrderPage = () => {
  const [formType, setFormType] = useState('individual'); // 'individual' or 'company'
  const [products, setProducts] = useState([]); // To store product names for the dropdown
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    country: '',
    state: '', // Changed to text input
    city: '',
    pincode: '',
    aadharNumber: '', // Only for individual
    companyName: '', // Only for company
    panNumber: '',    // For both, but optional
    selectedProduct: '',
    quantity: 1, // Default quantity for order
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', 'submitting'
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Ensure BACKEND_URL is defined before attempting to fetch
    if (!BACKEND_URL) {
      console.error("BACKEND_URL is not defined. Check your .env file and environment variables.");
      setProductError("Backend URL not configured. Cannot load products.");
      setLoadingProducts(false);
      return;
    }

    // Fetch products to populate the dropdown
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/products`); // Replaced localhost
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, selectedProduct: data[0].name })); // Set default selected product
        }
      } catch (err) {
        setProductError(err.message);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setSubmitMessage('');

    // Ensure BACKEND_URL is defined before attempting to fetch
    if (!BACKEND_URL) {
      console.error("BACKEND_URL is not defined. Check your .env file and environment variables.");
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit order: Backend URL not configured.');
      return;
    }

    // Construct payload based on form type
    const payload = {
      request_type: 'order', // This form is specifically for orders
      product_name: formData.selectedProduct,
      full_name: formData.fullName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      address: formData.address,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      message: formData.message,
      quantity: formData.quantity,
      // Conditional fields
      company_name: formType === 'company' ? formData.companyName : null,
      aadhar_number: formType === 'individual' ? formData.aadharNumber : null,
      pan_number: formData.panNumber || null, // PAN is optional for both
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/requests`, { // Replaced localhost
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      setSubmitStatus('success');
      setSubmitMessage('Your order request has been submitted successfully!');
      // Optionally reset form
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        aadharNumber: '',
        companyName: '',
        panNumber: '',
        selectedProduct: products.length > 0 ? products[0].name : '',
        message: '',
        quantity: 1,
      });
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage(`Failed to submit order: ${err.message}`);
      console.error('Order submission error:', err);
    }
  };

  const countries = ["India", "USA", "Canada"]; // Example list

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Header Section */}
      <header className="bg-purple-700 text-white py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">ORDER FORM</h1>
        <p className="mt-2 text-lg">Fill in the below details to order products</p>
      </header>

      {/* Main content area with padding to prevent overlap */}
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 mt-8 md:mt-16 relative z-10">
        {/* Individual/Company Toggle */}
        <div className="flex justify-center mb-8">
          <button
            type="button" // Important for buttons inside forms not to submit
            className={`px-8 py-3 rounded-l-lg font-semibold transition-colors duration-200 ${
              formType === 'individual' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFormType('individual')}
          >
            Individual
          </button>
          <button
            type="button" // Important for buttons inside forms not to submit
            className={`px-8 py-3 rounded-r-lg font-semibold transition-colors duration-200 ${
              formType === 'company' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFormType('company')}
          >
            Company
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Name*</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">Phone Number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 bg-white"
            >
              <option value="">Select country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* State (now a text input) */}
          <div>
            <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter State"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter City"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Pincode */}
          <div>
            <label htmlFor="pincode" className="block text-gray-700 font-semibold mb-2">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter Pincode"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Conditional Fields based on formType */}
          {formType === 'individual' && (
            <div>
              <label htmlFor="aadharNumber" className="block text-gray-700 font-semibold mb-2">Aadhar Number</label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                placeholder="Enter Aadhar Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          )}

          {formType === 'company' && (
            <div>
              <label htmlFor="companyName" className="block text-gray-700 font-semibold mb-2">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter Company Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required={formType === 'company'} // Company name is required for company type
              />
            </div>
          )}

          {/* PAN Number (Optional for both) */}
          <div>
            <label htmlFor="panNumber" className="block text-gray-700 font-semibold mb-2">Pan Number</label>
            <input
              type="text"
              id="panNumber"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter Pan Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Select Product */}
          <div className="md:col-span-2">
            <label htmlFor="selectedProduct" className="block text-gray-700 font-semibold mb-2">Select product</label>
            {loadingProducts ? (
              <p className="text-gray-600">Loading products...</p>
            ) : productError ? (
              <p className="text-red-600">Error loading products: {productError}</p>
            ) : products.length === 0 ? (
              <p className="text-gray-600">No products available.</p>
            ) : (
              <select
                id="selectedProduct"
                name="selectedProduct"
                value={formData.selectedProduct}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 bg-white"
                required
              >
                {products.map(product => (
                  <option key={product.id} value={product.name}>{product.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* Quantity */}
          <div className="md:col-span-2">
            <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-2">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="1"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter Message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-l from-[#57115E] to-[#A100B1] text-white font-semibold px-8 py-3 rounded-md uppercase tracking-wide shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitStatus === 'submitting'}
            >
              {submitStatus === 'submitting' ? 'SUBMITTING...' : 'BOOK PRODUCT'}
            </button>
          </div>

          {/* Submission Status Message */}
          {submitStatus && (
            <div className={`md:col-span-2 text-center mt-4 p-3 rounded-md ${
              submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {submitMessage}
            </div>
          )}

          {/* Link to Demo Page */}
          <div className="md:col-span-2 text-center mt-8">
            <p className="text-gray-700">Looking for a Product Demo?{' '}
              <Link to="/demo" className="text-purple-700 font-medium hover:underline">Book a Demo</Link>
            </p>
          </div>
        </form>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
};

export default OrderPage;
