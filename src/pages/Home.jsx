import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import api from '../services/axios'

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');


 const fetchOpenJobs = async (page = 1, query = '') => {
  try {
    const res = await api.get(`/jobs/?search=${query}&page=${page}`);
    setJobs(res.data.results);
    setNext(res.data.next);
    setPrevious(res.data.previous);
    setPage(page);
  } catch (err) {
    console.error('Failed to fetch jobs');
  }
};


  useEffect(() => {
    fetchOpenJobs();
  }, []);

  return (
    <>
      <Navbar />

      <section className="bg-blue-50 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Welcome to SkillMatch
          </h1>
          <p className="text-lg text-gray-700">
            Connect small businesses with talented freelancers across Africa. Post jobs, apply for remote gigs, and build your dream team.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Open Jobs</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                setSearchTerm(e.target.value);
                fetchOpenJobs(1, e.target.value); // Reset to page 1 when searching
                }}
                placeholder="Search jobs..."
                className="border p-2 rounded w-64"
            />
        </div>


        {jobs.length === 0 ? (
          <p className="text-gray-600">No open jobs available right now.</p>
        ) : (
            <>
                <div className="grid md:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                    <div key={job.id} className="border p-4 rounded shadow-sm bg-white">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <p className="text-gray-600 mt-1">Skills: {job.required_skills}</p>
                        <p className="text-gray-500 mt-1">Budget: ${job.budget}</p>
                        <Link
                        to={`/jobs/${job.id}`}
                        className="inline-block mt-4 text-blue-600 hover:underline"
                        >
                        View Details →
                        </Link>
                    </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8 space-x-4">
                    <button
                        onClick={() => previous && fetchOpenJobs(page - 1, searchTerm)}
                        disabled={!previous}
                        className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-600 mt-2">{page}</span>
                    <button
                        onClick={() => next && fetchOpenJobs(page + 1, searchTerm)}
                        disabled={!next}
                        className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </>


        )}
      </section>

      <Footer />
    </>
  );
}
