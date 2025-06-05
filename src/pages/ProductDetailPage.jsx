import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('features');

  // Refs for each section to enable smooth scrolling
  const featuresRef = useRef(null);
  const videoRef = useRef(null);
  const tcoRef = useRef(null);
  const specificationsRef = useRef(null);

  // Map tab names to their respective refs
  const sectionRefs = {
    features: featuresRef,
    video: videoRef,
    tco: tcoRef,
    specifications: specificationsRef,
  };

  const [annualHours, setAnnualHours] = useState(1000);
  const [dieselCostPerHour, setDieselCostPerHour] = useState(400);
  const [electricityCostPerHour, setElectricityCostPerHour] = useState(100);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);

        const allProductsResponse = await fetch('http://localhost:5000/api/products');
        if (!allProductsResponse.ok) {
          throw new Error(`HTTP error! status: ${allProductsResponse.status}`);
        }
        const allProductsData = await allProductsResponse.json();

        const filteredRelatedProducts = allProductsData
          .filter(p => p && p.id !== data.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        setRelatedProducts(filteredRelatedProducts);
        console.log('Fetched Related Products:', filteredRelatedProducts);

      } catch (err) {
        setError(err.message);
        console.error('Error fetching product or related products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Function to handle tab click and smooth scroll
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    // Use setTimeout to ensure the content is rendered before scrolling
    setTimeout(() => {
      const ref = sectionRefs[tabName];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Small delay to allow React to render the new active tab content
  };

  const calculateSavings = () => {
    const dieselAnnualCost = dieselCostPerHour * annualHours;
    const electricityAnnualCost = electricityCostPerHour * annualHours;
    const annualSavings = dieselAnnualCost - electricityAnnualCost;
    const sevenYearSavings = annualSavings * 7;
    return { annualSavings, sevenYearSavings, dieselAnnualCost, electricityAnnualCost };
  };

  const { annualSavings, sevenYearSavings, dieselAnnualCost, electricityAnnualCost } = calculateSavings();


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-xl text-red-700">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Product not found.</p>
      </div>
    );
  }

  const renderSpecifications = (specs) => {
    if (!specs) return null;

    return (
      <div className="space-y-8">
        {Object.keys(specs).map(key => {
          const sectionTitle = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
          const items = specs[key];

          if (!Array.isArray(items) || items.length === 0) return null;

          return (
            <div key={key} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{sectionTitle}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.parameter || item.feature}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${product.main_image_url || 'https://placehold.co/1920x1080/4F46E5/FFFFFF?text=Product+Hero'}` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative text-center p-6">
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-4 uppercase">
            {product.name}
          </h1>
          <p className="text-xl md:text-2xl font-semibold tracking-wide">
            {product.tagline}
          </p>
        </div>
      </section>

      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {['features', 'video', 'tco', 'specifications'].map((tab) => (
                <button
                  key={tab}
                  className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-colors duration-200
                    ${activeTab === tab
                      ? 'border-purple-700 text-purple-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center">
              <Link to="/order">
                <button className="bg-gradient-to-l from-[#57115E] to-[#A100B1] text-white font-semibold px-6 py-2 rounded-md uppercase tracking-wide shadow-lg hover:shadow-xl transition-shadow duration-300">
                  Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
        {activeTab === 'features' && (
          <div id="features-section" ref={featuresRef} className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Features of {product.name}</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.features_text || product.description || 'No detailed features available for this product.'}
            </p>
            {product.image_urls && product.image_urls.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.image_urls.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${product.name} Feature ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/400x300/cccccc/000000?text=Feature+Image`;
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'video' && (
          <div id="video-section" ref={videoRef} className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Video</h2>
            {product.video_url ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={product.video_url.includes('youtube.com') ? product.video_url.replace("watch?v=", "embed/") : product.video_url}
                  title={`${product.name} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-600 text-lg">No video available for this product.</p>
            )}
          </div>
        )}

        {activeTab === 'tco' && (
          <div id="tco-section" ref={tcoRef} className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">CALCULATE YOUR DIESEL SAVINGS</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6 text-center">
              {product.name} can reduce your diesel cost. Our easy-to-use calculator shows you just how much you'll keep in your pocket by going electric. Join the movement for a cleaner, greener future and start saving big.
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
                <div className="bg-purple-700 text-white p-4 rounded-lg shadow-md w-full max-w-xs text-center">
                  <p className="text-sm font-medium">Savings for 1 year</p>
                  <p className="text-3xl font-bold">₹{annualSavings.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-purple-700 text-white p-4 rounded-lg shadow-md w-full max-w-xs text-center">
                  <p className="text-sm font-medium">Savings for 7 years</p>
                  <p className="text-3xl font-bold">₹{sevenYearSavings.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Cost of Ownership</h3>
                <div
                  className="flex items-end h-48 w-full max-w-xs bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                  <div
                    className="flex-grow bg-red-500 rounded-b-lg flex flex-col justify-end items-center text-white text-xs font-semibold p-1"
                    style={{ height: `${(dieselAnnualCost / Math.max(dieselAnnualCost, electricityAnnualCost)) * 100}%` }}
                  >
                    <span className="mb-1">₹{dieselAnnualCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div
                    className="flex-grow bg-green-500 rounded-b-lg flex flex-col justify-end items-center text-white text-xs font-semibold p-1"
                    style={{ height: `${(electricityCostPerHour / Math.max(dieselCostPerHour, electricityCostPerHour)) * 100}%` }}
                  >
                    <span className="mb-1">₹{electricityCostPerHour.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex justify-between w-full max-w-xs mt-2 text-sm font-medium text-gray-700">
                  <span>Diesel Cost</span>
                  <span>Electricity Cost</span>
                </div>
              </div>
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner">
              <label htmlFor="annualHours" className="block text-lg font-semibold text-gray-800 mb-4 text-center">
                How many hours does the {product.name} run in a year? ({annualHours} hours)
              </label>
              <input
                type="range"
                id="annualHours"
                min="500"
                max="3000"
                step="500"
                value={annualHours}
                onChange={(e) => setAnnualHours(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-700"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
                <span>500</span>
                <span>1000</span>
                <span>1500</span>
                <span>2000</span>
                <span>2500</span>
                <span>3000</span>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">*Conditions apply</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                <div>
                    <label htmlFor="dieselCost" className="block text-sm font-medium text-gray-700 mb-2">
                        Diesel Cost per Hour (₹)
                    </label>
                    <input
                        type="number"
                        id="dieselCost"
                        value={dieselCostPerHour}
                        onChange={(e) => setDieselCostPerHour(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
                        min="0"
                    />
                </div>
                <div>
                    <label htmlFor="electricityCost" className="block text-sm font-medium text-gray-700 mb-2">
                        Electricity Cost per Hour (₹)
                    </label>
                    <input
                        type="number"
                        id="electricityCost"
                        value={electricityCostPerHour}
                        onChange={(e) => setElectricityCostPerHour(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
                        min="0"
                    />
                </div>
            </div>

          </div>
        )}

        {activeTab === 'specifications' && (
          <div id="specifications-section" ref={specificationsRef} className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Specifications</h2>
            {product.specifications ? (
              renderSpecifications(product.specifications)
            ) : (
              <p className="text-gray-600 text-lg">No detailed specifications available for this product.</p>
            )}
          </div>
        )}
      </main>

      {relatedProducts.length > 0 ? (
        <section className="bg-gray-200 py-12 px-6 sm:px-8 lg:px-12 mt-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">YOU MAY ALSO LIKE</h2>
          </div>
          {/* Adjusted to match blog grid styling for width and height */}
          <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
            {relatedProducts.map(relatedProduct => (
              <Link to={`/products/${relatedProduct.id}`} key={relatedProduct.id} className="block w-[180px] md:w-[300px]">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col h-full">
                  <img
                    src={relatedProduct.main_image_url || `https://placehold.co/400x250/4F46E5/FFFFFF?text=${relatedProduct.name}`}
                    alt={relatedProduct.name}
                    className="w-full h-[250px] object-cover" // Set fixed height for image
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/400x250/4F46E5/FFFFFF?text=${relatedProduct.name}`;
                    }}
                  />
                  <div className="p-5 flex flex-col flex-grow"> {/* Adjusted padding and ensured flex-grow */}
                    <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">{relatedProduct.tagline}</p> {/* Added flex-grow */}
                    <Link to={`/products/${relatedProduct.id}`} className="mt-auto border border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white rounded-full px-4 py-2 text-sm text-center transition">
                      Read more
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center text-gray-600 text-xl mt-8 p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
          No related products to display.
        </div>
      )}

      <CTASection />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
