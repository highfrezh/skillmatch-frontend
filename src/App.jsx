import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import FreelancerDashboard from './pages/dashboard/FreelancerDashboard';
import EmployerDashboard from './pages/dashboard/EmployerDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import ResumeProfile from './pages/dashboard/ResumeProfile';
import PostJob from './pages/dashboard/PostJob';
import Profile from './pages/dashboard/Profile';
import Home from './pages/Home';
import About from './pages/About';
import Documentation from './pages/Doc'
import JobDetail from './pages/JobDetail';
import ChatRoomList from './pages/chat/ChatRoomList';
import ChatRoom from './pages/chat/ChatRoom';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Freelancer Dashboard */}
        <Route
          path="/freelancer"
          element={
            <ProtectedRoute role="freelancer">
              <FreelancerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Employer Dashboard */}
        <Route
          path="/employer"
          element={
            <ProtectedRoute role="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute role="freelancer">
              <ResumeProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute role="employer">
              <PostJob />
            </ProtectedRoute>
          }
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home />} />
        {/* <Route path="/jobs/:id" element={<JobDetail />} /> */}

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetail />
            </ProtectedRoute>
          }
        />

        <Route path="/chat" element={<ChatRoomList />} />
        <Route path="/chat/:roomId" element={<ChatRoom />} />

        <Route path="/docs" element={<Documentation />} />
        <Route path="/about" element={<About />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
