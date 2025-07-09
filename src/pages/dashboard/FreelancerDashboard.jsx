import { useEffect, useState } from 'react';
import api from '../../services/axios';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';

export default function FreelancerDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    api.get('/proposals/freelancer/')
      .then(res => setProposals(res.data))
      .catch(() => console.error('Failed to load proposals'));
  }, []);

  const navigate = useNavigate();

  const handleStartChat = async (jobId, freelancerId) => {
    try {
      const res = await api.post('/chat/start/', {
        job_id: jobId,
        freelancer_id: freelancerId,
      });
      const roomId = res.data.room_id;
      navigate(`/chat/${roomId}`);
    } catch (err) {
      toast.error('Failed to open chat');
      console.error(err);
    }
  };

  return (
    <DashboardLayout>

        <div className="flex items-center space-x-4 mb-4">
        <img
          src={`https://skillmatchapi.onrender.com${user.profile_picture}`}
          alt="Profile"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.full_name || user.username}</h1>
          <p className="text-gray-600 capitalize">{user.role} dashboard</p>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Your Proposals</h1>

      {proposals.length === 0 ? (
        <p className="text-gray-600">You haven't submitted any proposals yet.</p>
      ) : (
        <ul className="space-y-4">
          {proposals.map((p) => (
            <li key={p.id} className="p-4 border rounded shadow-sm bg-white">
              <h2 className="text-lg font-semibold text-blue-700">{p.job.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{p.cover_letter}</p>

              <div className="mt-2 text-sm text-gray-500">
                Submitted: {new Date(p.submitted_at).toLocaleDateString()} • Score: {p.score}%
              </div>

              <span className={`inline-block mt-2 text-xs font-bold px-2 py-1 rounded ${
                p.status === 'shortlisted'
                  ? 'bg-green-100 text-green-700'
                  : p.status === 'rejected'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-200 text-gray-800'
              }`}>
                {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
              </span>


              {p.status === 'shortlisted' && (
                <button
                    onClick={() => handleStartChat(p.job, p.freelancer.id)}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
                >
                    💬 Send Message
                </button>
                )}
                
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
}

