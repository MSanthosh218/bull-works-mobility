import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer'; // Assuming you have this component
import CTASection from '../components/CTASection'; // Import CTASection

const BlogDetailPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]); // State for related blogs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the current blog post
        const blogResponse = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!blogResponse.ok) {
          throw new Error(`HTTP error! status: ${blogResponse.status}`);
        }
        const blogData = await blogResponse.json();
        setBlog(blogData);

        // Fetch all blogs to find related ones (excluding the current one)
        const allBlogsResponse = await fetch('http://localhost:5000/api/blogs');
        if (!allBlogsResponse.ok) {
          throw new Error(`HTTP error! status: ${allBlogsResponse.status}`);
        }
        const allBlogsData = await allBlogsResponse.json();

        // Filter out the current blog and select a few others
        const filteredRelatedBlogs = allBlogsData
          .filter(b => b.id !== blogData.id)
          .sort(() => 0.5 - Math.random()) // Randomize the order
          .slice(0, 2); // Get up to 2 related blogs as per screenshot

        setRelatedBlogs(filteredRelatedBlogs);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [id]); // Re-fetch blog data and related blogs when the ID in the URL changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <p className="text-xl text-gray-700">Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 p-6">
        <p className="text-xl text-red-700">Error loading blog: {error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <p className="text-xl text-gray-700">Blog post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* Blog Header (Title and Meta Info) */}
      <header className="py-12 px-6 sm:px-8 lg:px-12 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
          {blog.title}
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-700">
          {blog.slug ? blog.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Bullwork Mobility Blog'}
        </p>
        <p className="text-md text-gray-500 mt-2">
          Posted on {new Date(blog.publication_date).toLocaleDateString()} | {blog.reading_time || '3 min'} reading time
        </p>
      </header>

      {/* Main Blog Image */}
      <div className="mb-8 flex justify-center px-6 sm:px-8 lg:px-12">
        <img
          src={blog.image_url || 'https://placehold.co/1200x600/4F46E5/FFFFFF?text=Blog+Hero'}
          alt={blog.title}
          className="w-full max-w-5xl h-auto rounded-lg shadow-md object-cover" // w-full and max-w-5xl ensures it takes 80% of larger screens
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/1200x600/cccccc/000000?text=Blog+Image`;
          }}
        />
      </div>

      {/* Main Blog Content Area */}
      <main className="max-w-6xl text-xl mx-auto py-12 px-6 sm:px-8 lg:px-12 bg-white shadow-lg rounded-lg">
        {blog.video_url && (
          <div className="mb-8">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={blog.video_url.includes('youtube.com') ? blog.video_url.replace("watch?v=", "embed/") : blog.video_url}
                title={`${blog.title} Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Changed prose-lg to prose-xl for larger font size */}
        <div className="prose prose-xl max-w-none text-gray-700">
          {/* Render blog content. Using dangerouslySetInnerHTML if content contains HTML/rich text */}
          {/* IMPORTANT: To see the content broken into paragraphs, your 'blog.content' in the PostgreSQL database
              MUST be stored with HTML <p> tags around each paragraph.
              For example, instead of "Paragraph 1. Paragraph 2.", it should be "<p>Paragraph 1.</p><p>Paragraph 2.</p>".
              The 'prose' class from Tailwind Typography will then automatically add correct spacing between these <p> tags. */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-600 mr-2">Tags:</span>
            {blog.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
        )}
      </main>

      {/* You May Also Like Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-200 py-12 px-6 sm:px-8 lg:px-12 mt-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">YOU MAY ALSO LIKE</h2>
          </div>
          {/* Updated grid to flexbox for consistent alignment with blog grid, and applied width classes */}
          <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
            {relatedBlogs.map(relatedBlog => (
              <Link to={`/blogs/${relatedBlog.id}`} key={relatedBlog.id} className="block w-[180px] md:w-[300px]">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col h-full">
                  <img
                    src={relatedBlog.image_url || `https://placehold.co/400x250/4F46E5/FFFFFF?text=Related+Blog`}
                    alt={relatedBlog.title}
                    className="h-[250px] w-full object-cover" // Set fixed height for image
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/400x250/4F46E5/FFFFFF?text=Related+Blog`;
                    }}
                  />
                  <div className="p-5 flex flex-col flex-grow"> {/* Adjusted padding and ensured flex-grow */}
                    <h3 className="font-semibold text-lg mb-2">{relatedBlog.title}</h3>
                    {/* Replicated the "Read more" button style from BlogGrid */}
                    <span className="mt-auto border border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white rounded-full px-4 py-2 text-sm text-center transition">Read more</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
