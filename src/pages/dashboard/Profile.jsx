import { useEffect, useState } from 'react';
import api from '../../services/axios';
import DashboardLayout from '../../layouts/DashboardLayout';
import { toast } from 'react-toastify';

export default function Profile() {
  const [form, setForm] = useState({
    // username: '',
    full_name: '',
    country: '',
    bio: '',
    profile_picture: null,
  });
  const [userData, setUserData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile/');
        setUserData(res.data);
        setForm({
          username: res.data.username || '',
          full_name: res.data.full_name || '',
          country: res.data.country || '',
          bio: res.data.bio || '',
          profile_picture: null,
        });
        setPreview(res.data.profile_picture || null);
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      const file = files[0];
      setForm({ ...form, profile_picture: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('full_name', form.full_name);
    formData.append('country', form.country);
    formData.append('bio', form.bio);
    if (form.profile_picture) {
      formData.append('profile_picture', form.profile_picture);
    }

    try {
      const res = await api.put('/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Profile updated successfully!');
      setUserData(res.data);
      setEditMode(false);
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <DashboardLayout>
        <br />
        <br />
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        {/* Profile Picture (always visible) */}
        {preview && (
          <img
            src={
              form.profile_picture
                ? preview
                : `https://skillmatch-backend-production.up.railway.app${preview}`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4 border"
          />
        )}

        {/* 👁 View Mode */}
        {!editMode && userData && (
          <div className="space-y-2">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Full Name:</strong> {userData.full_name || '—'}</p>
            <p><strong>Country:</strong> {userData.country || '—'}</p>
            <p><strong>Bio:</strong> {userData.bio || '—'}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* ✏️ Edit Mode */}
        {editMode && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="file"
              name="profile_picture"
              onChange={handleChange}
              className="w-full border p-2 rounded"
              accept="image/*"
            />
            {/* <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Username"
              required
            /> */}
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Full Name"
            />
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Country"
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Short Bio"
            />
            <div className="flex space-x-4">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
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
