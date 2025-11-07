import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Context/AuthProvider";

const DetailsMarathon = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [singleMarathonData, setSingleMarathonData] = useState({});
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    title,
    location,
    distance,
    description,
    image,
    startRegDate,
    endRegDate,
    marathonStartDate,
    totalRegistration,
  } = singleMarathonData;

  // Fetch single marathon data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/marathon/${id}`)
      .then((res) => setSingleMarathonData(res.data))
      .catch((err) => console.error("Error fetching marathon:", err));
  }, [id]);

  // Fetch all reviews
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
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

  // ✅ Submit Review (fixed Invalid Date)
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first!");
    if (!rating || !comment.trim()) return alert("Add rating & comment!");

    const nowISOString = new Date().toISOString();
    const tempId = `temp-${Date.now()}`;

    const reviewData = {
      _id: tempId, // temporary id for UI
      marathonId: id,
      userName: user?.displayName || "Anonymous",
      email: user?.email,
      userPhoto: user?.photoURL,
      rating,
      comment,
      createdAt: nowISOString, // temp createdAt so no invalid date
    };

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_SERVER}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();

      if (res.ok) {
        if (data && data._id) {
          setReviews((prev) => [data, ...prev.filter((r) => r._id !== tempId)]);
        } else {
          setReviews((prev) => [reviewData, ...prev]);
        }
        setRating(0);
        setComment("");
      } else {
        alert(data.message || "Error submitting review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Review
  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    try {
      setLoading(reviewId);
      const res = await fetch(`${import.meta.env.VITE_SERVER}/reviews/${reviewId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        setReviews((prev) => prev.filter((rev) => rev._id !== reviewId));
      } else {
        alert(data.message || "Failed to delete review.");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Error deleting review");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen my-10 py-8 px-4">
      <Helmet>
        <title>{title || "Marathon Details"}</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="relative rounded-2xl shadow-2xl w-full flex-1">
              <img src={image} alt={title} className="w-full h-full" />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between min-h-[420px] max-h-[520px] p-4 space-y-3">
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
              <div className="p-2 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="font-semibold text-gray-900 text-sm">{location}</p>
              </div>
              <div className="p-2 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500 font-medium">Distance</p>
                <p className="font-semibold text-gray-900 text-sm">{distance}</p>
              </div>
            </div>

            <div className="p-2 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500 font-medium">Total Registrations:</p>
              <p className="text-base font-bold text-gray-900">{totalRegistration}</p>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">Important Dates</h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  🗓 Start:{" "}
                  {startRegDate &&
                    format(new Date(startRegDate), "dd MMM yyyy, hh:mm a")}
                </p>
                <p className="text-sm text-gray-600">
                  ⏰ End:{" "}
                  {endRegDate &&
                    format(new Date(endRegDate), "dd MMM yyyy, hh:mm a")}
                </p>
                <p className="text-sm font-bold text-blue-700">
                  🏁 Marathon:{" "}
                  {marathonStartDate &&
                    format(new Date(marathonStartDate), "dd MMM yyyy, hh:mm a")}
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="p-2 border border-gray-200 rounded-lg">
              <h3 className="text-base font-bold text-gray-900 mb-2 text-center">
                Time Left to Marathon
              </h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
                  const value = Object.values(timeLeft)[i];
                  return (
                    <div key={label} className="p-2 border border-gray-200 rounded-lg">
                      <div className="text-lg font-bold text-gray-900 mb-1">
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{label}</div>
                    </div>
                  );
                })}
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

        {/* ⭐ Reviews Section */}
        <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>

          {/* Average Rating */}
          {reviews.length > 0 && (
            <p className="mb-4 text-yellow-500 font-semibold">
              Average Rating:{" "}
              {(
                reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
              ).toFixed(1)}{" "}
              / 5 ⭐ ({reviews.length} reviews)
            </p>
          )}

          {/* Review Form */}
          <form onSubmit={handleSubmitReview} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded-md p-2 mb-2 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>

          {/* Review List */}
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev._id} className="bg-white border rounded-lg p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.userPhoto || "https://i.ibb.co/2FsfXqM/user.png"}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{rev.userName}</p>
                      <p className="text-yellow-500 text-sm">
                        {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{rev.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {rev.createdAt
                      ? new Date(rev.createdAt).toLocaleString()
                      : "Just now"}
                  </p>

                  {/* 🗑️ Delete Button */}
                  <button
                    onClick={() => handleDelete(rev._id)}
                    className="bg-red-100 text-red-600 hover:bg-red-200 right-3 px-2 py-1 text-xs font-semibold rounded mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsMarathon;
















// import axios from "axios";
// import React, { useEffect, useState, useContext } from "react";
// import { Link, useParams } from "react-router";
// import { format } from "date-fns";
// import { Helmet } from "react-helmet";
// import { AuthContext } from "../Context/AuthProvider"; // ✅ if you use context

// const DetailsMarathon = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [singleMarathonData, setSingleMarathonData] = useState({});
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);

   
  
  

//   const {
//     title,
//     location,
//     distance,
//     description,
//     image,
//     startRegDate,
//     endRegDate,
//     marathonStartDate,
//     totalRegistration,
//   } = singleMarathonData;

//   // Fetch single marathon data
//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_SERVER}/marathon/${id}`)
//       .then((res) => setSingleMarathonData(res.data))
//       .catch((err) => console.error("Error fetching data:", err));
//   }, [id]);

//   // Fetch all reviews for this marathon
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_SERVER}/reviews/${id}`)
//       .then((res) => res.json())
//       .then((data) => setReviews(data))
//       .catch((err) => console.error("Error fetching reviews:", err));
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

//   // Submit Review
//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("Please login first!");
//     if (!rating || !comment.trim()) return alert("Add rating & comment!");

//     const reviewData = {
//       marathonId: id,
//       userName: user?.displayName || "Anonymous",
//       email: user?.email,
//       userPhoto: user?.photoURL,
//       rating,
//       comment,
//     };

//     try {
//       setLoading(true);
//       const res = await fetch(`${import.meta.env.VITE_SERVER}/reviews`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(reviewData),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setReviews([reviewData, ...reviews]);
//         setRating(0);
//         setComment("");
//       } else {
//         alert(data.message || "Error submitting review");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };



//   // delete
//    const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this review?");
//     if (!confirmDelete) return;

//     try {
//       setLoading(id);
//       const res = await fetch(`http://localhost:3000/reviews/${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
//       if (res.ok) {
//         // remove from UI instantly
//         setReviews((prev) => prev.filter((rev) => rev._id !== id));
//       } else {
//         alert(data.message || "Failed to delete review.");
//       }
//     } catch (err) {
//       console.error("Error deleting review:", err);
//       alert("Error deleting review");
//     } finally {
//       setLoading(null);
//     }
//   };

//   return (
//     <div className="min-h-screen my-10 py-8 px-4">
//       <Helmet>
//         <title>{title || "Marathon Details"}</title>
//       </Helmet>

//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col lg:flex-row gap-4 items-stretch">
//           {/* Image Section */}
//           <div className="w-full lg:w-1/2 flex flex-col">
//             <div className="relative rounded-2xl shadow-2xl w-full flex-1">
//               <img src={image} alt={title} className="w-full h-full" />
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="w-full lg:w-1/2 flex flex-col justify-between min-h-[420px] max-h-[520px] p-4 space-y-3">
//             <div className="space-y-2">
//               <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
//                 {title}
//               </h1>
//               <p className="text-gray-600 text-sm">{description}</p>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-2">
//               <div className="p-2 border border-gray-200 rounded-lg">
//                 <p className="text-xs text-gray-500 font-medium">Location</p>
//                 <p className="font-semibold text-gray-900 text-sm">{location}</p>
//               </div>
//               <div className="p-2 border border-gray-200 rounded-lg">
//                 <p className="text-xs text-gray-500 font-medium">Distance</p>
//                 <p className="font-semibold text-gray-900 text-sm">{distance}</p>
//               </div>
//             </div>

//             <div className="p-2 border border-gray-200 rounded-lg">
//               <p className="text-xs text-gray-500 font-medium">
//                 Total Registrations:
//               </p>
//               <p className="text-base font-bold text-gray-900">
//                 {totalRegistration}
//               </p>
//             </div>

//             <div className="space-y-1">
//               <h3 className="text-base font-bold text-gray-900">Important Dates</h3>
//               <div className="space-y-1">
//                 <p className="text-sm text-gray-600">
//                   🗓 Start:{" "}
//                   {startRegDate &&
//                     format(new Date(startRegDate), "dd MMM yyyy, hh:mm a")}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   ⏰ End:{" "}
//                   {endRegDate &&
//                     format(new Date(endRegDate), "dd MMM yyyy, hh:mm a")}
//                 </p>
//                 <p className="text-sm font-bold text-blue-700">
//                   🏁 Marathon:{" "}
//                   {marathonStartDate &&
//                     format(new Date(marathonStartDate), "dd MMM yyyy, hh:mm a")}
//                 </p>
//               </div>
//             </div>

//             {/* Countdown Timer */}
//             <div className="p-2 border border-gray-200 rounded-lg">
//               <h3 className="text-base font-bold text-gray-900 mb-2 text-center">
//                 Time Left to Marathon
//               </h3>
//               <div className="grid grid-cols-4 gap-1 text-center">
//                 {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
//                   const value = Object.values(timeLeft)[i];
//                   return (
//                     <div
//                       key={label}
//                       className="p-2 border border-gray-200 rounded-lg"
//                     >
//                       <div className="text-lg font-bold text-gray-900 mb-1">
//                         {value}
//                       </div>
//                       <div className="text-xs text-gray-500 font-medium">
//                         {label}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Register Button */}
//             <div className="pt-2">
//               {isRegistrationOpen ? (
//                 <Link
//                   to={`/marathonRegister/${id}`}
//                   className="block w-full py-2 px-4 rounded-lg font-bold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 text-sm"
//                 >
//                   Register Now →
//                 </Link>
//               ) : (
//                 <button
//                   disabled
//                   className="w-full py-2 px-4 rounded-lg font-bold text-center border-2 border-gray-300 text-gray-400 cursor-not-allowed text-sm"
//                 >
//                   Registration Closed
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* =================== ⭐ Reviews Section =================== */}
//         <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-md">
//           <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>

//           {/* Average Rating */}
//           {reviews.length > 0 && (
//             <p className="mb-4 text-yellow-500 font-semibold">
//               Average Rating:{" "}
//               {(
//                 reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
//               ).toFixed(1)}{" "}
//               / 5 ⭐ ({reviews.length} reviews)
//             </p>
//           )}

//           {/* Review Form */}
//           <form onSubmit={handleSubmitReview} className="mb-6">
//             <div className="flex items-center gap-2 mb-2">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => setRating(star)}
//                   className={`text-2xl ${
//                     star <= rating ? "text-yellow-400" : "text-gray-300"
//                   }`}
//                 >
//                   ★
//                 </button>
//               ))}
//             </div>
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Write your review..."
//               className="w-full border rounded-md p-2 mb-2 text-sm"
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
//             >
//               {loading ? "Submitting..." : "Submit Review"}
//             </button>
//           </form>

//           {/* Review List */}
//           <div className="space-y-3">
//             {reviews.length === 0 ? (
//               <p className="text-gray-500">No reviews yet. Be the first!</p>
//             ) : (
//               reviews.map((rev) => (
//                 <div
//                   key={rev._id}
//                   className="bg-white border rounded-lg p-3 shadow-sm"
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={
//                         rev.userPhoto ||
//                         "https://i.ibb.co/2FsfXqM/user.png"
//                       }
//                       alt="user"
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <div>
//                       <p className="font-semibold">{rev.userName}</p>
//                       <p className="text-yellow-500 text-sm">
//                         {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="mt-2 text-gray-700 text-sm">{rev.comment}</p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     {new Date(rev.createdAt).toLocaleString()}
//                   </p>

//                    {/* 🗑️ Delete Button */}
//                    <button onClick={() => handleDelete(rev._id)}
//                     className="bg-red-100 text-red-600 hover:bg-red-200
//                      right-3 px-2 py-1 text-xm font-semibold rounded ">
//                     delete
//                     </button>
              
              
      
//                 </div>
//               ))
//             )}
//           </div>
//         </div>


//       </div>
//     </div>
//   );
// };

// export default DetailsMarathon;

// =======================================

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router";
// import { format } from "date-fns";
// import { Helmet } from "react-helmet";

// const DetailsMarathon = () => {
//   const { id } = useParams();
//   const [singleMarathonData, setSingleMarathonData] = useState({});
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
//     <div className="min-h-screen my-10 py-8 px-4">
//       <Helmet>
//         <title>Marathon Details</title>
//       </Helmet>
      
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col lg:flex-row gap-4 items-stretch">
//           {/* Image Section */}
//           <div className="w-full lg:w-1/2 flex flex-col">
//             <div className="relative  rounded-2xl shadow-2xl  w-full flex-1">
//               <img 
//                 src={image} 
//                 alt={title}
//                 className="w-full h-full  "
//               />
//               {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> */}
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="w-full lg:w-1/2 flex flex-col justify-between min-h-[420px] max-h-[520px] p-4 space-y-3">
//             {/* Header */}
//             <div className="space-y-2">
//               <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
//                 {title}
//               </h1>
//               <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">
//                 {description}
//               </p>
//             </div>

//             {/* Quick Info Cards */}
//             <div className="grid sm:grid-cols-2 gap-2">
//               <div className="p-2 border border-gray-200 rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                   <div>
//                     <p className="text-xs text-gray-500 font-medium">Location</p>
//                     <p className="font-semibold text-gray-900 text-sm">{location}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-2 border border-gray-200 rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                   <div>
//                     <p className="text-xs text-gray-500 font-medium">Distance</p>
//                     <p className="font-semibold text-gray-900 text-sm">{distance}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Registration Count */}
//             <div className="p-2 border border-gray-200 rounded-lg">
//               <div className="flex items-center gap-2">
//                 <span className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center mr-2">
//                   <span className="text-orange-600 font-bold text-lg">👥</span>
//                 </span>
//                 <span className="text-xs text-gray-500 font-medium">Total Registrations:</span>
//                 <span className="text-base font-bold text-gray-900 ml-1">{totalRegistration}</span>
//               </div>
//             </div>

//             {/* Important Dates */}
//             <div className="space-y-1">
//               <h3 className="text-base font-bold text-gray-900">Important Dates</h3>
//               <div className="space-y-1">
//                 <div className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
//                   <span className="text-gray-600 font-medium text-xs">Registration Start</span>
//                   <span className="font-semibold text-gray-900 text-xs">
//                     {startRegDate && format(new Date(startRegDate), "dd MMM yyyy, hh:mm a")}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
//                   <span className="text-gray-600 font-medium text-xs">Registration End</span>
//                   <span className="font-semibold text-gray-900 text-xs">
//                     {endRegDate && format(new Date(endRegDate), "dd MMM yyyy, hh:mm a")}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center p-2 border border-blue-200 rounded-lg bg-blue-50">
//                   <span className="text-blue-700 font-medium text-xs">Marathon Start</span>
//                   <span className="font-bold text-blue-900 text-xs">
//                     {marathonStartDate && format(new Date(marathonStartDate), "dd MMM yyyy, hh:mm a")}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Countdown Timer */}
//             <div className="p-2 border border-gray-200 rounded-lg">
//               <h3 className="text-base font-bold text-gray-900 mb-2 text-center">
//                 Time Left to Marathon
//               </h3>
//               <div className="grid grid-cols-4 gap-1">
//                 <div className="text-center p-2 border border-gray-200 rounded-lg">
//                   <div className="text-lg font-bold text-gray-900 mb-1">{timeLeft.days}</div>
//                   <div className="text-xs text-gray-500 font-medium">Days</div>
//                 </div>
//                 <div className="text-center p-2 border border-gray-200 rounded-lg">
//                   <div className="text-lg font-bold text-gray-900 mb-1">{timeLeft.hours}</div>
//                   <div className="text-xs text-gray-500 font-medium">Hours</div>
//                 </div>
//                 <div className="text-center p-2 border border-gray-200 rounded-lg">
//                   <div className="text-lg font-bold text-gray-900 mb-1">{timeLeft.minutes}</div>
//                   <div className="text-xs text-gray-500 font-medium">Minutes</div>
//                 </div>
//                 <div className="text-center p-2 border border-gray-200 rounded-lg">
//                   <div className="text-lg font-bold text-gray-900 mb-1">{timeLeft.seconds}</div>
//                   <div className="text-xs text-gray-500 font-medium">Seconds</div>
//                 </div>
//               </div>
//             </div>

//             {/* Register Button */}
//             <div className="pt-2">
//               {isRegistrationOpen ? (
//                 <Link
//                   to={`/marathonRegister/${id}`}
//                   className="block w-full py-2 px-4 rounded-lg font-bold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 text-sm"
//                 >
//                   Register Now →
//                 </Link>
//               ) : (
//                 <button
//                   disabled
//                   className="w-full py-2 px-4 rounded-lg font-bold text-center border-2 border-gray-300 text-gray-400 cursor-not-allowed text-sm"
//                 >
//                   Registration Closed
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailsMarathon;