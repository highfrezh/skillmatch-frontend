import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function DashboardLayout({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const links = [
    { label: 'Dashboard', to: `/${user.role}` },
    user.role === 'freelancer'
      ? { label: 'My Proposals', to: '/freelancer' }
      : { label: 'Post a Job', to: '/post-job' },
    ...(user.role === 'freelancer' ? [{ label: 'Resume Profile', to: '/resume' }] : []),
    { label: 'Profile', to: '/profile' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Toggle */}
      <button
        className="absolute top-4 left-4 z-50 md:hidden text-2xl text-blue-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 w-64 bg-blue-700 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="text-2xl font-bold p-6 border-b border-blue-600">SkillMatch</div>
        <nav className="flex-grow p-4 space-y-3">
          <Link
            to="/"
            className="block py-2 px-3 rounded hover:bg-blue-600 transition"
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </Link>
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="block py-2 px-3 rounded hover:bg-blue-600 transition"
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/chat"
            className="block py-2 px-3 rounded hover:bg-blue-600 transition"
            onClick={() => setSidebarOpen(false)}
          >
            Messages 💬
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 py-2 m-4 rounded text-center"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
    </div>
  );
}
