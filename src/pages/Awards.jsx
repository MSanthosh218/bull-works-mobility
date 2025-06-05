import React, { useState, useEffect } from "react";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

// Assuming these are the types for the fetched data
// You might want to define these in a separate types file if your project uses TypeScript
// interface AwardItem {
//   id: number;
//   image_url: string;
// }

// interface MediaItem {
//   id: number;
//   url: string;
// }

const Awards = () => {
  // State for Awards data
  const [awards, setAwards] = useState([]);
  const [awardsLoading, setAwardsLoading] = useState(true);
  const [awardsError, setAwardsError] = useState(null);

  // State for Media data
  const [media, setMedia] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [mediaError, setMediaError] = useState(null);

  // Fetch Awards data
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/awards');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAwards(data);
      } catch (err) {
        setAwardsError(err.message);
      } finally {
        setAwardsLoading(false);
      }
    };

    fetchAwards();
  }, []);

  // Fetch Media data
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/media');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMedia(data);
      } catch (err) {
        setMediaError(err.message);
      } finally {
        setMediaLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16 px-6">
        {/* Awards Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-6">
            Awards
          </h2>
          {awardsLoading ? (
            <p className="text-xl text-gray-700">Loading Awards...</p>
          ) : awardsError ? (
            <p className="text-xl text-red-700">Error loading awards: {awardsError}</p>
          ) : awards.length === 0 ? (
            <div className="text-center text-gray-600 text-xl mt-8 p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
              No award images found. Please add some from the backend!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {awards.map((award) => (
                <div key={award.id} className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={award.image_url} // Use image_url from fetched data
                    alt={`Award ${award.id}`}
                    className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105 p-4 bg-white" // Added p-4 bg-white for better visibility of logos
                    onError={(e) => {
                      e.currentTarget.onerror = null; // Prevent infinite loop
                      e.currentTarget.src = `https://placehold.co/256x256/cccccc/000000?text=Award+Image`; // Placeholder on error
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Media Section */}
        <div className="text-center mt-20 mb-12">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-6">
            Media
          </h2>
          {mediaLoading ? (
            <p className="text-xl text-gray-700">Loading Media...</p>
          ) : mediaError ? (
            <p className="text-xl text-red-700">Error loading media: {mediaError}</p>
          ) : media.length === 0 ? (
            <div className="text-center text-gray-600 text-xl mt-8 p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto">
              No media images found. Please add some from the backend!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {media.map((mediaItem) => (
                <div key={mediaItem.id} className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={mediaItem.url} // Use url from fetched data
                    alt={`Media ${mediaItem.id}`}
                    className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105 p-4 bg-white" // Added p-4 bg-white for better visibility of logos
                    onError={(e) => {
                      e.currentTarget.onerror = null; // Prevent infinite loop
                      e.currentTarget.src = `https://placehold.co/256x256/cccccc/000000?text=Media+Image`; // Placeholder on error
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <CTASection />
      <Footer />
    </>
  );
};

export default Awards;
