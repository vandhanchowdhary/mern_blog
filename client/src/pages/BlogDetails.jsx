import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import formatDate from "../utils/formatDate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogBySlug } from "../utils/blogService";

function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const data = await getBlogBySlug(slug);
      setBlog(data);
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  const scrollImages = (direction = "left") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300; // px to scroll
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) return <p className="text-gray-600 mt-6">Loading blog...</p>;
  if (!blog)
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          ← Back to Home
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="my-2 py-2">
        <Link
          to="/"
          className="bg-gray-200 py-1 px-2 rounded-lg text-blue-600 hover:underline font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      {/* Date + Tags */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 flex-wrap">
        <span>{formatDate(blog.publishedAt)}</span>
        <div className="flex gap-2 flex-wrap">
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Images with scroll buttons */}
      {blog.images?.length > 0 && (
        <div className="relative mb-6">
          {/* Left Arrow */}
          <button
            onClick={() => scrollImages("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow"
          >
            ◀
          </button>

          {/* Image Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto py-2 scroll-pl-4 snap-x snap-mandatory scrollbar-hide"
          >
            {blog.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`Blog image ${idx + 1}`}
                className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded flex-shrink-0 snap-center"
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollImages("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow"
          >
            ▶
          </button>
        </div>
      )}

      {/* Markdown Content */}
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>

      {/* Back Button */}
      <div className="my-2 py-2">
        <Link
          to="/"
          className="bg-gray-200 py-1 px-2 rounded-lg text-blue-600 hover:underline font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default BlogDetails;
