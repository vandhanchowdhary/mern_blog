import React from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

const BlogCard = ({ blog }) => {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4">
      {/* Cover Image */}
      {blog.images && blog.images.length > 0 && (
        <img
          src={blog.images[0].url}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      )}

      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

      {/* Excerpt */}
      <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {blog.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Date + Read More */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{formatDate(blog.publishedAt)}</span>
        <Link
          to={`/blog/${blog.slug}`}
          className="bg-gray-200 py-1 px-2 rounded-lg text-blue-600 font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
