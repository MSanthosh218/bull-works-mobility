import React, { useState, useEffect } from 'react';

// Get the backend URL from environment variables.
// Use 'import.meta.env.VITE_BACKEND_URL' if you are using Vite.
// Use 'process.env.REACT_APP_BACKEND_URL' if you are using Create React App.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;

const QnaSection = () => {
  const [qnaList, setQnaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State to manage which Q&A items are expanded in the accordion
  const [expandedItems, setExpandedItems] = useState({});

  // Function to toggle the expanded state of an individual Q&A item
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id] // Toggle the boolean value for the given ID
    }));
  };

  // useEffect hook to fetch Q&A data from the backend when the component mounts
  useEffect(() => {
    // Ensure BACKEND_URL is defined before attempting to fetch
    if (!BACKEND_URL) {
      console.error("BACKEND_URL is not defined. Check your .env file and environment variables.");
      setError("Backend URL not configured. Cannot load Q&A.");
      setLoading(false);
      return;
    }

    const fetchQna = async () => {
      try {
        // Fetch data from your backend API, using the dynamic BACKEND_URL
        const response = await fetch(`${BACKEND_URL}/api/qna`); // Replaced localhost

        // Check if the network request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Update the state with the fetched Q&A list
        setQnaList(data);
      } catch (err) {
        // Catch and set any errors that occur during the fetch operation
        setError(err.message);
      } finally {
        // Set loading to false once the fetch operation is complete (whether success or error)
        setLoading(false);
      }
    };

    fetchQna(); // Call the fetch function
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Conditional rendering based on loading and error states
  if (loading) {
    return (
      <section className="bg-gray-100 py-12 px-6 md:px-16 flex items-center justify-center min-h-[400px]">
        <p className="text-xl text-gray-700">Loading Frequently Asked Questions...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-red-100 py-12 px-6 md:px-16 flex items-center justify-center min-h-[400px]">
        <p className="text-xl text-red-700">Error loading Q&A: {error}</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-12 px-6 md:px-16 font-sans antialiased">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-900">
          MORE FREQUENTLY ASKED QUESTIONS
        </h1>
      </div>

      {/* Main Q&A Content Section */}
      <div className="max-w-4xl mx-auto">
        {qnaList.length === 0 ? (
          // Message displayed if no Q&A entries are found
          <div className="text-center text-gray-600 text-xl mt-8 p-6 bg-white rounded-lg shadow-md">
            No Q&A entries found. Please add some from the backend!
          </div>
        ) : (
          // Render the list of Q&A items as an accordion
          <div className="space-y-1">
            {qnaList.map((item) => (
              <div key={item.id} className="bg-gray-100  rounded-lg shadow-md overflow-hidden">
                {/* Question Header - Clickable to toggle answer visibility */}
                <button
                  className="w-full text-left p-5 flex justify-between items-center text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={expandedItems[item.id] ? "true" : "false"}
                >
                  <h2 className="text-lg font-semibold flex-grow">
                    {item.question}
                  </h2>
                  {/* Accordion Icon */}
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      expandedItems[item.id] ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {/* Answer Content - Conditionally rendered based on expanded state */}
                {expandedItems[item.id] && (
                  <div className="p-5 border-t border-gray-200">
                    <p className="text-violet-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default QnaSection;
