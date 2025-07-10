import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const handleDashboard = () => {
    if (user?.role === 'employer') navigate('/employer');
    else if (user?.role === 'freelancer') navigate('/freelancer');
    else navigate('/dashboard');
    setMobileOpen(false);
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          SkillMatch
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-2xl text-blue-700 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/docs" className="text-gray-700 hover:text-blue-600">
            Documentation
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          {user ? (
            <>
              <button onClick={handleDashboard} className="text-gray-700 hover:text-blue-600">
                Dashboard
              </button>
              <button onClick={handleLogout} className="text-red-600 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          <Link to="/docs" onClick={() => setMobileOpen(false)} className="block text-gray-700 hover:text-blue-600">
            Documentation
          </Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} className="block text-gray-700 hover:text-blue-600">
            About
          </Link>
          {user ? (
            <>
              <button onClick={handleDashboard} className="block w-full text-left text-gray-700 hover:text-blue-600">
                Dashboard
              </button>
              <button onClick={handleLogout} className="block w-full text-left text-red-600 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="block text-gray-700 hover:text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
