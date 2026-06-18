

// // export default Navbar;
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import NotificationBell from './NotificationBell';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Automatically close the mobile menu whenever the user clicks a link and the page changes
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     logout();
//     navigate('/'); 
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
          
//           {/* 1. BRAND / LOGO (Left) */}
//           <Link to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/'} className="flex items-center gap-2">
//             <span className="text-2xl">🐾</span>
//             <span className="font-bold text-xl md:text-2xl text-blue-700 tracking-tight">PetCare</span>
//           </Link>

//           {/* 2. DESKTOP LINKS (Center - Hidden on Mobile) */}
//           <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
//             {/* The new explicit HOME button */}
//             <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>

//             {user ? (
//               user.role === 'admin' ? (
//                 <>
//                   <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium">Admin Dashboard</Link>
//                   <Link to="/admin/bookings" className="text-gray-600 hover:text-blue-600 font-medium">Manage Bookings</Link>
//                   <Link to="/admin/users" className="text-gray-600 hover:text-blue-600 font-medium">Manage Users</Link>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
//                   <Link to="/pets" className="text-gray-600 hover:text-blue-600 font-medium">My Pets</Link>
//                   <Link to="/bookings" className="text-gray-600 hover:text-blue-600 font-medium">My Bookings</Link>
//                 </>
//               )
//             ) : (
//               <>
//                 <a href="/#about" className="text-gray-600 hover:text-blue-600 font-medium">About</a>
//                 <a href="/#services" className="text-gray-600 hover:text-blue-600 font-medium">Services</a>
//                 <a href="/#pricing" className="text-gray-600 hover:text-blue-600 font-medium">Pricing</a>
//               </>
//             )}
//           </div>

//           {/* 3. RIGHT SIDE (Bell, Profile, & Mobile Toggle) */}
//           <div className="flex items-center gap-2 md:gap-4">
//             {user ? (
//               <>
//                 {/* Bell stays visible on mobile */}
//                 <NotificationBell />
                
//                 {/* Desktop Profile Name & Logout */}
//                 <div className="hidden md:flex items-center">
//                   <Link to="/profile" className="text-gray-700 font-medium hover:text-blue-600 mr-4">
//                     Hi, {user.name.split(' ')[0]}
//                   </Link>
//                   <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-red-100 transition">
//                     Logout
//                   </button>
//                 </div>
//               </>
//             ) : (
//               /* Desktop Guest Buttons */
//               <div className="hidden md:flex items-center space-x-4">
//                 <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800">Log In</Link>
//                 <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md">
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* MOBILE HAMBURGER BUTTON */}
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {isMenuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 4. MOBILE DROPDOWN MENU */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
//           <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            
//             {/* Mobile Explicit Home Button */}
//             <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Home</Link>

//             {user ? (
//               user.role === 'admin' ? (
//                 <>
//                   <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Admin Dashboard</Link>
//                   <Link to="/admin/bookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Manage Bookings</Link>
//                   <Link to="/admin/users" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Manage Users</Link>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Dashboard</Link>
//                   <Link to="/pets" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">My Pets</Link>
//                   <Link to="/bookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">My Bookings</Link>
//                 </>
//               )
//             ) : (
//               <>
//                 <a href="/#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">About</a>
//                 <a href="/#services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Services</a>
//                 <a href="/#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Pricing</a>
//               </>
//             )}

//             {/* Mobile Profile & Logout / Login Actions */}
//             <div className="border-t border-gray-200 mt-4 pt-4 pb-2">
//               {user ? (
//                 <>
//                   <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-bold text-gray-900">
//                     Profile ({user.name.split(' ')[0]})
//                   </Link>
//                   <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <div className="flex flex-col space-y-3 px-3 mt-2">
//                   <Link to="/login" className="text-center bg-gray-100 text-gray-800 py-2 rounded-md font-medium">Log In</Link>
//                   <Link to="/register" className="text-center bg-blue-600 text-white py-2 rounded-md font-medium">Sign Up</Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import NotificationBell from './NotificationBell.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Automatically close the mobile menu whenever the user clicks a link and the page changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. BRAND / LOGO (Left) */}
          <Link to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/'} className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-bold text-xl md:text-2xl text-blue-700 tracking-tight">PetCare</span>
          </Link>

          {/* 2. DESKTOP LINKS (Center - Hidden on Mobile) */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {/* The new explicit HOME button */}
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>

            {user ? (
              user.role === 'admin' ? (
                <>
                  <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium">Admin Dashboard</Link>
                  <Link to="/admin/bookings" className="text-gray-600 hover:text-blue-600 font-medium">Manage Bookings</Link>
                  <Link to="/admin/users" className="text-gray-600 hover:text-blue-600 font-medium">Manage Users</Link>
                  <Link to="/admin/pricing" className="text-gray-600 hover:text-blue-600 font-medium">Manage Pricing</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
                  <Link to="/pets" className="text-gray-600 hover:text-blue-600 font-medium">My Pets</Link>
                  <Link to="/bookings" className="text-gray-600 hover:text-blue-600 font-medium">My Bookings</Link>
                </>
              )
            ) : (
              <>
                <a href="/#about" className="text-gray-600 hover:text-blue-600 font-medium">About</a>
                <a href="/#services" className="text-gray-600 hover:text-blue-600 font-medium">Services</a>
                <a href="/#pricing" className="text-gray-600 hover:text-blue-600 font-medium">Pricing</a>
              </>
            )}
          </div>

          {/* 3. RIGHT SIDE (Bell, Profile, & Mobile Toggle) */}
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <>
                {/* Bell stays visible on mobile */}
                <NotificationBell />
                
                {/* Desktop Profile Name & Logout */}
                <div className="hidden md:flex items-center">
                  <Link to="/profile" className="text-gray-700 font-medium hover:text-blue-600 mr-4">
                    Hi, {user.name.split(' ')[0]}
                  </Link>
                  <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-red-100 transition">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              /* Desktop Guest Buttons */
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800">Log In</Link>
                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-md">
                  Sign Up
                </Link>
              </div>
            )}

            {/* MOBILE HAMBURGER BUTTON */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE DROPDOWN MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            
            {/* Mobile Explicit Home Button */}
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Home</Link>

            {user ? (
              user.role === 'admin' ? (
                <>
                  <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Admin Dashboard</Link>
                  <Link to="/admin/bookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Manage Bookings</Link>
                  <Link to="/admin/users" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Manage Users</Link>
                  <Link to="/admin/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Manage Pricing</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Dashboard</Link>
                  <Link to="/pets" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">My Pets</Link>
                  <Link to="/bookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">My Bookings</Link>
                </>
              )
            ) : (
              <>
                <a href="/#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">About</a>
                <a href="/#services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Services</a>
                <a href="/#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">Pricing</a>
              </>
            )}

            {/* Mobile Profile & Logout / Login Actions */}
            <div className="border-t border-gray-200 mt-4 pt-4 pb-2">
              {user ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-bold text-gray-900">
                    Profile ({user.name.split(' ')[0]})
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 px-3 mt-2">
                  <Link to="/login" className="text-center bg-gray-100 text-gray-800 py-2 rounded-md font-medium">Log In</Link>
                  <Link to="/register" className="text-center bg-blue-600 text-white py-2 rounded-md font-medium">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;