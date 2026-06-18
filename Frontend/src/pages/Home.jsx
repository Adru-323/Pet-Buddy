// import { Link } from 'react-router-dom';
// import Pricing from '../components/Pricing.jsx';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext.jsx';

// const Home = () => {
//   // Grab the user state from your Auth context
//   const { user } = useContext(AuthContext);

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
//       {/* 2. HERO SECTION */}
//       <section className="bg-blue-50 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
//             <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
//               Professional Care for Your <span className="text-blue-600">Furry Best Friends</span>
//             </h1>
//             <p className="text-lg text-gray-600 mb-8">
//               Whether you are stuck at work or going on a vacation, we provide trusted, loving, and reliable pet walking and sitting services right in your neighborhood.
//             </p>
//             <div className="flex space-x-4">
//               <Link to="/book" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg transition">
//                 Book a Sitter
//               </Link>
//               <a href="#services" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg border border-blue-200 hover:bg-blue-50 transition">
//                 Learn More
//               </a>
//             </div>
//           </div>
//           <div className="md:w-1/2">
//             <img 
//               src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
//               alt="Happy dog" 
//               className="rounded-2xl shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500"
//             />
//           </div>
//         </div>
//       </section>

//       {/* 3. ABOUT SECTION */}
//       <section id="about" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Trust PetCare?</h2>
//           <div className="w-24 h-1 bg-blue-600 mx-auto mb-12 rounded"></div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             <div className="p-6 bg-gray-50 rounded-xl">
//               <div className="text-4xl mb-4">🛡️</div>
//               <h3 className="text-xl font-bold mb-2">Verified Sitters</h3>
//               <p className="text-gray-600">Every pet sitter and walker undergoes a strict background check and hands-on training.</p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-xl">
//               <div className="text-4xl mb-4">❤️</div>
//               <h3 className="text-xl font-bold mb-2">Fear-Free Certified</h3>
//               <p className="text-gray-600">We use positive reinforcement and fear-free techniques to ensure your pet is always comfortable.</p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-xl">
//               <div className="text-4xl mb-4">📸</div>
//               <h3 className="text-xl font-bold mb-2">Live Updates</h3>
//               <p className="text-gray-600">Get photo updates, GPS tracking on walks, and detailed report cards after every visit.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 4. SERVICES & PRICING SECTION (Using your new 3-column component!) */}
//       <div id="services">
//         <Pricing />
//       </div>

//       {/* 5. STATIC TESTIMONIALS */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-12">Happy Pets, Happy Parents</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
//               <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
//               <p className="text-gray-600 italic mb-6">"PetCare is a lifesaver! My golden retriever gets so excited when his walker arrives. The daily photos give me so much peace of mind at work."</p>
//               <p className="font-bold text-gray-900">- Priya S.</p>
//             </div>
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
//               <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
//               <p className="text-gray-600 italic mb-6">"We booked a sitter for a 3-day weekend. Our cats were perfectly fed, the litter was clean, and they even brought my packages inside. 10/10!"</p>
//               <p className="font-bold text-gray-900">- Rahul K.</p>
//             </div>
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
//               <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
//               <p className="text-gray-600 italic mb-6">"Very affordable compared to kennels, and my dog didn't have to deal with the stress of leaving home. Highly recommended."</p>
//               <p className="font-bold text-gray-900">- Anjali M.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 6. FAQ SECTION */}
//       <section id="faq" className="py-20 bg-white">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
//           <div className="space-y-6">
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h4 className="font-bold text-lg mb-2">Do I need to be home for the walker?</h4>
//               <p className="text-gray-600">Not at all! You can securely provide access instructions (like a lockbox code or hidden key) in your booking notes.</p>
//             </div>
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h4 className="font-bold text-lg mb-2">What if there is an emergency?</h4>
//               <p className="text-gray-600">All our sitters are trained in basic pet first-aid. We will immediately contact you and your registered vet if anything seems wrong.</p>
//             </div>
//             <div className="bg-gray-50 p-6 rounded-lg">
//               <h4 className="font-bold text-lg mb-2">Can I meet the sitter beforehand?</h4>
//               <p className="text-gray-600">Yes! We offer a free 15-minute "Meet & Greet" over video call or in-person before your first booked service.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 7. CTA SECTION (Now Dynamic!) */}
//       <section className="bg-blue-600 py-20 text-center text-white">
//         <h2 className="text-3xl md:text-4xl font-bold mb-6">
//           {user ? "Ready to book your next service?" : "Ready to treat your pet?"}
//         </h2>
//         <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//           {user 
//             ? "Your furry friends are waiting! Head to your dashboard to manage your pets and bookings." 
//             : "Join hundreds of happy pet parents in your area. Create a free account today and book your first service in seconds."}
//         </p>
        
//         {user ? (
//           <Link to="/dashboard" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-xl inline-block">
//             Go to Dashboard
//           </Link>
//         ) : (
//           <Link to="/register" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-xl inline-block">
//             Create Free Account
//           </Link>
//         )}
//       </section>

//       {/* 8. FOOTER */}
//       <footer className="bg-gray-900 text-gray-400 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <span className="text-2xl">🐾</span>
//               <span className="font-bold text-xl text-white">PetCare</span>
//             </div>
//             <p className="text-sm">Premium pet walking and sitting services you can trust.</p>
//           </div>
//           <div>
//             <h4 className="text-white font-bold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#about" className="hover:text-white">About Us</a></li>
//               <li><a href="#services" className="hover:text-white">Services</a></li>
//               <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-white font-bold mb-4">Legal</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
//               <li><a href="#" className="hover:text-white">Terms of Service</a></li>
//               <li><a href="#" className="hover:text-white">Cancellation Policy</a></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-white font-bold mb-4">Contact</h4>
//             <ul className="space-y-2 text-sm">
//               <li>Adarshsalunkhe0602@gmail.com</li>
//               <li>+91 76665 91912</li>
//               <li>Ghule Nagar, Manjari Pune, Maharashtra, India</li>
//             </ul>
//           </div>
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-sm">
//           <p>&copy; {new Date().getFullYear()} PetCare. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import { Link } from 'react-router-dom';
import Pricing from '../components/Pricing';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  // Grab the user state from your Auth context
  const { user } = useContext(AuthContext);

  // Check if the logged-in user is an admin
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* 2. HERO SECTION */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Professional Care for Your <span className="text-blue-600">Furry Best Friends</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Whether you are stuck at work or going on a vacation, we provide trusted, loving, and reliable pet walking and sitting services right in your neighborhood.
            </p>
            <div className="flex space-x-4">
              {/* SMART BUTTON: Admin Dashboard OR Dashboard OR Register */}
              <Link 
                to={isAdmin ? "/admin" : (user ? "/dashboard" : "/register")} 
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 shadow-lg transition"
              >
                {isAdmin ? "Admin Dashboard" : (user ? "Book Now" : "Book a Sitter")}
              </Link>
              <a href="#services" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg border border-blue-200 hover:bg-blue-50 transition">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Happy dog" 
              className="rounded-2xl shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Trust PetCare?</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-12 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Verified Sitters</h3>
              <p className="text-gray-600">Every pet sitter and walker undergoes a strict background check and hands-on training.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-2">Fear-Free Certified</h3>
              <p className="text-gray-600">We use positive reinforcement and fear-free techniques to ensure your pet is always comfortable.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-2">Live Updates</h3>
              <p className="text-gray-600">Get photo updates, GPS tracking on walks, and detailed report cards after every visit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES & PRICING SECTION */}
      <div id="services">
        <Pricing />
      </div>

      {/* 5. STATIC TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Happy Pets, Happy Parents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
              <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
              <p className="text-gray-600 italic mb-6">"PetCare is a lifesaver! My golden retriever gets so excited when his walker arrives. The daily photos give me so much peace of mind at work."</p>
              <p className="font-bold text-gray-900">- Priya S.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
              <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
              <p className="text-gray-600 italic mb-6">"We booked a sitter for a 3-day weekend. Our cats were perfectly fed, the litter was clean, and they even brought my packages inside. 10/10!"</p>
              <p className="font-bold text-gray-900">- Rahul K.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
              <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
              <p className="text-gray-600 italic mb-6">"Very affordable compared to kennels, and my dog didn't have to deal with the stress of leaving home. Highly recommended."</p>
              <p className="font-bold text-gray-900">- Anjali M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Do I need to be home for the walker?</h4>
              <p className="text-gray-600">Not at all! You can securely provide access instructions (like a lockbox code or hidden key) in your booking notes.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">What if there is an emergency?</h4>
              <p className="text-gray-600">All our sitters are trained in basic pet first-aid. We will immediately contact you and your registered vet if anything seems wrong.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Can I meet the sitter beforehand?</h4>
              <p className="text-gray-600">Yes! We offer a free 15-minute "Meet & Greet" over video call or in-person before your first booked service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="bg-blue-600 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {isAdmin 
            ? "Ready to manage the platform?" 
            : (user ? "Ready to book your next service?" : "Ready to treat your pet?")}
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {isAdmin 
            ? "Head over to the admin dashboard to oversee bookings, manage users, and update platform settings." 
            : (user 
              ? "Your furry friends are waiting! Head to your dashboard to manage your pets and bookings." 
              : "Join hundreds of happy pet parents in your area. Create a free account today and book your first service in seconds.")}
        </p>
        
        {/* SMART CTA BUTTON */}
        {isAdmin ? (
          <Link to="/admin" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-xl inline-block">
            Go to Admin Dashboard
          </Link>
        ) : user ? (
          <Link to="/dashboard" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-xl inline-block">
            Go to Dashboard
          </Link>
        ) : (
          <Link to="/register" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-xl inline-block">
            Create Free Account
          </Link>
        )}
      </section>

      {/* 8. FOOTER */}
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
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
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
              <li> Ghule Nagar Manjari, Pune, Maharashtra, India</li>
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

export default Home;