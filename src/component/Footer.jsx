import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/lg.jpg'; 

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-10 pb-6 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              MarathonPro
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            MarathonPro is your all-in-one platform to register, track, and celebrate marathons.
            Join the race, achieve your goals, and connect with passionate runners around the globe.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-500">🏠 Home</Link></li>
            <li><Link to="/marathons" className="hover:text-indigo-500">🏃‍♂️ Marathon</Link></li>
            <li><Link to="/dashboard" className="hover:text-indigo-500">📊 Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-indigo-500">🔐 Login</Link></li>
            <li><Link to="/register" className="hover:text-indigo-500">📝 Register</Link></li>
          </ul>
        </div>

        {/* Newsletter or Copyright */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Stay Motivated</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Train. Run. Repeat. Your marathon journey starts here.
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">
            © {new Date().getFullYear()} MarathonPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
