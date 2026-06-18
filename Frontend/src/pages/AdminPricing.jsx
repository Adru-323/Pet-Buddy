import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPricing = () => {
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState({
    walk30: 160,
    walk45: 200,
    sitHour: 100,
    sitDay: 1200,
    boardNight: 800,
    boardWeek: 5000
  });

  // Fetch current prices when the page loads
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await axios.get('/api/pricing');
        if (data) setPrices(data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };
    fetchPrices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrices({ ...prices, [name]: Number(value) });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('/api/pricing', prices);
      alert('Pricing updated successfully!');
    } catch (error) {
      console.error("Error saving prices", error);
      alert('Failed to save prices.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Manage Service Pricing</h2>
        
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Dog Walking Section */}
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
              <span className="text-xl">🦮</span> Dog Walking
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">30 Minutes (₹)</label>
                <input type="number" name="walk30" value={prices.walk30} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">45 Minutes (₹)</label>
                <input type="number" name="walk45" value={prices.walk45} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
            </div>
          </div>

          {/* Pet Sitting Section */}
          <div>
            <h3 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
              <span className="text-xl">🏠</span> Pet Sitting
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Hourly Rate (₹)</label>
                <input type="number" name="sitHour" value={prices.sitHour} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Day / 24hrs (₹)</label>
                <input type="number" name="sitDay" value={prices.sitDay} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
            </div>
          </div>

          {/* Pet Boarding Section */}
          <div>
            <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
              <span className="text-xl">🏨</span> Pet Boarding
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Per Night (₹)</label>
                <input type="number" name="boardNight" value={prices.boardNight} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">1 Week / 7 Days (₹)</label>
                <input type="number" name="boardWeek" value={prices.boardWeek} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {loading ? "Saving Updates..." : "Save Pricing Updates"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminPricing;