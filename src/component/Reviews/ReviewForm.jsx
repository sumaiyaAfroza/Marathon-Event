import React, { useState } from "react";
import StarRating from "./StarRating";

const ReviewForm = ({ marathonId, user, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first!");
    if (!rating || !reviewText.trim()) return alert("Please add rating & comment!");

    const reviewData = {
      marathonId,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      rating,
      comment: reviewText,
    };

    setLoading(true);
    try {
      const res = await fetch("https://marathon-event-server.vercel.app/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();
      if (res.ok) {
        onReviewAdded(data);
        setRating(0);
        setReviewText("");
      } else {
        alert(data.message || "Error adding review");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Leave a Review</h2>
      <StarRating rating={rating} setRating={setRating} />
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review..."
        className="w-full border p-2 rounded mt-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
