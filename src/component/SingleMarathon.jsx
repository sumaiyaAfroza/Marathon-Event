import React from "react";
import { Link } from "react-router";
import {
  MapPin,
  Calendar,
  ArrowRight,
  Users,
  FileText,
} from "lucide-react";

const SingleMarathon = ({ data }) => {
  const { _id, image, location, title,description } = data;

  return (
    <div className="group transition-transform duration-300 hover:-translate-y-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700">
        
        {/* Image */}
        <div className="relative h-56">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow space-y-2">
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-1">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          {/* Description */}
          <div className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
            <FileText className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
            <p className="line-clamp-2">{description}</p>
          </div>

          {/* Dates */}
          {/* <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-1 text-blue-500" />
              <span className="font-medium">Registration:</span>
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {new Date(startRegDate).toLocaleDateString()} - {new Date(endRegDate).toLocaleDateString()}
            </span>
          </div> */}

          {/* Join Info */}
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <Users className="w-4 h-4 text-green-500" />
            <span>Join thousands</span>
          </div>

          {/* Action Button */}
          <Link to={`/marathon/${_id}`} className="mt-auto">
            <button className="w-full btn-sm py-2 px-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg flex items-center justify-center gap-2">
              <span>See More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default SingleMarathon;
