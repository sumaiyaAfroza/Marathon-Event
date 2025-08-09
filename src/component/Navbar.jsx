import React, { useContext, useState } from "react";
import { NavLink } from "react-router"; 
import { AuthContext } from "../Context/AuthProvider";
import { ThemeContext } from "../Context/Theme";
import logo from "../assets/lg.jpg";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // 🔥 Active link style helper
  const activeClass =
    "text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-4";
  const inactiveClass = "hover:text-indigo-500";

  return (
    <nav className="bg-blue-100 dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
          </NavLink>
        </div>

        {/* Center: Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-800 dark:text-gray-200 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/marathons"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Marathon
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right: Theme & Auth */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-black dark:text-white px-2 py-1 rounded">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border"
                title={user.displayName}
              />
              <button
                onClick={logOut}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          )}
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="bg-green-700 text-white rounded p-2 hover:bg-green-800">
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 text-gray-800 dark:text-gray-200 font-medium">
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                Home
              </NavLink>
            </li>
            <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              About
            </NavLink>
          </li>
            <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
             Blog
            </NavLink>
          </li>
            <li>
              <NavLink
                to="/marathons"
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                Marathon
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={toggleMenu}
                  className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <button onClick={toggleTheme} className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800">
                {theme === "light" ? "🌙 Dark" : "🌞 Light"}
              </button>
            </li>

            {!user ? (
              <li>
                <NavLink
                  to="/login"
                  onClick={toggleMenu}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition block text-center"
                >
                  Login / Register
                </NavLink>
              </li>
            ) : (
              <li className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border"
                />
                <button
                  onClick={() => {
                    logOut();
                    toggleMenu();
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;