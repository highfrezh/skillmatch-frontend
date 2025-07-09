import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          SkillMatch
        </Link>

        <div className="space-x-4">
          {user ? (
            <>
             <button
                onClick={() => {
                  if (user?.role === 'employer') {
                    navigate('/employer');
                  } else if (user?.role === 'freelancer') {
                    navigate('/freelancer');
                  } else {
                    navigate('/dashboard'); // fallback or default
                  }
                }}
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </button>
              <Link to="/docs" className="text-gray-700 hover:text-blue-600">
                Documentaion
              </Link>

              <button onClick={handleLogout} className="text-red-600 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/docs" className="text-gray-700 hover:text-blue-600">
                Documentaion
              </Link>
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
    </nav>
  );
}
