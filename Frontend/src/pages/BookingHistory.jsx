import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get('/api/bookings/my-bookings');
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white shadow rounded border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
        <Link to="/book" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book New Service</Link>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-600 text-center py-10">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">Pet</th>
                <th className="p-3">Service</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{b.pet?.petName || 'Unknown Pet'}</td>
                  <td className="p-3 text-gray-700">{b.serviceType}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {new Date(b.bookingDate).toLocaleDateString()} at {b.bookingTime}
                  </td>
                  <td className="p-3 font-bold text-gray-800">₹{b.totalPrice}</td>
                  <td className="p-3"><StatusBadge status={b.status} /></td>
                  <td className="p-3">
                    <Link to={`/bookings/${b._id}`} className="text-blue-600 hover:underline">View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;