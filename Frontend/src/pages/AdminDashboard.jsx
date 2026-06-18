import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/admin/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading Admin Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        <div className="bg-blue-100 p-6 rounded shadow border border-blue-200 text-center">
          <p className="text-blue-600 font-bold uppercase text-sm">Total Users</p>
          <p className="text-3xl font-black text-blue-800">{stats?.totalUsers}</p>
        </div>
        <div className="bg-green-100 p-6 rounded shadow border border-green-200 text-center">
          <p className="text-green-600 font-bold uppercase text-sm">Total Pets</p>
          <p className="text-3xl font-black text-green-800">{stats?.totalPets}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded shadow border border-purple-200 text-center">
          <p className="text-purple-600 font-bold uppercase text-sm">Total Bookings</p>
          <p className="text-3xl font-black text-purple-800">{stats?.totalBookings}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded shadow border border-yellow-200 text-center">
          <p className="text-yellow-600 font-bold uppercase text-sm">Pending</p>
          <p className="text-3xl font-black text-yellow-800">{stats?.pendingBookings}</p>
        </div>
        <div className="bg-teal-100 p-6 rounded shadow border border-teal-200 text-center">
          <p className="text-teal-600 font-bold uppercase text-sm">Completed</p>
          <p className="text-3xl font-black text-teal-800">{stats?.completedBookings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/bookings" className="block bg-white p-6 rounded shadow border hover:bg-gray-50 transition">
          <h2 className="text-xl font-bold mb-2">📋 Manage Bookings</h2>
          <p className="text-gray-600">Review, approve, reject, or delete user bookings.</p>
        </Link>
        <Link to="/admin/users" className="block bg-white p-6 rounded shadow border hover:bg-gray-50 transition">
          <h2 className="text-xl font-bold mb-2">👥 Manage Users</h2>
          <p className="text-gray-600">View customer accounts and remove users.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;