import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL || "https://mern-blog-jj4u.onrender.com";

// --- Public APIs ---
export const getAllBlogs = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/api/blogs?page=${page}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return { posts: [], page: 1, pages: 1, total: 0 };
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const res = await axios.get(`${API_BASE}/api/blogs/${slug}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching blog ${slug}:`, err);
    return null;
  }
};

// --- Admin APIs ---

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No admin token found");
  return { Authorization: `Bearer ${token}` };
};

// Login
export const adminLogin = async ({ email, password }) => {
  const res = await axios.post(`${API_BASE}/api/admin/login`, {
    email,
    password,
  });
  localStorage.setItem("adminToken", res.data.token);
  return res.data;
};

// Create blog (FormData)
export const createBlog = async (blogData) => {
  if (!(blogData instanceof FormData)) {
    throw new Error("createBlog expects a FormData instance");
  }
  const res = await axios.post(`${API_BASE}/api/admin/blogs`, blogData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Update blog (FormData + imagesToRemove)
export const updateBlog = async (id, blogData) => {
  if (!(blogData instanceof FormData)) {
    throw new Error("updateBlog expects a FormData instance");
  }
  const res = await axios.put(`${API_BASE}/api/admin/blogs/${id}`, blogData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Delete blog
export const deleteBlog = async (id) => {
  const res = await axios.delete(`${API_BASE}/api/admin/blogs/${id}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};