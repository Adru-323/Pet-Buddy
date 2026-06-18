// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const PetList = () => {
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPets = async () => {
//     try {
//       const { data } = await axios.get('/api/pets/my-pets');
//       setPets(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching pets', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   const deleteHandler = async (id) => {
//     if (window.confirm('Are you sure you want to delete this pet?')) {
//       try {
//         await axios.delete(`/api/pets/${id}`);
//         fetchPets(); // Refresh list
//       } catch (error) {
//         console.error('Error deleting pet', error);
//       }
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-6xl mx-auto mt-10 px-4">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">My Pets</h2>
//         <Link to="/add-pet" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//           + Add New Pet
//         </Link>
//       </div>

//       {pets.length === 0 ? (
//         <p className="text-gray-600">You haven't added any pets yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {pets.map((pet) => (
//             <div key={pet._id} className="bg-white border rounded-lg shadow-md overflow-hidden">
//               <img 
//                 src={pet.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
//                 alt={pet.petName} 
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold">{pet.petName}</h3>
//                 <p className="text-gray-600">{pet.petType} - {pet.breed}</p>
//                 <div className="mt-4 flex space-x-2">
//                   <Link to={`/edit-pet/${pet._id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
//                     Edit
//                   </Link>
//                   <button onClick={() => deleteHandler(pet._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PetList;



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      const { data } = await axios.get('/api/pets/my-pets');
      setPets(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pets', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await axios.delete(`/api/pets/${id}`);
        fetchPets(); // Refresh list
      } catch (error) {
        console.error('Error deleting pet', error);
      }
    }
  };

  // Helper function to safely extract the image URL
  const getImageUrl = (pet) => {
    // Check all possible names the backend might use
    const img = pet.image || pet.imageUrl || pet.photo;
    
    // Make sure it's an actual web link (starts with http) and not [object Object]
    if (img && typeof img === 'string' && img.startsWith('http')) {
      return img;
    }
    // If it's broken, return a clean placeholder
    return 'https://via.placeholder.com/300x200?text=No+Photo';
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Pets</h2>
        <Link to="/add-pet" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-sm transition-colors">
          + Add New Pet
        </Link>
      </div>

      {pets.length === 0 ? (
        <div className="bg-gray-50 border rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't added any pets yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              
              {/* Using our bulletproof image helper! */}
              <img 
                src={getImageUrl(pet)} 
                alt={pet.petName} 
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">{pet.petName}</h3>
                <p className="text-gray-600">{pet.petType} - {pet.breed}</p>
                <div className="mt-4 flex space-x-2">
                  <Link to={`/edit-pet/${pet._id}`} className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 text-sm font-medium transition-colors">
                    Edit
                  </Link>
                  <button onClick={() => deleteHandler(pet._id)} className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-sm font-medium transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetList;