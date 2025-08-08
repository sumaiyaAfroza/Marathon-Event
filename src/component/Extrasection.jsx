// components/HowItWorks.jsx

import React from "react";
import { FaClipboardCheck, FaCalendarAlt, FaTrophy } from "react-icons/fa";

const ExtraSection = () => {
  return (
    <section className="bg-blue-100 dark:bg-gray-800 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 dark:text-white">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-900 shadow-md">
            <FaClipboardCheck className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">1. Register</h3>
            <p className="text-gray-600 dark:text-gray-300">Choose your marathon, fill out the form, and get ready to run!</p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-900 shadow-md">
            <FaCalendarAlt className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">2. Prepare</h3>
            <p className="text-gray-600 dark:text-gray-300">Get your gear ready, practice, and stay hydrated before the big day.</p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-900 shadow-md">
            <FaTrophy className="text-4xl text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">3. Run & Achieve</h3>
            <p className="text-gray-600 dark:text-gray-300">Join the event, run your best, and collect your medal at the finish line!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
