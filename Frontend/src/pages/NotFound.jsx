import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NotFound = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col justify-between">
      
      {/* 404 MAIN CONTENT SECTION */}
      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center">
          
          {/* Paw Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 text-4xl mb-6 shadow-inner animate-bounce">
            🐾
          </div>

          <h1 className="text-7xl md:text-8xl font-black text-blue-600 tracking-tight mb-2">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
            Ruh-roh! You seem lost in the dog park.
          </h2>
          
          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
            The page you're searching for has wandered off, buried its bone elsewhere, or doesn't exist. Let's get you back on track!
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-base hover:bg-blue-700 shadow-lg shadow-blue-200 transition duration-200"
            >
              Back to Home
            </Link>

            <Link
              to={isAdmin ? "/admin" : (user ? "/dashboard" : "/login")}
              className="w-full sm:w-auto bg-white text-blue-600 border border-blue-200 px-8 py-3.5 rounded-full font-bold text-base hover:bg-blue-50 transition duration-200"
            >
              {isAdmin ? "Admin Dashboard" : (user ? "My Dashboard" : "Sign In")}
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="font-bold text-xl text-white">PetCare</span>
            </div>
            <p className="text-sm">Premium pet walking and sitting services you can trust.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/#services" className="hover:text-white">Services</Link></li>
              <li><Link to="/#pricing" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cancellation Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Adarshsalunkhe0602@gmail.com</li>
              <li>+91 76665 91912</li>
              <li>Ghule Nagar Manjari, Pune, Maharashtra, India</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PetCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;