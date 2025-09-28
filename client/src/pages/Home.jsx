import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import { getAllBlogs } from "../utils/blogService";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchBlogs = async (pageNum = 1) => {
    setLoading(true);
    const data = await getAllBlogs(pageNum);
    setBlogs(data.posts || []); // <- extract posts
    setPage(data.page || 1);
    setPages(data.pages || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      (blog.tags || []).some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      <SearchBar value={search} onChange={setSearch} />

      {loading ? (
        <p className="text-gray-600 mt-6">Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-gray-600 mt-6">No blog posts found.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {pages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page >= pages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
