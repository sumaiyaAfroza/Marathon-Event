// components/WhyJoinMarathon.jsx

import React from "react";
import { FaRunning, FaMapMarkedAlt, FaUsers } from "react-icons/fa";

const Extra = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-7 text-blue-700 dark:text-white">Why Join Our Marathons?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow bg-blue-50 dark:bg-gray-800">
            <FaRunning className="text-4xl mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Health & Fitness</h3>
            <p className="text-gray-600 dark:text-gray-300">Stay active and build endurance while enjoying the spirit of running.</p>
          </div>
          <div className="p-6 border rounded-lg shadow bg-blue-50 dark:bg-gray-800">
            <FaMapMarkedAlt className="text-4xl mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Beautiful Routes</h3>
            <p className="text-gray-600 dark:text-gray-300">Run through scenic routes and explore new places with every marathon.</p>
          </div>
          <div className="p-6 border rounded-lg shadow bg-blue-50 dark:bg-gray-800">
            <FaUsers className="text-4xl mx-auto mb-4 text-purple-500" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Community & Support</h3>
            <p className="text-gray-600 dark:text-gray-300">Be part of a community that encourages and uplifts each other.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Extra;
