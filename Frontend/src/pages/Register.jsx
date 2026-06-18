import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



//  input ko liya form se aur register ko passs kiya AuthContext
const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        {['name', 'email', 'phone', 'password'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 capitalize">{field}</label>
            <input 
              type={field === 'password' || field === 'email' ? field : 'text'} 
              name={field}
              required 
              className="w-full px-3 py-2 border rounded" 
              value={formData[field]} 
              onChange={handleChange} 
            />
          </div>
        ))}
        
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;