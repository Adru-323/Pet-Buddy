import { useEffect, useState } from 'react';
import axios from 'axios';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get('/api/reviews');
        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-10">Loading testimonials...</div>;
  if (reviews.length === 0) return null; // Hide section if no reviews exist yet

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Pet Parents Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => ( // Only show top 6
            <div key={review._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex text-yellow-400 mb-2">
                {/* Render Stars based on rating */}
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{review.comment}"</p>
              <p className="text-sm font-bold text-gray-800">- {review.customer?.name || 'Happy Customer'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;