import React from 'react'
import { Link } from 'react-router'

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* Animated Running Track */}
        <div className="relative mb-8">
          <div className="w-full h-2 bg-red-500 rounded-full mb-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-pulse"></div>
            <div className="absolute top-1/2 left-0 w-4 h-4 bg-yellow-400 rounded-full transform -translate-y-1/2 animate-bounce"></div>
          </div>
          
          {/* Animated Runner Icon */}
          <div className="relative">
            <div className="text-8xl animate-bounce">🏃‍♂️</div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl">💨</div>
          </div>
        </div>

        {/* Error Code with Animation */}
        <div className="mb-6">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 animate-pulse mb-2">
            404
          </h1>
          <div className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2 animate-fade-in">
            Oops! Marathon Event Not Found
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 animate-slide-up">
          <p className="text-gray-600 text-lg md:text-xl mb-4 leading-relaxed">
            Looks like this marathon event has already finished the race! 
          </p>
          <p className="text-gray-500 text-base md:text-lg">
            The event you're looking for doesn't exist or may have been moved to a different route.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
          <Link to="/">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
              🏠 Back to Home
            </button>
          </Link>
          
          <Link to="/marathons">
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
              🏃‍♀️ View All Events
            </button>
          </Link>
        </div>

        {/* Marathon Stats Animation */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="animate-count-up">
            <div className="text-2xl font-bold text-blue-600">42.2</div>
            <div className="text-sm text-gray-500">KM Distance</div>
          </div>
          <div className="animate-count-up" style={{animationDelay: '0.2s'}}>
            <div className="text-2xl font-bold text-green-600">404</div>
            <div className="text-sm text-gray-500">Error Code</div>
          </div>
          <div className="animate-count-up" style={{animationDelay: '0.4s'}}>
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-sm text-gray-500">Events Found</div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-8 p-4 bg-white/50 rounded-lg backdrop-blur-sm animate-fade-in">
          <p className="text-gray-600 italic">
            "Every marathon begins with a single step... let's help you find the right path!"
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes count-up {
          from { 
            opacity: 0; 
            transform: scale(0.5); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-in-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.3s both;
        }
        
        .animate-count-up {
          animation: count-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  )
}

export default Error 