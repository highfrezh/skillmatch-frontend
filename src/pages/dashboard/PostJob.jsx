import { useEffect, useState } from 'react';
import apiInstance from '../../services/axios';
import DashboardLayout from '../../layouts/DashboardLayout';
import { toast } from 'react-toastify';

export default function PostJob() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    required_skills: '',
    budget: '',
  });
  const [editingJobId, setEditingJobId] = useState(null);

const fetchJobs = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await apiInstance.get(`/jobs/employer/${user.id}/`);
    setJobs(res.data);
  } catch (err) {
    toast.error('Failed to load jobs');
    console.error(err.response?.data || err.message);
  }
};


  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingJobId) {
      // UPDATE
      await apiInstance.put(`/jobs/${editingJobId}/`, form);
      toast.success('Job updated successfully!');
      setEditingJobId(null);
    } else {
      // CREATE
      await apiInstance.post('/jobs/', form);
      toast.success('Job posted successfully!');
    }

    setForm({ title: '', description: '', required_skills: '', budget: '' });
    fetchJobs();
  } catch (err) {
    console.error(err.response?.data);
    toast.error('Job submission failed');
  }
};


  const handleEdit = (job) => {
  setForm({
    title: job.title,
    description: job.description,
    required_skills: job.required_skills,
    budget: job.budget,
  });
  setEditingJobId(job.id);
};

const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this job?")) {
    try {
      await apiInstance.delete(`/jobs/${id}/`);
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (err) {
      toast.error('Failed to delete job');
      console.error(err.response?.data);
    }
  }
};


  return (
    <DashboardLayout>
        <br />
        <br />
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="required_skills"
            placeholder="Required Skills (comma separated)"
            value={form.required_skills}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            step="0.01"
            name="budget"
            placeholder="Budget ($)"
            value={form.budget}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded">
            Post Job
          </button>
        </form>

        {/* Job List */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">Your Jobs</h3>
          {jobs.length === 0 ? (
            <p className="text-gray-600">You haven't posted any jobs yet.</p>
          ) : (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border rounded shadow-sm">
                <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Skills</th>
                    <th className="p-3 text-left">Budget</th>
                    <th className="p-3 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job) => (
                    <tr key={job.id} className="border-t">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.required_skills}</td>
                    <td className="p-3">${job.budget}</td>
                    <td className="p-3 space-x-2">
                        <button
                        onClick={() => handleEdit(job)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(job.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
