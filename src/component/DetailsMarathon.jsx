import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { Helmet } from "react-helmet";

const DetailsMarathon = () => {
  const { id } = useParams();
  const [singleMarathonData, setSingleMarathonData] = useState({});
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const {
    title,
    _id,
    location,
    distance,
    description,
    image,
    startRegDate,
    endRegDate,
    marathonStartDate,
    totalRegistration,
  } = singleMarathonData;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/marathon/${id}`)
      .then((res) => setSingleMarathonData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const marathonDate = new Date(marathonStartDate);
      const now = new Date();
      const difference = marathonDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [marathonStartDate]);

  // Check registration status
  useEffect(() => {
    const now = new Date();
    const startDate = new Date(startRegDate);
    const endDate = new Date(endRegDate);
    setIsRegistrationOpen(now >= startDate && now <= endDate);
  }, [startRegDate, endRegDate]);

  return (
    <div className="min-h-screen my-10 py-8 px-4">
      <Helmet>
        <title>Marathon Details</title>
      </Helmet>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="relative  rounded-2xl shadow-2xl  w-full flex-1">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full  "
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> */}
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between min-h-[420px] max-h-[520px] p-4 space-y-3">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">
                {description}
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="p-2 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Location</p>
                    <p className="font-semibold text-gray-900 text-sm">{location}</p>
                  </div>
                </div>
              </div>
              <div className="p-2 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Distance</p>
                    <p className="font-semibold text-gray-900 text-sm">{distance}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Count */}
            <div className="p-2 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-orange-600 font-bold text-lg">👥</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">Total Registrations:</span>
                <span className="text-base font-bold text-gray-900 ml-1">{totalRegistration}</span>
              </div>
            </div>

            {/* Important Dates */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">Important Dates</h3>
              <div className="space-y-1">
                <div className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
                  <span className="text-gray-600 font-medium text-xs">Registration Start</span>
                  <span className="font-semibold text-gray-900 text-xs">
                    {startRegDate && format(new Date(startRegDate), "dd MMM yyyy, hh:mm a")}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
                  <span className="text-gray-600 font-medium text-xs">Registration End</span>
                  <span className="font-semibold text-gray-900 text-xs">
                    {endRegDate && format(new Date(endRegDate), "dd MMM yyyy, hh:mm a")}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 border border-blue-200 rounded-lg bg-blue-50">
                  <span className="text-blue-700 font-medium text-xs">Marathon Start</span>
                  <span className="font-bold text-blue-900 text-xs">
                    {marathonStartDate && format(new Date(marathonStartDate), "dd MMM yyyy, hh:mm a")}
                  </span>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="p-2 border border-gray-200 rounded-lg">
              <h3 className="text-base font-bold text-gray-900 mb-2 text-center">
                Time Left to Marathon
              </h3>
              <div className="grid grid-cols-4 gap-1">
                <div className="text-center p-2 border border-gray-200 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 mb-1">{timeLeft.days}</div>
                  <div className="text-xs text-gray-500 font-medium">Days</div>
                </div>
                <div className="text-center p-2 border border-gray-200 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 mb-1">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-500 font-medium">Hours</div>
                </div>
                <div className="text-center p-2 border border-gray-200 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 mb-1">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-500 font-medium">Minutes</div>
                </div>
                <div className="text-center p-2 border border-gray-200 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 mb-1">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-500 font-medium">Seconds</div>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="pt-2">
              {isRegistrationOpen ? (
                <Link
                  to={`/marathonRegister/${id}`}
                  className="block w-full py-2 px-4 rounded-lg font-bold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 text-sm"
                >
                  Register Now →
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-2 px-4 rounded-lg font-bold text-center border-2 border-gray-300 text-gray-400 cursor-not-allowed text-sm"
                >
                  Registration Closed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsMarathon;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router";
// import { format } from "date-fns";
// import { Helmet } from "react-helmet";
// // import { format, parseISO, isBefore, isAfter } from 'date-fns';

// const DetailsMarathon = () => {
//   const { id } = useParams();
//   // const navigate = useNavigate();
//   const [singleMarathonData, setSingleMarathonData] = useState({});
//   // console.log(singleMarathonData)
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

//   const {
//     title,
//     _id,
//     location,
//     distance,
//     description,
//     image,
//     startRegDate,
//     endRegDate,
//     marathonStartDate,
//     totalRegistration,
//   } = singleMarathonData;

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_SERVER}/marathon/${id}`)
//       .then((res) => setSingleMarathonData(res.data))
//       .catch((err) => console.error("Error fetching data:", err));
//   }, [id]);

//   // Countdown timer
//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const marathonDate = new Date(marathonStartDate);
//       const now = new Date();
//       const difference = marathonDate - now;

//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60),
//         });
//       }
//     };

//     calculateTimeLeft();
//     const timer = setInterval(calculateTimeLeft, 1000);
//     return () => clearInterval(timer);
//   }, [marathonStartDate]);

//   // Check registration status
//   useEffect(() => {
//     const now = new Date();
//     const startDate = new Date(startRegDate);
//     const endDate = new Date(endRegDate);
//     setIsRegistrationOpen(now >= startDate && now <= endDate);
//   }, [startRegDate, endRegDate]);

//   return (
//     <div className="max-w-2xl flex mx-auto p-4">
//       <Helmet>
//         <title>Marathon Details</title>
//       </Helmet>
//       {/* Title and Description */}
//      <div>
//          <img src={image} alt="" />
//      </div>

//       <div>
//         <h1 className="text-2xl font-bold mb-2">{title}</h1>
//       <p className="text-gray-600 mb-4">{description}</p>

//       {/* Location and Distance */}
//       <div className="flex items-center mb-2">
//         <span className="text-gray-700">{location}</span>
//       </div>
//       <div className="flex items-center mb-6">
//         <span className="font-medium">Distance: {distance}</span>
//       </div>

//       {/* Registration Count */}
//       <div className="border-t border-b border-gray-200 py-4 my-4">
//         <p className="font-semibold">
//           Total Registrations Count: {totalRegistration}
//         </p>
//       </div>

//       {/* Dates Section */}
//       <div className="space-y-2 mb-6">
//         <div>
//           <span className="text-sm text-gray-500">Registration Start: </span>
//           <span>
//             {startRegDate &&
//               format(new Date(startRegDate), "dd MMM yyyy, hh:mm a")}
//           </span>
//         </div>
//         <div>
//           <span className="text-sm text-gray-500">Registration End: </span>
//           <span>
//             {endRegDate && format(new Date(endRegDate), "dd MMM yyyy, hh:mm a")}
//           </span>
//         </div>
//         <div>
//           <span className="text-sm text-gray-500">Marathon Start: </span>
//           <span>
//             {marathonStartDate &&
//               format(new Date(marathonStartDate), "dd MMM yyyy, hh:mm a")}
//           </span>
//         </div>
//       </div>

//       {/* Countdown Timer */}
//       <div className="bg-white dark:bg-gray-900   p-4 rounded-lg mb-6">
//         <h3 className="font-medium mb-3">Time left to start Marathon</h3>
//         <div className="flex justify-between">
//           <div className="text-center">
//             <div className="text-xl font-bold">{timeLeft.days}</div>
//             <div className="text-sm">Days</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xl font-bold">{timeLeft.hours}</div>
//             <div className="text-sm">Hours</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xl font-bold">{timeLeft.minutes}</div>
//             <div className="text-sm">Minutes</div>
//           </div>
//           <div className="text-center">
//             <div className="text-xl font-bold">{timeLeft.seconds}</div>
//             <div className="text-sm">Seconds</div>
//           </div>
//         </div>
//       </div>

//       {/* Register Button */}
//       {isRegistrationOpen ? (
//         <Link
//           to={`/marathonRegister/${id}`}
//           className="block w-full py-2 px-4 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 text-center"
//         >
//           Register Now
//         </Link>
//       ) : (
//         <button
//           disabled
//           className="w-full py-2 px-4 rounded-md font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
//         >
//           Registration Closed
//         </button>
//       )}
//       </div>


//     </div>
//   );
// };

// export default DetailsMarathon;
