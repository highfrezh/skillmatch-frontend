import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

export default function JobDetail() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);

   const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}/`);
        setJob(res.data);

        // Check if user already applied (you can change this if you have a separate endpoint)
        if (user?.role === 'freelancer') {
            const res = await api.get(`/jobs/${id}/has-applied/`);
            setHasApplied(res.data.has_applied);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error loading job', err);
        setLoading(false);
      }
    };


  useEffect(() => {   
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/proposals/', {
        job: id,
        cover_letter: coverLetter,
      });
      toast.success('Proposal submitted!');
      setHasApplied(true);
      setCoverLetter('');
    } catch (err) {
    console.error('Proposal submission error:', err.response?.data);
    toast.error(err.response?.data?.detail || 'Failed to submit proposal.');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center text-red-500 mt-10">Job not found</p>;

  return (
    <>
      <Navbar />

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{job.title}</h1>
        <p className="text-gray-600 mb-2"><strong>Budget:</strong> ${job.budget}</p>
        <p className="text-gray-600 mb-2"><strong>Skills:</strong> {job.required_skills}</p>
        <p className="text-gray-600 mb-6"><strong>Status:</strong> {job.status}</p>
        <p className="mb-8">{job.description}</p>

        {user?.role === 'freelancer' && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Apply to this job</h2>
            {hasApplied ? (
                <div className="border border-green-200 bg-green-50 text-green-800 px-4 py-4 rounded shadow-sm">
                    <p className="text-lg font-medium">✅ Proposal Submitted</p>
                    <p className="text-sm mt-1">
                    You have already applied to this job. We’ll notify you if the employer responds.
                    </p>
                </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Write your cover letter here..."
                    required
                    className="w-full border p-2 rounded h-40"
                    />
                    <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                    Submit Proposal
                    </button>
                </form>
            )}

          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
