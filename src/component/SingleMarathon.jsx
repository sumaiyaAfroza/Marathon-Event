import React from 'react'
import { Link } from 'react-router'
import { MapPin, Calendar, Clock, ArrowRight, Eye, Users, Award, FileText } from 'lucide-react'

const SingleMarathon = ({ data }) => {
  // Destructure data
  const { _id, image, location, title, endRegDate, startRegDate, description } = data

  return (
    <div className="group">
  <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
        {/* Marathon Image with Overlay */}
        <div className="h-48 overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0"></div>
        </div>

        {/* Marathon Content */}
  <div className="p-5 flex flex-col  space-y-2  items-start text-left">
          {/* Title */}
          <h3 className="text-2xl font-bold dark:text-white text-gray-800 mb-3">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center dark:text-white text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            <span className="font-medium text-xl">{location}</span>
          </div>

          {/* Description */}
          <div className="text-gray-600 dark:text-gray-300 text-lg opacity-80 flex items-center">
            <div className="flex justify-between items-center gap-3">
              <FileText className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span className='line-clamp-2'>{description}</span>
            </div>
          </div>

          {/* Registration Dates */}
          <div className="mb-2">
            <div className="flex items-center dark:text-white text-[10px] text-gray-500 dark:bg-gray-600 p-3 rounded-lg justify-center">
              <div className="flex items-center mr-2">
                <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                {/* <Clock className="w-4 h-4 text-orange-500" /> */}
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="text-lg text-gray-700 dark:text-gray-100">Registration:</span>
                <span className="font-semibold darl:text-gray-100 text-sm">
                  {new Date(startRegDate).toLocaleDateString()} - {new Date(endRegDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          {/* <div className="flex items-center justify-between mb-2 text-xs text-gray-500 dark:text-gray-400"> */}
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-green-500" />
              <span>Join thousands</span>
            </div>
            
          {/* </div> */}

          {/* Button */}
          <Link to={`/marathon/${_id}`} className='mt-6' >
            <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
              <span>See More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleMarathon

