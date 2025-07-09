import { Link, useNavigate } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-blue-600">SkillMatch</div>
        <nav className="flex-grow p-4 space-y-3">
          <Link to={'/'} className="block py-2 px-3 rounded hover:bg-blue-600 transition">
              Home
          </Link>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 px-3 rounded hover:bg-blue-600 transition"
            >
              {link.label}
            </Link>
          ))}
          <Link to={'/chat'} className="block py-2 px-3 rounded hover:bg-blue-600 transition">
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

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
