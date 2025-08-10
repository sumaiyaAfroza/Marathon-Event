// components/MarathonEvent.jsx

import React from 'react';
import { MapPin, Trophy, Info, Clock, Moon, Key, Gift } from 'lucide-react';

const MarathonEvent = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <header className="mb-12 animate-fade-in">
          <div className="flex justify-center items-center mb-4">
            <Moon className="w-12 h-12 text-blue-300 mr-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-blue-700 dark:text-white">Mysterious Night Run</h2>
            <Moon className="w-12 h-12 text-blue-300 ml-4 animate-pulse" />
          </div>
          <div className="flex justify-center items-center text-gray-600 dark:text-gray-300">
            <Clock className="w-5 h-5 mr-2" />
            <p className="text-lg">June 22, 2025 - 10:15 AM</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Details Card */}
          <div className="group p-6 border rounded-lg shadow bg-blue-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4 group-hover:rotate-12 transition-transform duration-300">
                <Info className="text-4xl text-blue-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Event Details</h3>
            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
              A night marathon where participants will follow mysterious clues. The race begins at 10:15 AM amidst a foggy path filled with surprises and challenges.
            </p>
            <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* First Checkpoint Card */}
          <div className="group p-6 border rounded-lg shadow bg-blue-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4 group-hover:rotate-12 transition-transform duration-300">
                <MapPin className="text-4xl text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">First Checkpoint</h3>
            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
              At the start, you will receive a detailed map with hidden clues. Find the mysterious box at the first checkpoint to unlock your next adventure!
            </p>
            <div className="mt-4 h-1 bg-gradient-to-r from-green-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Rewards Card */}
          <div className="group p-6 border rounded-lg shadow bg-blue-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4 group-hover:rotate-12 transition-transform duration-300">
                <Trophy className="text-4xl text-purple-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Rewards</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                <Gift className="w-5 h-5 mr-3 text-purple-500" />
                <span>Gold medal for the first winner</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                <Key className="w-5 h-5 mr-3 text-purple-500" />
                <span>A mysterious key to unlock secrets</span>
              </div>
            </div>
            <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Safety Guidelines Card */}
          <div className="group p-6 border rounded-lg shadow bg-blue-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4 group-hover:rotate-12 transition-transform duration-300">
                <Info className="text-4xl text-blue-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Safety Guidelines</h3>
            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
              All participants must follow comprehensive safety rules before the race begins. Safety briefing mandatory for all runners.
            </p>
            <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center mt-12">
          <button className="group relative px-8 py-4 bg-blue-600 rounded-full font-semibold text-lg text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 overflow-hidden">
            <span className="relative z-10">Join the Mystery</span>
            <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default MarathonEvent;