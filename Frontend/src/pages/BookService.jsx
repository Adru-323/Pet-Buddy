
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BookService = () => {
//   const navigate = useNavigate();
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // State to hold the dynamic prices from the database for the frontend estimation
//   const [prices, setPrices] = useState({
//     walk30: 160,
//     walk45: 200,
//     sitHour: 100,
//     sitDay: 1200,
//     boardNight: 800,
//     boardWeek: 5000
//   });

//   const [formData, setFormData] = useState({
//     petId: '',
//     serviceType: '', // Holds the dynamic ID internally (e.g., 'walk30')
//     bookingDate: '', 
//     bookingTime: '', 
//     address: '',
//     notes: ''
//   });
  
//   const [estimatedTotal, setEstimatedTotal] = useState(0);

//   // Get today's date in YYYY-MM-DD format to prevent past dates
//   const today = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const petsRes = await axios.get('/api/pets/my-pets');
//         setPets(petsRes.data);
        
//         const priceRes = await axios.get('/api/pricing');
//         if (priceRes.data) {
//           setPrices(priceRes.data);
//         }
//       } catch (error) {
//         console.error('Error fetching data for booking', error);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   // Create dynamic service options using the fetched prices
//   const serviceOptions = [
//     { id: 'walk30', label: `Walking - 30 Minutes - ₹${prices.walk30}`, price: prices.walk30 },
//     { id: 'walk45', label: `Walking - 45 Minutes - ₹${prices.walk45}`, price: prices.walk45 },
//     { id: 'sitHour', label: `Sitting - Hourly - ₹${prices.sitHour}`, price: prices.sitHour },
//     { id: 'sitDay', label: `Sitting - Full Day - ₹${prices.sitDay}`, price: prices.sitDay },
//     { id: 'boardNight', label: `Boarding - Per Night - ₹${prices.boardNight}`, price: prices.boardNight },
//     { id: 'boardWeek', label: `Boarding - 1 Week - ₹${prices.boardWeek}`, price: prices.boardWeek },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Instantly update the estimated total when a service is selected
//     if (name === 'serviceType') {
//       const selectedOption = serviceOptions.find(opt => opt.id === value);
//       setEstimatedTotal(selectedOption ? selectedOption.price : 0);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1. Get the readable text of the package (e.g., "Walking - 45 Minutes - ₹200")
//     const selectedOption = serviceOptions.find(opt => opt.id === formData.serviceType);
//     const packageText = selectedOption ? selectedOption.label.split(' - ₹')[0] : 'Custom Service';

//     // 2. Map the dynamic ID back to the EXACT enum string the backend schema expects
//     // We check what the dynamic ID starts with to map it correctly.
//     let strictServiceType = '';
//     if (formData.serviceType.startsWith('walk')) {
//         strictServiceType = 'Walking';
//     } else if (formData.serviceType.startsWith('sit')) {
//         strictServiceType = 'Sitting';
//     } else if (formData.serviceType.startsWith('board')) {
//         strictServiceType = 'Boarding';
//     }

//     // Safety check - if we couldn't map it, don't submit and warn the user
//     if (!strictServiceType) {
//         alert("Please select a valid service package.");
//         return;
//     }

//     // 3. Inject the specific package details into the notes so the admin sees what was ordered
//     const finalNotes = `Requested Package: ${packageText}.\nCustomer Notes: ${formData.notes}`;

//     try {
//       // Send the mapped 'strictServiceType' instead of the raw 'walk45' ID
//       await axios.post('/api/bookings', {
//         petId: formData.petId,
//         serviceType: strictServiceType, // MUST be "Walking", "Sitting", or "Boarding"
//         bookingDate: formData.bookingDate,
//         bookingTime: formData.bookingTime,
//         address: formData.address,
//         notes: finalNotes,
//         totalPrice: estimatedTotal // The updated controller expects this
//       });
      
//       alert('Booking confirmed successfully!');
//       navigate('/bookings');
//     } catch (error) {
//       console.error('Detailed Error:', error.response?.data || error);
      
//       let backendError = "Unknown error occurred.";
//       if (error.response?.data) {
//         backendError = JSON.stringify(error.response.data, null, 2);
//       } else {
//         backendError = error.message;
//       }

//       alert(`Backend rejected the booking!\nReason: ${backendError}`);
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading booking form...</div>;

//   return (
//     <div className="max-w-3xl mx-auto mt-10 px-4 mb-20">
//       <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">Book a Service</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
          
//           {/* Select Pet */}
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">Select Pet *</label>
//             <select 
//               name="petId" 
//               value={formData.petId} 
//               onChange={handleChange} 
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
//               required
//             >
//               <option value="">Select a pet...</option>
//               {pets.map(pet => (
//                 <option key={pet._id} value={pet._id}>{pet.petName} ({pet.petType})</option>
//               ))}
//             </select>
//             {pets.length === 0 && (
//               <p className="text-red-500 text-sm mt-1">You need to add a pet to your profile first!</p>
//             )}
//           </div>

//           {/* Select Service Type */}
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">Service Package *</label>
//             <select 
//               name="serviceType" 
//               value={formData.serviceType} 
//               onChange={handleChange} 
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
//               required
//             >
//               <option value="">Select Package...</option>
//               {serviceOptions.map(option => (
//                 <option key={option.id} value={option.id}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Date & Time Pickers */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">Booking Date *</label>
//               <input 
//                 type="date" 
//                 name="bookingDate" 
//                 min={today}
//                 value={formData.bookingDate} 
//                 onChange={handleChange} 
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">Booking Time *</label>
//               <input 
//                 type="time" 
//                 name="bookingTime" 
//                 value={formData.bookingTime} 
//                 onChange={handleChange} 
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                 required
//               />
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">Address *</label>
//             <input 
//               type="text" 
//               name="address" 
//               value={formData.address} 
//               onChange={handleChange} 
//               placeholder="Full address for pickup/sitting"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               required
//             />
//           </div>

//           {/* Special Notes */}
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-2">Special Notes</label>
//             <textarea 
//               name="notes" 
//               value={formData.notes} 
//               onChange={handleChange} 
//               placeholder="Access instructions, pet behavior, etc."
//               rows="3"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//             ></textarea>
//           </div>

//           {/* Estimated Total */}
//           <div className="bg-green-50 p-4 rounded-lg flex justify-end items-center border border-green-100 mt-6">
//             <span className="text-gray-700 font-medium mr-4">Estimated Total:</span>
//             <span className="text-3xl font-bold text-green-600">₹{estimatedTotal}</span>
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             className="w-full bg-[#4F46E5] text-white font-bold py-4 rounded-lg hover:bg-indigo-700 transition shadow-md"
//             disabled={pets.length === 0}
//           >
//             Confirm Booking
//           </button>
          
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookService;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookService = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State to hold the dynamic prices from the database for the frontend estimation
  const [prices, setPrices] = useState({
    walk30: 160,
    walk45: 200,
    sitHour: 100,
    sitDay: 1200,
    boardNight: 800,
    boardWeek: 5000
  });






  const [formData, setFormData] = useState({
    petId: '',
    serviceType: '', 
    frequency: 'once', // Default to once a day
    startDate: '', 
    endDate: '', 
    bookingTime: '', 
    address: '',
    notes: ''
  });


  
  
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  // Get today's date in YYYY-MM-DD format to prevent past dates
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const petsRes = await axios.get('/api/pets/my-pets');
        setPets(petsRes.data);
        
        const priceRes = await axios.get('/api/pricing');
        if (priceRes.data) {
          setPrices(priceRes.data);
        }
      } catch (error) {
        console.error('Error fetching data for booking', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Create dynamic service options using the fetched prices
  const serviceOptions = [
    { id: 'walk30', label: `Walking - 30 Minutes - ₹${prices.walk30}`, price: prices.walk30 },
    { id: 'walk45', label: `Walking - 45 Minutes - ₹${prices.walk45}`, price: prices.walk45 },
    { id: 'sitHour', label: `Sitting - Hourly - ₹${prices.sitHour}`, price: prices.sitHour },
    { id: 'sitDay', label: `Sitting - Full Day - ₹${prices.sitDay}`, price: prices.sitDay },
    { id: 'boardNight', label: `Boarding - Per Night - ₹${prices.boardNight}`, price: prices.boardNight },
    { id: 'boardWeek', label: `Boarding - 1 Week - ₹${prices.boardWeek}`, price: prices.boardWeek },
  ];

  // Helper function to calculate the total based on dates and frequency
  const calculateTotal = (data) => {
    if (!data.serviceType || !data.startDate) {
      setEstimatedTotal(0);
      return;
    }

    const selectedOption = serviceOptions.find(opt => opt.id === data.serviceType);
    if (!selectedOption) return;

    let days = 1;
    if (data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      const timeDiff = end.getTime() - start.getTime();
      
      // Calculate number of days (inclusive of the start day)
      days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 
      
      if (days < 1) days = 1; // Fallback
    }

    // Double the price if they select twice a day
    let multiplier = data.frequency === 'twice' ? 2 : 1;

    setEstimatedTotal(selectedOption.price * days * multiplier);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // If start date changes, make sure end date doesn't fall behind it
    if (name === 'startDate' && updatedData.endDate) {
      const start = new Date(value);
      const end = new Date(updatedData.endDate);
      if (start > end) {
        updatedData.endDate = value; // Auto-fix end date
      }
    }

    setFormData(updatedData);
    
    // Instantly recalculate the total cost
    calculateTotal(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Get readable text
    const selectedOption = serviceOptions.find(opt => opt.id === formData.serviceType);
    const packageText = selectedOption ? selectedOption.label.split(' - ₹')[0] : 'Custom Service';

    // 2. Map strict backend schema types
    let strictServiceType = '';
    if (formData.serviceType.startsWith('walk')) strictServiceType = 'Walking';
    else if (formData.serviceType.startsWith('sit')) strictServiceType = 'Sitting';
    else if (formData.serviceType.startsWith('board')) strictServiceType = 'Boarding';

    if (!strictServiceType) {
        alert("Please select a valid service package.");
        return;
    }

    try {
      // Send data natively to match your new expanded backend schema
      await axios.post('/api/bookings', {
        petId: formData.petId,
        serviceType: strictServiceType, // Maps to backend schema ('Walking', 'Sitting')
        packageName: packageText,       // Maps to new 'packageName' schema (e.g. 'Walking - 30 Minutes')
        bookingDate: formData.startDate,// Maps to new 'bookingDate' schema
        endDate: formData.endDate,      // Maps to new 'endDate' schema
        bookingTime: formData.bookingTime, 
        frequency: formData.frequency,  // Maps to new 'frequency' schema ('once' or 'twice')
        address: formData.address,
        notes: formData.notes,          // Keeps actual user notes clean!
        totalPrice: estimatedTotal 
      });
      
      alert('Booking confirmed successfully!');
      navigate('/bookings');
    } catch (error) {
      console.error('Detailed Error:', error.response?.data || error);
      alert(`Backend rejected the booking!\nReason: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading booking form...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 mb-20">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Book a Service</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Select Pet */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Select Pet *</label>
            <select 
              name="petId" 
              value={formData.petId} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              required
            >
              <option value="">Select a pet...</option>
              {pets.map(pet => (
                <option key={pet._id} value={pet._id}>{pet.petName} ({pet.petType})</option>
              ))}
            </select>
            {pets.length === 0 && (
              <p className="text-red-500 text-sm mt-1">You need to add a pet to your profile first!</p>
            )}
          </div>

          {/* Service & Frequency Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Service Package *</label>
              <select 
                name="serviceType" 
                value={formData.serviceType} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                required
              >
                <option value="">Select Package...</option>
                {serviceOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Frequency *</label>
              <select 
                name="frequency" 
                value={formData.frequency} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                required
              >
                <option value="once">Once a day</option>
                <option value="twice">Twice a day</option>
              </select>
            </div>
          </div>

          {/* Dates & Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Start Date *</label>
              <input 
                type="date" 
                name="startDate" 
                min={today}
                value={formData.startDate} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">End Date *</label>
              <input 
                type="date" 
                name="endDate" 
                min={formData.startDate || today}
                value={formData.endDate} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Time (AM/PM) *</label>
              <input 
                type="time" 
                name="bookingTime" 
                value={formData.bookingTime} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Address *</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              placeholder="Full address for pickup/sitting"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Special Notes */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Special Notes</label>
            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              placeholder="Access instructions, pet behavior, etc."
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Estimated Total */}
          <div className="bg-green-50 p-4 rounded-lg flex justify-end items-center border border-green-100 mt-6">
            <span className="text-gray-700 font-medium mr-4">Estimated Total:</span>
            <span className="text-3xl font-bold text-green-600">₹{estimatedTotal}</span>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-[#4F46E5] text-white font-bold py-4 rounded-lg hover:bg-indigo-700 transition shadow-md"
            disabled={pets.length === 0}
          >
            Confirm Booking
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default BookService;