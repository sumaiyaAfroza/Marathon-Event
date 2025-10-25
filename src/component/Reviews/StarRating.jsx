import React from "react";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating(star)}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= rating ? "#facc15" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#facc15"
          className="w-6 h-6 transition"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.5l1.14 3.5h3.68l-2.98 2.17 1.14 3.5-2.98-2.17-2.98 2.17 1.14-3.5-2.98-2.17h3.68l1.14-3.5z"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
