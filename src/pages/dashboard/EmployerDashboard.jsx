import { useEffect, useState } from 'react';
import api from '../../services/axios';
import DashboardLayout from '../../layouts/DashboardLayout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function EmployerDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');




  const fetchJobs = async () => {
      try {
        const res = await api.get(`/jobs/employer/${user.id}/`);
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to load jobs');
      }
    };

  useEffect(() => {    
    fetchJobs();
  }, [user.id]);

  const fetchProposals = async (jobId) => {
    if (selectedJobId === jobId) {
      // 🔄 Clicking again should close the section
      setSelectedJobId(null);
      setProposals([]);
      return;
    }

    try {
      const res = await api.get(`/jobs/${jobId}/proposals/`);
      setSelectedJobId(jobId);
      setProposals(res.data);
    } catch (err) {
      console.error('Failed to fetch proposals', err);
    }
  };


  const handleStatusUpdate = async (proposalId, status) => {
    try {
      await api.patch(`/proposals/${proposalId}/update/`, { status });
      toast.success(`Proposal ${status}`);
      fetchProposals(selectedJobId); // Refresh proposals
    } catch (err) {
      toast.error('Failed to update proposal status');
    }
  };

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
        <br />
        <br />
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={`https://skillmatch-backend-production.up.railway.app${user.profile_picture}`}
          alt="Profile"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.full_name || user.username}</h1>
          <p className="text-gray-600 capitalize">{user.role} dashboard</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Your Job Posts</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-600">You haven’t posted any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="border rounded p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.required_skills}</p>
                  <p className="text-sm text-gray-500">Budget: ${job.budget}</p>
                </div>
                <button
                  onClick={() => fetchProposals(job.id)}
                  className="text-blue-600 hover:underline"
                >
                  {selectedJobId === job.id ? 'Hide Proposals' : 'View Proposals'}
                </button>

              </div>

              {/* Display proposals if job is selected */}
              {selectedJobId === job.id && (
                <div className="mt-4">
                  <div className="mb-2">
                    <label className="text-sm font-semibold mr-2">Filter:</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="all">All</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <ul className="space-y-2">
                  {proposals
                    .filter((p) => filterStatus === 'all' || p.status === filterStatus)
                    .map((proposal) => (
                      <li key={proposal.id} className="p-3 border rounded bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {proposal.freelancer.full_name || proposal.freelancer.username}
                            </p>
                            <p className="text-gray-700 text-sm mt-1">{proposal.cover_letter}</p>

                            {/* Progress bar below */}
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Match Score</span>
                                <span>{proposal.score}%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded mt-1">
                                <div
                                  className={`h-2 rounded ${
                                    proposal.score >= 80 ? 'bg-green-500' : proposal.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${proposal.score}%` }}
                                />
                              </div>
                            </div>

                          </div>

                          {/* ✅ Status Tag */}
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ml-4 ${
                              proposal.status === 'shortlisted'
                                ? 'bg-green-100 text-green-800'
                                : proposal.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            
                            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                          </span>
                        </div>


                        {/* Buttons */}
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => handleStatusUpdate(proposal.id, 'shortlisted')}
                            className={`px-3 py-1 rounded text-sm ${
                              proposal.status === 'shortlisted'
                                ? 'bg-green-600 text-white'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(proposal.id, 'rejected')}
                            className={`px-3 py-1 rounded text-sm ${
                              proposal.status === 'rejected'
                                ? 'bg-red-600 text-white'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            Reject
                          </button>
                          {proposal.status === 'shortlisted' && (
                            <button
                              onClick={() => handleStartChat(proposal.job, proposal.freelancer.id)}
                              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
                            >
                              💬 Send Message
                            </button>
                          )}

                        </div>
                        
                        {proposal.resume_file ? (
                            <a
                              href={`https://skillmatch-backend-production.up.railway.app${proposal.resume_file}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block text-sm text-blue-600 hover:underline mt-2"
                            >
                              📥 Download Resume
                            </a>
                          ) : (
                            <p className="text-sm text-gray-400 italic">No resume uploaded</p>
                          )}

                      </li>
                    ))}
                </ul>



                </div>
              )}

              {selectedJobId === job.id && proposals.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">No proposals yet.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
}
