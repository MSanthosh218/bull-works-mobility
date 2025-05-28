import React from "react";
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    title: "GLX Bullwork: Smarter, Greener, and Ready to Perform",
    description:
      "Say goodbye to diesel hassles—introducing the GLX Bullwork, India’s first electric skid steer loader.",
    image: "/assets/blogs/blog1.png",
  },
  {
    title: "The Bullwork BEAST: India’s First Electric Autonomous Tractor",
    description:
      "Bullwork BEAST, India’s first electric autonomous ground-up inbuilt electric tractor",
    image: "/assets/blogs/blog2.png",
  },
  {
    title: "How Green Are Electric Vehicles?",
    description:
      "Electric vehicles (EVs) are often hailed as the champions of a greener future, but how green are they really?",
    image: "/assets/blogs/blog3.png",
  },
];

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbfbfd] py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-wide">
        READ OUR BLOGS
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="w-[200px] md:w-[350px] bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-evenly"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-[200px] w-full object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-700 mb-6">{blog.description}</p>
              <button className="mt-auto border border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white rounded-full px-4 py-2 text-sm transition">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/blogs")}
          className="bg-purple-800 text-white px-6 py-3 rounded-md hover:bg-purple-900 transition text-sm font-medium"
        >
          Explore More Blogs
        </button>
      </div>
    </div>
  );
};

export default Blog;
