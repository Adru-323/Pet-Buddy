
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // --- WHATSAPP FUNCTION ---
  const handleWhatsAppChat = () => {
    // 1. Enter your business WhatsApp number here (Include country code, but NO '+' sign)
    // For India, start with 91 followed by the 10-digit number.
    const phoneNumber = "916357071039"; 
    
    // 2. The default message the user will send you
    const message = encodeURIComponent(`Hi PetCare! I am ${user?.name || 'a user'} and I need some help with your services.`);
    
    // 3. Opens WhatsApp in a new tab (works on both Mobile App and Web WhatsApp)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-lg text-gray-600">What would you like to do today?</p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: My Pets */}
          <Link to="/pets" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
            <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2 mb-3">
              <span className="text-2xl">🐾</span> My Pets
            </h3>
            <p className="text-gray-600">View, add, or edit your pet profiles.</p>
          </Link>

          {/* Card 2: Book Service */}
          <Link to="/book" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
            <h3 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-3">
              <span className="text-2xl">📅</span> Book Service
            </h3>
            <p className="text-gray-600">Schedule a walking or sitting appointment.</p>
          </Link>

          {/* Card 3: My Bookings */}
          <Link to="/bookings" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
            <h3 className="text-xl font-bold text-purple-600 flex items-center gap-2 mb-3">
              <span className="text-2xl">🕰️</span> My Bookings
            </h3>
            <p className="text-gray-600">Check the status of your appointments.</p>
          </Link>

          {/* Card 4: Profile */}
          <Link to="/profile" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
              <span className="text-2xl">👤</span> Profile
            </h3>
            <p className="text-gray-600">Update your contact details and password.</p>
          </Link>

          {/* Card 5: WHATSAPP CHAT BUTTON */}
          <div 
            onClick={handleWhatsAppChat}
            className="bg-white p-8 rounded-xl shadow-sm border border-green-100 hover:shadow-md hover:border-green-300 transition cursor-pointer flex flex-col justify-center"
          >
            <h3 className="text-xl font-bold text-[#25D366] flex items-center gap-2 mb-3">
              <span className="text-2xl">💬</span> WhatsApp Support
            </h3>
            <p className="text-gray-600">Chat directly with our team for quick help.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;