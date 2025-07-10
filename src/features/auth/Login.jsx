import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await api.post('/token/', form);
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    localStorage.setItem('user', JSON.stringify(res.data));
    toast.success('Login successful!');
    setTimeout(() => {
      if (res.data.role === 'freelancer') {
        navigate('/');
      } else {
        navigate('/');
      }
    }, 1000);
  } catch (err) {
    toast.error('Invalid login credentials');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 rounded-xl shadow-lg bg-white">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Welcome Back</h2>
        <p className="text-gray-600 mb-6 text-center">Login to your SkillMatch account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email" onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-blue-400" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-blue-400" />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

        </form>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        <p className="text-sm text-center text-gray-600 mt-4">
          New here? <Link to="/register" className="text-blue-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
