import { useState } from "react";
import AdminBlogForm from "../components/AdminBlogForm";
import AdminBlogList from "../components/AdminBlogList";
import { adminLogin } from "../utils/blogService";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [blogToEdit, setBlogToEdit] = useState(null); // track editing blog

  // Handle admin login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await adminLogin({ email, password });
      setIsLoggedIn(true);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleSuccess = () => {
    setRefresh(!refresh);
    setBlogToEdit(null); // reset after save or exit edit mode
  };

  if (!isLoggedIn) {
    // Show login form
    return (
      <div className="max-w-sm mx-auto mt-20 p-6 border border-gray-200 rounded-2xl shadow-2xl bg-white/60 backdrop-blur-md hover:scale-105 hover:shadow-2xl transition transform">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition transform"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // Show dashboard (form + list) after login
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Blog Form */}
      <AdminBlogForm
        existingBlog={blogToEdit}
        onSuccess={handleSuccess}
        onCancel={() => setBlogToEdit(null)}
      />

      <hr className="my-6" />

      {/* Blog List */}
      <AdminBlogList
        refresh={refresh}
        onEdit={(blog) => {
          setBlogToEdit(blog);
        }}
      />
    </div>
  );
}

export default Admin;
