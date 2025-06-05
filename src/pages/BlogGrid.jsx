import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; // Assuming you have this component
import CTASection from '../components/CTASection';

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch blog data from your backend API
        const response = await fetch('http://localhost:5000/api/blogs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <p className="text-xl text-gray-700">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 p-6">
        <p className="text-xl text-red-700">Error loading blogs: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <header className="text-center py-12 px-6 bg-white shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        READ OUR BLOGS
        </h1>
        {/* <p className="mt-4 text-lg text-gray-600">
          Stay updated with news, innovations, and stories from Bullwork Mobility.
        </p> */}
      </header>

      <main className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
        {blogs.length === 0 ? (
          <div className="text-center text-gray-600 text-xl mt-8 p-6 bg-white rounded-lg shadow-md">
            No blog posts found. Check back soon for new content!
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-16"> {/* Increased gap from gap-10 to gap-16 */}
            {blogs.map((blog) => (
              // The entire blog card is a clickable link to the detail page
              <Link to={`/blogs/${blog.id}`} key={blog.id} className="block w-[180px] md:w-[300px]"> {/* Added fixed width classes */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full"> {/* Added flex flex-col h-full */}
                  {blog.image_url && (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="h-[250px] w-full object-cover" // Changed to fixed height
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placehold.co/400x250/cccccc/000000?text=Blog+Image`; // Placeholder on error
                      }}
                    />
                  )}
                  <div className="p-5 flex flex-col flex-grow"> {/* Adjusted padding and ensured flex-grow */}
                    <h2 className="font-semibold text-lg mb-2">{blog.title}</h2>
                    <p className="text-sm text-gray-500 mb-4">By {blog.author} on {new Date(blog.publication_date).toLocaleDateString()}</p>
                    {/* Display a truncated version of the content */}
                    <p className="text-gray-700 text-sm line-clamp-3 mb-6 flex-grow">{blog.content}</p> {/* Adjusted text size and margin */}
                    {/* "Read More" text is part of the clickable link */}
                    <span className="mt-auto border border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white rounded-full px-4 py-2 text-sm text-center transition">Read more</span> {/* Styled as a button */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <CTASection />
      <Footer />
    </div>
  );
};

export default BlogGrid;
