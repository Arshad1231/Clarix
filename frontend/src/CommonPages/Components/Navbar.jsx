import React from "react";
import { Link } from "react-router-dom";
import { FaRegLightbulb } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Navbar = () => {

  const scrollToAbout = () => {
    const section = document.getElementById("about");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full border-b border-gray-200">
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo (Left) */}
        <div>
          <p className="text-3xl font-logo flex items-center gap-1">
            Clarix
            <FaRegLightbulb />
          </p>
        </div>

        {/* Center Quote */}
        <p className="absolute left-1/2 -translate-x-1/2 text-md italic underline text-gray-500 font-quote whitespace-nowrap">
          Clear doubts. Learn together.
        </p>

        {/* Links (Right) */}
        <div className="flex items-center gap-3 text-sm font-navbar">

          {/* About Icon */}
          <button
            onClick={scrollToAbout}
            title="About Clarix"
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <AiOutlineInfoCircle size={20} />
          </button>

          <Link
            to="/explore"
            className="px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Explore
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
          >
            Sign Up
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
