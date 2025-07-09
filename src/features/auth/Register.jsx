import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Register() {

  const [form, setForm] = useState({
    email: '', username: '', password: '', password2: '',
    full_name: '', country: '', role: 'freelancer'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const res = await api.post('/register/', form);
        toast.success('Account created! Redirecting to login...');
        setTimeout(() => {
        navigate('/login'); // redirect to login
        }, 2000);
        } catch (err) {
            toast.error('Registration failed. Please check your input.');
        }
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 rounded-xl shadow-lg bg-white">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Create Account</h2>
        <p className="text-gray-600 mb-6 text-center">Join SkillMatch and start connecting!</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="full_name" placeholder="Full Name" onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-blue-400" />
          <input name="username" placeholder="Username" onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-blue-400" />
          <input name="email" placeholder="Email" onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-blue-400" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-blue-400" />
          <input name="password2" type="password" placeholder="Confirm Password" onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-blue-400" />
          <input name="country" placeholder="Country" onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-blue-400" />
          <select name="role" onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-blue-400">
            <option value="freelancer">Freelancer</option>
            <option value="employer">Employer</option>
          </select>
          <button type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded">
            Register
          </button>
        </form>
        {message && <p className="text-green-600 text-sm mt-3 text-center">{message}</p>}
        {error && <p className="text-red-600 text-sm mt-3 text-center">{error}</p>}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already registered? <Link to="/" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
