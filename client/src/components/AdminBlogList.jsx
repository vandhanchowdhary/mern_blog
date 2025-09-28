import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs, deleteBlog, getBlogBySlug } from "../utils/blogService";

function AdminBlogList({ refresh, onEdit }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogs(1, 50); // fetch first 50 blogs
      setBlogs(data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      fetchBlogs(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  // Updated: fetch full blog on edit
  const handleEditClick = async (blog) => {
    try {
      const fullBlog = await getBlogBySlug(blog.slug); // fetch full content
      onEdit(fullBlog);
    } catch (err) {
      console.error("Failed to fetch blog for editing:", err);
      alert("Failed to load blog content for editing");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Existing Blogs</h2>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border p-2 min-h-25 rounded flex justify-between items-center"
            >
              <div className="px-3 hover:scale-102 transition-all duration-200">
                <Link to={`/blog/${blog.slug}`} rel="noopener noreferrer">
                  <h3 className="text-lg font-bold">{blog.title}</h3>
                  <p className="text-gray-600 text-sm">{blog.excerpt}</p>
                  <p className="text-gray-400 text-xs">
                    Published: {new Date(blog.publishedAt).toLocaleString()}
                  </p>
                </Link>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(blog)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBlogList;
