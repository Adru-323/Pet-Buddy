import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.get('/api/users/profile');
      setFormData({ name: data.name, email: data.email, phone: data.phone, password: '' });
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('/api/users/profile', formData);
      // Update local storage and context with new details (preserving token)
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
      {message && <p className="text-blue-600 text-sm mb-4">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'phone'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 capitalize">{field}</label>
            <input type={field === 'email' ? 'email' : 'text'} name={field} className="w-full px-3 py-2 border rounded" value={formData[field]} onChange={handleChange} />
          </div>
        ))}
        <div className="mb-6">
          <label className="block text-gray-700">New Password (optional)</label>
          <input type="password" name="password" className="w-full px-3 py-2 border rounded" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4">Update Profile</button>
      </form>
      <button onClick={logout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">Logout</button>
    </div>
  );
};

export default Profile;