import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { createBlog, updateBlog } from "../utils/blogService";

function AdminBlogForm({ existingBlog, onSuccess, onCancel }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]); // { file?, url, public_id? }
  const [imagesToRemove, setImagesToRemove] = useState([]); // only public_ids
  const [loading, setLoading] = useState(false);

  // Sync form when switching between edit/new
  useEffect(() => {
    if (existingBlog) {
      // Populate form with existing blog data safely
      setTitle(existingBlog.title || "");
      setExcerpt(existingBlog.excerpt || "");
      setContent(existingBlog.content ?? ""); // use nullish coalescing
      setTags(existingBlog.tags?.join(",") || "");
      setImages(
        (existingBlog.images || []).map((img) => ({
          url: img.url,
          public_id: img.public_id,
        }))
      );
      setImagesToRemove([]);
    } else {
      resetForm();
    }
  }, [existingBlog]);

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setTags("");
    setImages([]);
    setImagesToRemove([]);
  };

  // Handle create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Always send current state OR existingBlog fallback
      formData.append("title", title || existingBlog?.title || "");
      formData.append("excerpt", excerpt || existingBlog?.excerpt || "");
      formData.append("content", content || existingBlog?.content || "");
      formData.append("tags", tags || existingBlog?.tags?.join(",") || "");

      // Append new images only
      images.forEach((img) => {
        if (img.file) formData.append("images", img.file);
      });

      // Append public_ids of images to remove
      if (imagesToRemove.length) {
        formData.append("imagesToRemove", JSON.stringify(imagesToRemove));
      }

      if (existingBlog) {
        await updateBlog(existingBlog._id, formData);
        alert("✅ Blog updated!");
      } else {
        await createBlog(formData);
        alert("✅ Blog created!");
      }

      // Reset form after successful submission
      resetForm();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("❌ Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      key={existingBlog?._id || "new"}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">
        {existingBlog ? "Edit Blog" : "Create New Blog"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        placeholder="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        placeholder="Content (Markdown)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 rounded h-40"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <div>
        <label className="block font-medium mb-2">Images</label>
        <ImageUpload
          images={images}
          setImages={setImages}
          imagesToRemove={imagesToRemove}
          setImagesToRemove={setImagesToRemove}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : existingBlog ? "Update Blog" : "Create Blog"}
        </button>

        {existingBlog && (
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => {
              resetForm();
              onCancel?.();
            }}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AdminBlogForm;
