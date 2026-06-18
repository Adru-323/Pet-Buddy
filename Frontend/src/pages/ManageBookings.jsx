// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import StatusBadge from '../components/StatusBadge';

// const ManageBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       const { data } = await axios.get('/api/admin/bookings');
//       setBookings(data);
//     } catch (error) {
//       console.error('Error fetching bookings', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       await axios.put(`/api/admin/bookings/${id}/status`, { status });
//       fetchBookings(); // Refresh list
//     } catch (error) {
//       alert('Failed to update status');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to completely delete this booking?')) {
//       try {
//         await axios.delete(`/api/admin/bookings/${id}`);
//         fetchBookings();
//       } catch (error) {
//         alert('Failed to delete booking');
//       }
//     }
//   };

//   const filteredBookings = bookings.filter(b => 
//     b.customer?.name.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-7xl mx-auto mt-10 p-4 bg-white shadow rounded border">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
//         <input 
//           type="text" 
//           placeholder="Search by customer name..." 
//           className="border px-4 py-2 rounded w-64"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-800 text-white border-b">
//               <th className="p-3">Customer</th>
//               <th className="p-3">Service</th>
//               <th className="p-3">Date</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings.map((b) => (
//               <tr key={b._id} className="border-b hover:bg-gray-50">
//                 <td className="p-3 font-semibold">{b.customer?.name}</td>
//                 <td className="p-3 text-sm">{b.serviceType} <br/><span className="text-gray-500">Pet: {b.pet?.petName}</span></td>
//                 <td className="p-3 text-sm">{new Date(b.bookingDate).toLocaleDateString()}</td>
//                 <td className="p-3 font-bold">₹{b.totalPrice}</td>
//                 <td className="p-3"><StatusBadge status={b.status} /></td>
//                 <td className="p-3 space-x-2">
//                   <select 
//                     onChange={(e) => handleStatusUpdate(b._id, e.target.value)} 
//                     value={b.status}
//                     className="border rounded px-2 py-1 bg-white text-sm"
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="approved">Approve</option>
//                     <option value="rejected">Reject</option>
//                     <option value="completed">Complete</option>
//                     <option value="cancelled">Cancelled</option>
//                   </select>
//                   <button onClick={() => handleDelete(b._id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageBookings;



//Claude

import { useState, useEffect } from 'react';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('/api/admin/bookings');
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`/api/admin/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to completely delete this booking?')) {
      try {
        await axios.delete(`/api/admin/bookings/${id}`);
        fetchBookings();
      } catch (error) {
        alert('Failed to delete booking');
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return <span className="text-gray-400 italic">—</span>;
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return <span className="text-gray-400 italic">—</span>;
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  const filteredBookings = bookings.filter((b) =>
    b.customer?.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-[1400px] mx-auto mt-10 p-4 bg-white shadow rounded border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
        <input
          type="text"
          placeholder="Search by customer name..."
          className="border px-4 py-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 whitespace-nowrap">Customer</th>
              <th className="p-3 whitespace-nowrap">Service / Package</th>
              <th className="p-3 whitespace-nowrap">Frequency</th>
              <th className="p-3 whitespace-nowrap">Start Date</th>
              <th className="p-3 whitespace-nowrap">End Date</th>
              <th className="p-3 whitespace-nowrap">Time</th>
              <th className="p-3 whitespace-nowrap">Price</th>
              <th className="p-3 whitespace-nowrap">Status</th>
              <th className="p-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-400">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold whitespace-nowrap">{b.customer?.name}</td>
                  <td className="p-3">
                    <span className="font-medium text-gray-800">{b.serviceType}</span>
                    {b.packageName && (
                      <div className="text-xs text-indigo-600 font-medium mt-0.5">{b.packageName}</div>
                    )}
                    <div className="text-xs text-gray-400 mt-0.5">Pet: {b.pet?.petName}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {b.frequency ? (
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full capitalize">
                        {b.frequency === 'twice' ? 'Twice / day' : 'Once / day'}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">—</span>
                    )}
                  </td>
                  <td className="p-3 whitespace-nowrap">{formatDate(b.bookingDate)}</td>
                  <td className="p-3 whitespace-nowrap">{formatDate(b.endDate)}</td>
                  <td className="p-3 whitespace-nowrap font-medium">{formatTime(b.bookingTime)}</td>
                  <td className="p-3 font-bold whitespace-nowrap">₹{b.totalPrice}</td>
                  <td className="p-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="p-3 whitespace-nowrap space-x-2">
                    <select
                      onChange={(e) => handleStatusUpdate(b._id, e.target.value)}
                      value={b.status}
                      className="border rounded px-2 py-1 bg-white text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                      <option value="completed">Complete</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;