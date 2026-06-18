import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPet = () => {
  const [formData, setFormData] = useState({
    petName: '', petType: '', breed: '', age: '', weight: '', medicalNotes: ''
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let imageUrl = '';
      // 1. Upload image if provided
      if (file) {
        const uploadData = new FormData();
        uploadData.append('image', file);
        const { data: uploadRes } = await axios.post('/api/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadRes.imageUrl;
      }

      // 2. Create Pet
      await axios.post('/api/pets', { ...formData, image: imageUrl });
      navigate('/pets');
    } catch (error) {
      console.error('Failed to add pet', error);
      alert('Error adding pet. Check console.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Pet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Pet Name *</label>
            <input type="text" name="petName" required onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Pet Type *</label>
            <select name="petType" required onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="">Select...</option>
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
            <input type="text" name="breed" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input type="number" name="age" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Weight (kg)</label>
            <input type="number" step="0.1" name="weight" onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Medical Notes</label>
          <textarea name="medicalNotes" rows="3" onChange={handleChange} className="w-full px-3 py-2 border rounded"></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Pet Photo</label>
          <input type="file" onChange={handleFileChange} accept="image/*" className="w-full" />
        </div>

        <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {uploading ? 'Uploading & Saving...' : 'Save Pet'}
        </button>
      </form>
    </div>
  );
};

export default AddPet;