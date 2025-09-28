import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-2 shadow-lg backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo (left) */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 hover:scale-105 transition-transform"
        >
          MERN Blog
        </Link>

        {/* Home (center) */}
        <Link
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium hover:text-blue-400 transition-colors"
        >
          Home
        </Link>

        {/* Admin (right) */}
        <Link
          to="/admin"
          className="text-lg font-medium hover:text-indigo-400 transition-colors"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
