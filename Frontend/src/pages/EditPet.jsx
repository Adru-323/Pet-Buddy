import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petName: '', petType: '', breed: '', age: '', weight: '', medicalNotes: '', image: ''
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const { data } = await axios.get(`/api/pets/${id}`);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching pet data', error);
      }
    };
    fetchPet();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let imageUrl = formData.image;
      
      // Upload new image if a file was selected
      if (file) {
        const uploadData = new FormData();
        uploadData.append('image', file);
        const { data: uploadRes } = await axios.post('/api/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadRes.imageUrl;
      }

      await axios.put(`/api/pets/${id}`, { ...formData, image: imageUrl });
      navigate('/pets');
    } catch (error) {
      console.error('Failed to update pet', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Pet: {formData.petName}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Same form fields as AddPet */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Pet Name *</label>
            <input type="text" name="petName" value={formData.petName} required onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Pet Type *</label>
            <select name="petType" value={formData.petType} required onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700">Breed</label>
            <input type="text" name="breed" value={formData.breed || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input type="number" name="age" value={formData.age || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Weight (kg)</label>
            <input type="number" step="0.1" name="weight" value={formData.weight || ''} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Medical Notes</label>
          <textarea name="medicalNotes" value={formData.medicalNotes || ''} rows="3" onChange={handleChange} className="w-full px-3 py-2 border rounded"></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Update Pet Photo</label>
          <input type="file" onChange={handleFileChange} accept="image/*" className="w-full mb-2" />
          {formData.image && !file && (
            <img src={formData.image} alt="Current pet" className="h-24 w-24 object-cover rounded" />
          )}
        </div>

        <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {uploading ? 'Updating...' : 'Update Pet'}
        </button>
      </form>
    </div>
  );
};

export default EditPet;