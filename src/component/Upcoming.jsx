import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const Upcoming = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/marathons`);
        const allMarathons = res.data;

        // Filter upcoming marathons (future date only)
        const today = new Date();
        const upcoming = allMarathons.filter(
          (item) => new Date(item.marathonStartDate) >= today
        );

        setMarathons(upcoming);
      } catch (error) {
        console.error("Failed to fetch upcoming marathons", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarathons();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Upcoming Marathons</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : marathons.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming marathons found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {marathons.map((marathon) => (
            <div
              key={marathon._id}
              className="bg-white shadow-md rounded-lg  dark:bg-gray-700 overflow-hidden hover:shadow-lg transition"
            >
              <div className=" relative">
                <img
                  src={marathon.image}
                  alt={marathon.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-0 left-0 bg-blue-700 text-white px-3 py-1 rounded-br-lg text-sm">
                  {format(new Date(marathon.marathonStartDate), "MMM d, yyyy")}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl  dark:text-white font-semibold mb-2 text-blue-700">
                  {marathon.title}
                </h3>
                <p className="text-gray-600  dark:text-white mb-1">📍 {marathon.location}</p>
                <p className="text-sm  dark:text-white text-gray-500">
                  Registration: {format(new Date(marathon.startRegDate), "MMM d")} –{" "}
                  {format(new Date(marathon.endRegDate), "MMM d")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upcoming;







// import React from "react";

// // import { format } from "date-fns";
// import { useLoaderData } from "react-router";

// const Upcoming = () => {
//     const loaderData = useLoaderData()
//     console.log(loaderData)

// //   const { _id, title, location, image, startRegDate, endRegDate } = marathon;

//   return (
//     <div>
//         <h1>uppppppppp</h1>
//     </div>
//     // <div>
//     //   <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-400">
//     //     <div className="relative group">
//     //       <img
//     //         src={image}
//     //         alt={title}
//     //         className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
//     //       />
//     //       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
//     //       {/* Overlay that appears on hover */}
//     //       <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
//     //         <span className="text-4xl font-bold text-yellow-400 mb-4">UPCOMING</span>
//     //         <div className="text-white text-center space-y-2">
//     //           <p className="text-xl font-semibold">{title}</p>
//     //           <p className="flex items-center justify-center">
//     //             <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
//     //               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//     //             </svg>
//     //             {location}
//     //           </p>
//     //           <p className="flex items-center justify-center">
//     //             <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
//     //               <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//     //             </svg>
//     //             {format(new Date(startRegDate), "MMM d, yyyy")} –{" "}
//     //             {format(new Date(endRegDate), "MMM d, yyyy")}
//     //           </p>
//     //         </div>
//     //       </div>
//     //     </div>
        
        
//     //   </div>
//     // </div>
//   );
// };

// export default Upcoming;