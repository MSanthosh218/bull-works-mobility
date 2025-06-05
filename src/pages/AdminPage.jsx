import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';

const AdminPage = () => {
  // State to manage active tab: 'products', 'qna', 'awards', 'media', 'requests', 'applications'
  const [activeTab, setActiveTab] = useState('products');

  // State for data from different tables
  const [products, setProducts] = useState([]);
  const [qnaList, setQnaList] = useState([]);
  const [awards, setAwards] = useState([]);
  const [media, setMedia] = useState([]);
  const [requests, setRequests] = useState([]);
  const [applications, setApplications] = useState([]); // New state for applications

  // State for loading and error messages for each table
  const [loading, setLoading] = useState({}); // { products: true, qna: false, ... }
  const [error, setError] = useState({});   // { products: null, qna: 'Error message', ... }

  // State for forms (add/edit) - product, qna, award, media forms remain
  const [productForm, setProductForm] = useState({ id: null, name: '', description: '', price: '', main_image_url: '', image_urls: [], video_url: '', category: '', features_text: '', tco_savings_text: '', tco_savings_image_url: '', specifications: {}, related_products_ids: [] });
  const [qnaForm, setQnaForm] = useState({ id: null, question: '', answer: '' });
  const [awardForm, setAwardForm] = useState({ id: null, image_url: '' });
  const [mediaForm, setMediaForm] = useState({ id: null, url: '' });

  // State for confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteEndpoint, setDeleteEndpoint] = useState('');

  // Generic fetch function
  const fetchData = async (endpoint, setter, dataKey) => {
    setLoading(prev => ({ ...prev, [dataKey]: true }));
    setError(prev => ({ ...prev, [dataKey]: null }));
    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setter(data);
    } catch (err) {
      setError(prev => ({ ...prev, [dataKey]: err.message }));
      console.error(`Error fetching ${dataKey}:`, err);
    } finally {
      setLoading(prev => ({ ...prev, [dataKey]: false }));
    }
  };

  // Fetch data for the active tab when it changes
  useEffect(() => {
    switch (activeTab) {
      case 'products':
        fetchData('products', setProducts, 'products');
        break;
      case 'qna':
        fetchData('qna', setQnaList, 'qna');
        break;
      case 'awards':
        fetchData('awards', setAwards, 'awards');
        break;
      case 'media':
        fetchData('media', setMedia, 'media');
        break;
      case 'requests':
        fetchData('requests', setRequests, 'requests');
        break;
      case 'applications': // Fetch applications data
        fetchData('apply', setApplications, 'applications');
        break;
      default:
        break;
    }
  }, [activeTab]); // Re-fetch when activeTab changes

  // Handle form input changes
  const handleFormChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter(prev => ({ ...prev, [name]: value }));
  };

  // Generic handle Add/Update (POST/PUT)
  const handleSave = async (endpoint, formData, formSetter, dataSetter, dataKey) => {
    setLoading(prev => ({ ...prev, [dataKey]: true }));
    setError(prev => ({ ...prev, [dataKey]: null }));
    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `http://localhost:5000/api/${endpoint}/${formData.id}` : `http://localhost:5000/api/${endpoint}`;

      // Handle specific data types for productForm (e.g., arrays, objects)
      const payload = { ...formData };
      if (dataKey === 'products') {
        // Convert arrays to JSON strings if your backend expects them as such
        // Example: if image_urls is an array, stringify it
        if (Array.isArray(payload.image_urls)) {
            payload.image_urls = JSON.stringify(payload.image_urls);
        }
        if (Array.isArray(payload.related_products_ids)) {
            payload.related_products_ids = JSON.stringify(payload.related_products_ids);
        }
        if (typeof payload.specifications === 'object' && payload.specifications !== null) {
            payload.specifications = JSON.stringify(payload.specifications);
        }
      }


      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // Use modified payload
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Re-fetch data to update the list
      fetchData(endpoint, dataSetter, dataKey);
      // Reset form
      // Reset productForm with all its fields
      if (dataKey === 'products') {
        formSetter({ id: null, name: '', description: '', price: '', main_image_url: '', image_urls: [], video_url: '', category: '', features_text: '', tco_savings_text: '', tco_savings_image_url: '', specifications: {}, related_products_ids: [] });
      } else {
        formSetter({ id: null, ...Object.fromEntries(Object.keys(formData).map(key => [key, ''])) });
      }

    } catch (err) {
      setError(prev => ({ ...prev, [dataKey]: err.message }));
      console.error(`Error saving ${dataKey}:`, err);
    } finally {
      setLoading(prev => ({ ...prev, [dataKey]: false }));
    }
  };

  // Generic handle Delete
  const handleDelete = async () => {
    if (!itemToDelete || !deleteEndpoint) return;

    const dataKey = deleteEndpoint.split('/')[0]; // e.g., 'products', 'qna', 'apply'
    setLoading(prev => ({ ...prev, [dataKey]: true }));
    setError(prev => ({ ...prev, [dataKey]: null }));

    try {
      const response = await fetch(`http://localhost:5000/api/${deleteEndpoint}/${itemToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Re-fetch data to update the list
      switch (dataKey) {
        case 'products':
          fetchData('products', setProducts, 'products');
          break;
        case 'qna':
          fetchData('qna', setQnaList, 'qna');
          break;
        case 'awards':
          fetchData('awards', setAwards, 'awards');
          break;
        case 'media':
          fetchData('media', setMedia, 'media');
          break;
        case 'requests':
          fetchData('requests', setRequests, 'requests');
          break;
        case 'apply': // Re-fetch applications after deletion
          fetchData('apply', setApplications, 'applications');
          break;
        default:
          break;
      }
      setShowConfirmModal(false);
      setItemToDelete(null);
      setDeleteEndpoint('');
    } catch (err) {
      setError(prev => ({ ...prev, [dataKey]: err.message }));
      console.error(`Error deleting ${dataKey}:`, err);
    } finally {
      setLoading(prev => ({ ...prev, [dataKey]: false }));
    }
  };

  // Confirmation Modal component
  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6">Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  // Render functions for each tab
  const renderProductsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>

      {/* Add/Edit Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{productForm.id ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleSave('products', productForm, setProductForm, setProducts, 'products'); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="productName" name="name" value={productForm.name} onChange={(e) => handleFormChange(e, setProductForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label htmlFor="productTagline" className="block text-sm font-medium text-gray-700">Tagline</label>
            <input type="text" id="productTagline" name="tagline" value={productForm.tagline} onChange={(e) => handleFormChange(e, setProductForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" id="productPrice" name="price" value={productForm.price} onChange={(e) => handleFormChange(e, setProductForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" id="productCategory" name="category" value={productForm.category} onChange={(e) => handleFormChange(e, setProductForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="productDescription" name="description" value={productForm.description} onChange={(e) => handleFormChange(e, setProductForm)} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="productFeaturesText" className="block text-sm font-medium text-gray-700">Features Text</label>
            <textarea id="productFeaturesText" name="features_text" value={productForm.features_text} onChange={(e) => handleFormChange(e, setProductForm)} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="productTcoSavingsText" className="block text-sm font-medium text-gray-700">TCO Savings Text</label>
            <textarea id="productTcoSavingsText" name="tco_savings_text" value={productForm.tco_savings_text} onChange={(e) => handleFormChange(e, setProductForm)} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
          </div>
          <div>
            <label htmlFor="productMainImageUrl" className="block text-sm font-medium text-gray-700">Main Image URL</label>
            <input type="url" id="productMainImageUrl" name="main_image_url" value={productForm.main_image_url} onChange={(e) => handleFormChange(e, setProductForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="productTcoSavingsImageUrl" className="block text-sm font-medium text-gray-700">TCO Savings Image URL</label>
            <input type="url" id="productTcoSavingsImageUrl" name="tco_savings_image_url" value={productForm.tco_savings_image_url} onChange={(e) => handleFormChange(e, setProductForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="productVideoUrl" className="block text-sm font-medium text-gray-700">Video URL</label>
            <input type="url" id="productVideoUrl" name="video_url" value={productForm.video_url} onChange={(e) => handleFormChange(e, setProductForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="productImageUrls" className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
            <input type="text" id="productImageUrls" name="image_urls" value={Array.isArray(productForm.image_urls) ? productForm.image_urls.join(', ') : productForm.image_urls} onChange={(e) => setProductForm(prev => ({ ...prev, image_urls: e.target.value.split(',').map(url => url.trim()) }))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="productRelatedProductsIds" className="block text-sm font-medium text-gray-700">Related Product IDs (comma-separated)</label>
            <input type="text" id="productRelatedProductsIds" name="related_products_ids" value={Array.isArray(productForm.related_products_ids) ? productForm.related_products_ids.join(', ') : productForm.related_products_ids} onChange={(e) => setProductForm(prev => ({ ...prev, related_products_ids: e.target.value.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) }))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="productSpecifications" className="block text-sm font-medium text-gray-700">Specifications (JSON string)</label>
            <textarea id="productSpecifications" name="specifications" value={typeof productForm.specifications === 'object' ? JSON.stringify(productForm.specifications, null, 2) : productForm.specifications} onChange={(e) => {
              try {
                setProductForm(prev => ({ ...prev, specifications: JSON.parse(e.target.value) }));
              } catch (err) {
                // Handle invalid JSON input gracefully
                console.error("Invalid JSON for specifications:", err);
                setProductForm(prev => ({ ...prev, specifications: e.target.value })); // Keep raw string if invalid
              }
            }} rows="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono text-xs"></textarea>
          </div>

          <div className="md:col-span-2 flex justify-end space-x-3">
            <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              {productForm.id ? 'Update Product' : 'Add Product'}
            </button>
            {productForm.id && (
              <button type="button" onClick={() => setProductForm({ id: null, name: '', description: '', price: '', main_image_url: '', image_urls: [], video_url: '', category: '', features_text: '', tco_savings_text: '', tco_savings_image_url: '', specifications: {}, related_products_ids: [] })} className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {loading.products ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : error.products ? (
        <p className="text-center text-red-600">Error: {error.products}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found. Add some above!</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.main_image_url && (
                      <img src={product.main_image_url} alt={product.name} className="h-10 w-10 object-cover rounded-full" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/40x40/cccccc/000000?text=IMG`; }} />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setProductForm({
                        ...product,
                        image_urls: Array.isArray(product.image_urls) ? product.image_urls : [],
                        related_products_ids: Array.isArray(product.related_products_ids) ? product.related_products_ids : [],
                        specifications: typeof product.specifications === 'object' && product.specifications !== null ? product.specifications : {}
                      })}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => { setItemToDelete(product); setDeleteEndpoint('products'); setShowConfirmModal(true); }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderQnaTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Q&A</h2>

      {/* Add/Edit Q&A Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{qnaForm.id ? 'Edit Q&A Item' : 'Add New Q&A Item'}</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleSave('qna', qnaForm, setQnaForm, setQnaList, 'qna'); }} className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="qnaQuestion" className="block text-sm font-medium text-gray-700">Question</label>
            <input type="text" id="qnaQuestion" name="question" value={qnaForm.question} onChange={(e) => handleFormChange(e, setQnaForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label htmlFor="qnaAnswer" className="block text-sm font-medium text-gray-700">Answer</label>
            <textarea id="qnaAnswer" name="answer" value={qnaForm.answer} onChange={(e) => handleFormChange(e, setQnaForm)} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              {qnaForm.id ? 'Update Q&A' : 'Add Q&A'}
            </button>
            {qnaForm.id && (
              <button type="button" onClick={() => setQnaForm({ id: null, question: '', answer: '' })} className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {loading.qna ? (
        <p className="text-center text-gray-600">Loading Q&A...</p>
      ) : error.qna ? (
        <p className="text-center text-red-600">Error: {error.qna}</p>
      ) : qnaList.length === 0 ? (
        <p className="text-center text-gray-600">No Q&A items found. Add some above!</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {qnaList.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{item.question}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{item.answer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setQnaForm(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => { setItemToDelete(item); setDeleteEndpoint('qna'); setShowConfirmModal(true); }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderAwardsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Awards</h2>
      {/* Add/Edit Award Form - Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{awardForm.id ? 'Edit Award' : 'Add New Award'}</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleSave('awards', awardForm, setAwardForm, setAwards, 'awards'); }} className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="awardImageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" id="awardImageUrl" name="image_url" value={awardForm.image_url} onChange={(e) => handleFormChange(e, setAwardForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              {awardForm.id ? 'Update Award' : 'Add Award'}
            </button>
            {awardForm.id && (
              <button type="button" onClick={() => setAwardForm({ id: null, image_url: '' })} className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {loading.awards ? (
        <p className="text-center text-gray-600">Loading awards...</p>
      ) : error.awards ? (
        <p className="text-center text-red-600">Error: {error.awards}</p>
      ) : awards.length === 0 ? (
        <p className="text-center text-gray-600">No awards found. Add some above!</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {awards.map((award) => (
                <tr key={award.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{award.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {award.image_url && (
                      <img src={award.image_url} alt={`Award ${award.id}`} className="h-10 w-10 object-contain rounded-full" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/40x40/cccccc/000000?text=IMG`; }} />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setAwardForm(award)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => { setItemToDelete(award); setDeleteEndpoint('awards'); setShowConfirmModal(true); }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Media</h2>
      {/* Add/Edit Media Form - Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{mediaForm.id ? 'Edit Media Item' : 'Add New Media Item'}</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleSave('media', mediaForm, setMediaForm, setMedia, 'media'); }} className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700">URL</label>
            <input type="url" id="mediaUrl" name="url" value={mediaForm.url} onChange={(e) => handleFormChange(e, setMediaForm)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              {mediaForm.id ? 'Update Media' : 'Add Media'}
            </button>
            {mediaForm.id && (
              <button type="button" onClick={() => setMediaForm({ id: null, url: '' })} className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {loading.media ? (
        <p className="text-center text-gray-600">Loading media...</p>
      ) : error.media ? (
        <p className="text-center text-red-600">Error: {error.media}</p>
      ) : media.length === 0 ? (
        <p className="text-center text-gray-600">No media items found. Add some above!</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {media.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{item.url}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setMediaForm(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => { setItemToDelete(item); setDeleteEndpoint('media'); setShowConfirmModal(true); }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderRequestsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Requests</h2>
      {loading.requests ? (
        <p className="text-center text-gray-600">Loading requests...</p>
      ) : error.requests ? (
        <p className="text-center text-red-600">Error: {error.requests}</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600">No requests found.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.request_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.product_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.phone_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{request.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.company_name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => { setItemToDelete(request); setDeleteEndpoint('requests'); setShowConfirmModal(true); }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderApplicationsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Job Applications</h2>
      {loading.applications ? (
        <p className="text-center text-gray-600">Loading applications...</p>
      ) : error.applications ? (
        <p className="text-center text-red-600">Error: {error.applications}</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-600">No job applications found.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.position || 'N/A'}</td> {/* Display position */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(app.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => { setItemToDelete(app); setDeleteEndpoint('apply'); setShowConfirmModal(true); }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <header className="bg-purple-700 text-white py-12 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">ADMIN DASHBOARD</h1>
        <p className="mt-2 text-lg">Manage your application data</p>
      </header>

      {/* Adjusted mt- values to push content down */}
      <main className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 mt-8 md:mt-16 relative z-10">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto"> {/* Added overflow-x-auto for smaller screens */}
          <button
            className={`py-3 px-6 text-lg font-medium whitespace-nowrap ${activeTab === 'products' ? 'border-b-2 border-purple-600 text-purple-700' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium whitespace-nowrap ${activeTab === 'qna' ? 'border-b-2 border-purple-600 text-purple-700' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('qna')}
          >
            Q&A
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium whitespace-nowrap ${activeTab === 'awards' ? 'border-b-2 border-purple-600 text-purple-700' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('awards')}
          >
            Awards
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium whitespace-nowrap ${activeTab === 'media' ? 'border-b-2 border-purple-600 text-purple-700' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('media')}
          >
            Media
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium whitespace-nowrap ${activeTab === 'requests' ? 'border-b-2 border-purple-600 text-purple-700' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('requests')}
          >
            Requests
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium whitespace-nowrap ${activeTab === 'applications' ? 'border-b-2 border-purple-600 text-purple-700' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'qna' && renderQnaTab()}
          {activeTab === 'awards' && renderAwardsTab()}
          {activeTab === 'media' && renderMediaTab()}
          {activeTab === 'requests' && renderRequestsTab()}
          {activeTab === 'applications' && renderApplicationsTab()} {/* New tab content */}
        </div>
      </main>

      {showConfirmModal && <ConfirmationModal />}

      <CTASection />
      <Footer />
    </div>
  );
};

export default AdminPage;
