import React from 'react';
import PropTypes from 'prop-types';

const BlogCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
          Read more →
        </a>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BlogCard;
