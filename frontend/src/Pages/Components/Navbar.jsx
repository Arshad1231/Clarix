import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContent";
import { userLogOutCURD } from "../../CURD/UserCURD";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, isLoggedIn, setisLoggedIn } = useAuth();

  const path = location.pathname;

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await userLogOutCURD();
    } finally {
      setUser(null);
      setisLoggedIn(false);
      navigate("/login");
    }
  };

  /* ---------------- NAV LINKS ---------------- */
  const navLinks = [
    { label: "Home", path: "/content/home" },
    { label: "Ask", path: "/content/ask" },
    { label: "Questions", path: "/content/history" },
    { label: "Friends", path: "/content/friends" },
    { label: "Chats", path: "/content/chat" },
  ];

  /* ---------------- ACTIVE LINK TEXT STYLE ---------------- */
  const navCss = (route) =>
    path.startsWith(route)
      ? "text-sm font-navbar text-white transition"
      : "text-sm font-navbar text-black transition";

  /* ---------------- PILL ANIMATION STATE ---------------- */
  const navRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  /* ---------------- MOVE PILL ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    if (!navRef.current) return;

    const activeIndex = navLinks.findIndex((link) =>
      path.startsWith(link.path)
    );

    if (activeIndex === -1) return;

    const activeEl = navRef.current.children[activeIndex + 1]; 
    // +1 because pill is the first child

    if (!activeEl) return;

    setPillStyle({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    });
  }, [path]);

  return (
    <nav className="w-full flex justify-center mt-4">
      {/* OVAL NAVBAR */}
      <div className="h-12 px-8 bg-white rounded-full shadow-xl flex items-center gap-6">

        {/* LINKS */}
        {isLoggedIn && (
          <div
            ref={navRef}
            className="relative flex items-center gap-4"
          >
            {/* MOVING BACKGROUND */}
            <div
              className="absolute h-8 bg-red-500 rounded-full transition-all duration-300 ease-out "
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
              }}
            />

            {/* NAV ITEMS */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative z-10 px-3 py-1 ${navCss(link.path)}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* DIVIDER */}
        {isLoggedIn && <div className="h-5 w-px bg-gray-300 mx-2" />}

        {/* ACTION */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-sm font-navbar text-red-600 hover:text-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-sm font-navbar text-gray-600 hover:text-black transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
