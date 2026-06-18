import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Pricing = () => {
  const { user } = useContext(AuthContext);
  
  // Check if user exists and has admin privileges
  const isAdmin = user && user.role === 'admin';

  // State to hold dynamic prices
  const [prices, setPrices] = useState({
    walk30: 160,
    walk45: 200,
    sitHour: 100,
    sitDay: 1200,
    boardNight: 800,
    boardWeek: 5000
  });

  // Fetch prices from Database on load
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await axios.get('/api/pricing');
        if (data) {
          setPrices(data);
        }
      } catch (error) {
        console.log("Using default prices. Backend route might not be set up yet.");
      }
    };
    fetchPrices();
  }, []);

  return (
    <section className="bg-[#111827] py-16" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Professional care tailored to your furry friend's needs.</p>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Card 1: Dog Walking */}
          <div className="bg-white rounded-2xl p-8 shadow-lg flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Dog Walking</h3>
              <span className="text-2xl">🦮</span>
            </div>
            <p className="text-gray-600 mb-6 flex-grow">
              Perfect for high-energy dogs who need a mid-day break while you are at work.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <span className="text-gray-800 font-medium">30 Minutes</span>
                <span className="text-blue-600 font-bold text-xl">₹{prices.walk30}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <span className="text-gray-800 font-medium">45 Minutes</span>
                <span className="text-blue-600 font-bold text-xl">₹{prices.walk45}</span>
              </div>
            </div>
            
            {/* Hidden if Admin */}
            {!isAdmin && (
              <Link to="/book" className="block w-full text-center bg-[#111827] text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition">
                Book a Walk
              </Link>
            )}
          </div>

          {/* Card 2: Pet Sitting */}
          <div className="bg-[#4F46E5] rounded-2xl p-8 shadow-xl flex flex-col relative transform md:-translate-y-4 border-4 border-[#4F46E5] h-[105%] z-10">
            <div className="absolute top-0 right-0 bg-[#FCD34D] text-yellow-900 text-xs font-bold px-4 py-1 rounded-bl-lg rounded-tr-xl">
              POPULAR
            </div>
            <div className="flex justify-between items-center mb-4 mt-2">
              <h3 className="text-2xl font-bold text-white">Pet Sitting</h3>
              <span className="text-2xl">🏠</span>
            </div>
            <p className="text-indigo-100 mb-6 flex-grow">
              In-home care so your pet stays comfortable in their own environment.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="bg-white p-4 rounded-lg flex justify-between items-center">
                <span className="text-gray-800 font-medium">Hourly Rate</span>
                <span className="text-blue-600 font-bold text-xl">₹{prices.sitHour}<span className="text-sm font-normal text-gray-500">/hr</span></span>
              </div>
              <div className="bg-white p-4 rounded-lg flex justify-between items-center">
                <span className="text-gray-800 font-medium">Full Day (24hrs)</span>
                <span className="text-blue-600 font-bold text-xl">₹{prices.sitDay}<span className="text-sm font-normal text-gray-500">/day</span></span>
              </div>
            </div>
            
            {/* Hidden if Admin */}
            {!isAdmin && (
              <Link to="/book" className="block w-full text-center bg-white text-[#4F46E5] font-bold py-3 rounded-xl hover:bg-gray-50 transition shadow-md">
                Book a Sitter
              </Link>
            )}
          </div>

          {/* Card 3: Pet Boarding */}
          <div className="bg-white rounded-2xl p-8 shadow-lg flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Pet Boarding</h3>
              <span className="text-2xl">🏨</span>
            </div>
            <p className="text-gray-600 mb-6 flex-grow">
              Overnight care at our trusted sitter's home. Perfect for long vacations or trips.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <span className="text-gray-800 font-medium">Per Night</span>
                <span className="text-blue-600 font-bold text-xl">₹{prices.boardNight}<span className="text-sm font-normal text-gray-500">/nt</span></span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <span className="text-gray-800 font-medium">1 Week (7 Days)</span>
                <span className="text-blue-600 font-bold text-xl">₹{prices.boardWeek}</span>
              </div>
            </div>
            
            {/* Hidden if Admin */}
            {!isAdmin && (
              <Link to="/book" className="block w-full text-center bg-[#111827] text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition">
                Book Boarding
              </Link>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;