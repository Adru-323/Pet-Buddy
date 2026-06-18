import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';
// 1. IMPORT THE REVIEW FORM HERE
import ReviewForm from '../components/ReviewForm'; 

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axios.get(`/api/bookings/${id}`);
        setBooking(data);
      } catch (error) {
        console.error('Error fetching booking', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.put(`/api/bookings/${id}/cancel`);
        setBooking(prev => ({ ...prev, status: 'cancelled' }));
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!booking) return <div className="text-center mt-10 text-red-500">Booking not found.</div>;

  const canCancel = booking.status === 'pending' || booking.status === 'approved';

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 border rounded shadow">
      <Link to="/bookings" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to History</Link>
      
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Info</h2>
          <p className="text-gray-500 text-sm">ID: {booking._id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-3">Service Details</h3>
          <p><strong>Type:</strong> {booking.serviceType}</p>
          <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {booking.bookingTime}</p>
          <p><strong>Address:</strong> {booking.address}</p>
          <p><strong>Total Price:</strong> <span className="text-green-700 font-bold border rounded px-2 py-1 bg-green-50">₹{booking.totalPrice}</span></p>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-3">Pet Details</h3>
          <div className="flex items-center space-x-4">
            <img src={booking.pet.image || 'https://via.placeholder.com/100'} alt={booking.pet.petName} className="w-16 h-16 rounded-full object-cover border" />
            <div>
              <p className="font-bold text-xl">{booking.pet.petName}</p>
              <p className="text-gray-600">{booking.pet.petType} - {booking.pet.breed}</p>
            </div>
          </div>
        </div>
      </div>

      {booking.notes && (
        <div className="bg-gray-50 p-4 rounded border mb-6">
          <p className="font-bold text-gray-700 mb-1">Customer Notes:</p>
          <p className="text-gray-600 italic">"{booking.notes}"</p>
        </div>
      )}

      {canCancel && (
        <div className="border-t pt-4 text-right">
          <button onClick={handleCancel} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition">
            Cancel Booking
          </button>
        </div>
      )}

      {/* 2. ADD THE CONDITIONAL REVIEW FORM HERE */}
      {/* If the status is completed, the form will seamlessly appear at the bottom of the page */}
      {booking.status === 'completed' && (
        <div className="mt-8 border-t pt-6">
          <ReviewForm bookingId={booking._id} />
        </div>
      )}

    </div>
  );
};

export default BookingDetails;