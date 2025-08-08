import React from 'react';

const MarathonEvent = ()=> {
  return (
    <div className=" text-white min-h-screen border p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700">Mysterious Night Run</h1>
          <p className="text-gray-700 mt-2">June 22, 2025 - 10:15 AM</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 p-10 dark:bg-gray-700 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">Event Details</h2>
            <p className="text-gray-300">A night marathon where participants will follow mysterious clues. The race begins at 10:15 AM amidst a foggy path.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4"> First Checkpoint </h2>
            <p className="text-gray-300">At the start, you will receive a map. Find a mysterious box at the first checkpoint!</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">Rewards</h2>
            <p className="text-gray-300">The first winner will receive a gold medal and a mysterious key.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">Additional Information</h2>
            <p className="text-gray-300">All participants must follow safety rules before the race begins.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarathonEvent;