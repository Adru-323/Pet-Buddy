import { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ bookingId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', { bookingId, rating, comment });
      setSuccess(true);
      setError('');
      if (onReviewSubmitted) onReviewSubmitted(); // Refresh parent component if needed
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    }
  };

  if (success) {
    return <div className="text-green-600 font-bold p-4 bg-green-50 rounded">Thank you for your feedback!</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow border mt-4">
      <h3 className="text-lg font-bold mb-3">Leave a Review</h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-1">Rating</label>
          <select 
            value={rating} 
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded p-2"
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Terrible</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-1">Comments</label>
          <textarea 
            required
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="How was the service?"
          ></textarea>
        </div>
        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;