import { useEffect, useState } from 'react';
import api from '../../services/axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function ChatRoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get('/chat/rooms/')
      .then(res => setRooms(res.data))
      .catch(() => console.error('Failed to load chat rooms'));
  }, []);

  return (
    <>
      <Navbar/>
      <div className="max-w-3xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Your Conversations</h2>

        {rooms.length === 0 ? (
          <p className="text-gray-600">No chat rooms yet.</p>
        ) : (
          <ul className="space-y-3">
            {rooms.map((room) => (
              <li key={room.id} className="border p-3 rounded shadow-sm">
                <Link
                  to={`/chat/${room.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Job: {room.job_title} → View Chat
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
    
  );
}
