import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <p className="text-lg font-semibold font-logo">
          Clarix
        </p>
        <p className="text-xs text-gray-500">Clear doubts. Learn together.</p>  


        {/* Links */}
        <div className="flex gap-2 text-sm">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md transition-all duration-300 
                       hover:bg-red-500 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/explore"
            className="px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Explore
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md transition-all duration-300 
                       hover:bg-red-500 hover:text-white"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
