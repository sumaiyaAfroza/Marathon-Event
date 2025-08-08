import React from 'react'
import { Link } from 'react-router'
import Loading from './Loading'

const SingleMarathon = ({data}) => {
    console.log(data)
    const {_id,image,location,title,endRegDate,startRegDate} = data
      
  return (
    <div>
      
        <div className="bg-white dark:bg-gray-700  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Marathon Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt=''
          className="w-full h-full object-cover"
        />
      </div>

      {/* Marathon Content */}
      <div className="p-4 ">
        <h3 className="text-xl font-bold dark:text-white text-gray-800 mb-2">{title}</h3>
        
        <div className="flex dark:text-white items-center text-gray-600 mb-2">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center dark:text-white text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Registration: {new Date(startRegDate).toLocaleDateString()} - {new Date(endRegDate).toLocaleDateString()}</span>
          </div>
        </div>

        <Link to={`/marathon/${_id}`}
          
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
        >
          See Details
        </Link>
      </div>
    </div>
      
    </div>
  )
}

export default SingleMarathon
