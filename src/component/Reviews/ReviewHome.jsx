import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewHome = ({ marathonId }) => {
    const [review, setReview] = useState([])
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    avgRating: 0,
    totalReviews: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
//   const [loading, setLoading] = useState(true);

  // Helper: parse rating properly
  const getRating = (rating) => {
    if (typeof rating === "number") return rating;
    if (rating?.$numberInt) return parseInt(rating.$numberInt, 10);
    return 0;
  };

  // Helper: parse date properly
  const getCreatedAt = (createdAt) => {
    if (!createdAt) return new Date();
    if (createdAt.$date?.$numberLong)
      return new Date(parseInt(createdAt.$date.$numberLong, 10));
    return new Date(createdAt);
  };

  

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/reviews`);
      console.log(res);

      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch summary
  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/reviews/summary/${marathonId}`);
      setSummary(res.data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  useEffect(()=>{
    fetch('http://localhost:3000/reviews').then(res => res.json()).then(data => setReview(data))
  },[])


  useEffect(() => {
    if (!marathonId) return;
    fetchReviews();
    fetchSummary();
  }, [marathonId]);



  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md my-6">
      <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>

      {/* Rating Summary */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-yellow-500">
          Average Rating: {summary.avgRating} / 5 ⭐
        </p>
        <p className="text-gray-600 text-sm">Total Reviews: {summary.totalReviews}</p>
        <div className="flex gap-2 mt-2 text-sm">
          {Object.keys(summary.distribution).map((star) => (
            <div key={star}>
              {star}⭐: {summary.distribution[star]}
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      {review.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {review.map((rev) => {
            const ratingNum = getRating(rev.rating);
            const createdAt = getCreatedAt(rev.createdAt);

            // Use _id.$oid if exists, else fallback to _id
            const key = rev._id?.$oid || rev._id;

            return (
              <div
                key={key}
                className="w-full sm:w-[48%] lg:w-[30%] bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={rev.userPhoto || "https://i.ibb.co/2FsfXqM/user.png"}
                    alt={rev.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{rev.userName || "Anonymous"}</p>
                    <p className="text-yellow-500 text-sm">
                      {"★".repeat(ratingNum) + "☆".repeat(5 - ratingNum)}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{rev.comment}</p>
                <p className="text-xs text-gray-400">{createdAt.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReviewHome;
