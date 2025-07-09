import { useEffect, useState } from 'react';
import apiInstance from '../../services/axios';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function ResumeProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    skills: '',
    experience: '',
    education: '',
    resume_file: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  const fetchResume = async () => {
  try {
    const res = await apiInstance.get('/resume/');
    setProfile(res.data);
    setForm({
      skills: res.data.skills || '',
      experience: res.data.experience || '',
      education: res.data.education || '',
      resume_file: null,
    });
  } catch (err) {
    setProfile(null);
  }
};

useEffect(() => {
  fetchResume();
}, []);



  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume_file') {
      setForm({ ...form, resume_file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem('user'));
    e.preventDefault();
    const formData = new FormData();
    formData.append('skills', form.skills);
    formData.append('experience', form.experience);
    formData.append('education', form.education);
    if (form.resume_file instanceof File) {
      formData.append('resume_file', form.resume_file);
    }

    try {
      await apiInstance.put(`/resume/${user.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // await api.put('/resume/', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });     

      setMessage('Resume updated successfully!');
      await fetchResume();
      setEditMode(false);
    } catch (err) {
      setMessage('Failed to update resume.');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Resume Profile</h2>

        {/* ✅ Display success or error message */}
        {message && <p className="mb-4 text-green-600">{message}</p>}

        {/* 👁 View mode */}
        {!editMode && (
          <>
            {profile ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Skills</h3>
                  <p className="text-gray-700">{profile.skills || '—'}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Experience</h3>
                  <p className="text-gray-700">{profile.experience || '—'}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Education</h3>
                  <p className="text-gray-700">{profile.education || '—'}</p>
                </div>
                {profile.resume_file && (
                  <div>
                    <h3 className="font-semibold">Resume File</h3>
                    <a
                      href={`${profile.resume_file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View uploaded resume
                    </a>
                  </div>
                )}

                <button
                  onClick={() => setEditMode(true)}
                  className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit Resume
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  You have not set up your resume profile yet.
                </p>
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Set Up Resume
                </button>
              </div>
            )}
          </>
        )}

        {/* ✍️ Edit mode form */}
        {editMode && (
         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Left Column */}
            <div className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Skills</label>
                    <textarea
                        name="skills"
                        value={form.skills}
                        onChange={handleChange}
                        placeholder="e.g. React, Django, Python"
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Education</label>
                    <input
                        type="text"
                        name="education"
                        value={form.education}
                        onChange={handleChange}
                        placeholder="e.g. BSc in Computer Science"
                        className="w-full border rounded p-2"
                    />
                </div>
                
            </div>

            {/* Right Column */}
            <div className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Experience</label>
                    <textarea
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        placeholder="e.g. 2 years working at XYZ..."
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Resume File</label>
                    <input
                        type="file"
                        name="resume_file"
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        accept=".pdf,.doc,.docx"
                    />
                </div>

               
            </div>

            {/* Buttons (full width under form) */}
            <div className="col-span-1 md:col-span-2 flex space-x-4 mt-4">
                <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                Save
                </button>
                <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
                >
                Cancel
                </button>
            </div>
            </form>

        )}
      </div>
    </DashboardLayout>
  );
}
