import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/axios';

export default function ChatRoom() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const endRef = useRef();

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/chat/rooms/${roomId}/messages/`);
      setMessages(res.data);
    } catch {
      console.error('Failed to load messages');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await api.post(`/chat/rooms/${roomId}/messages/`, {
        content: input
      });
      setInput('');
      fetchMessages();
    } catch {
      console.error('Failed to send message');
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // refresh every 3s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-xl font-bold mb-4">Chat Room #{roomId}</h2>

      <div className="border rounded h-[400px] overflow-y-auto bg-gray-50 p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === JSON.parse(localStorage.getItem('user')).id ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[70%] p-2 rounded-lg text-sm shadow bg-white border">
              <strong>{msg.sender_full_name}</strong>
              <p>{msg.content}</p>
              <span className="block text-gray-400 text-xs text-right">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
        
        <div ref={endRef}></div>
      </div>

      <form onSubmit={sendMessage} className="flex mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded-l"
        />
        <button className="bg-blue-600 text-white px-4 rounded-r">Send</button>
      </form>
    </div>
  );
}
