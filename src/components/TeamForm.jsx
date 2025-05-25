// src/components/TeamForm.jsx
import { useState } from 'react';
import api from '../api/axios';

export default function TeamForm({ onTeamCreated }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/v1/teams', { team: { name } });
      onTeamCreated(res.data);
      setName('');
    } catch (err) {
      console.error('Error creating team:', err);
      setError('Failed to create team');
    }
  };

  return (
    <form onSubmit={handleCreateTeam} className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
      <h3 className="text-lg font-bold mb-2">Create New Team</h3>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Team Name"
        className="input w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200">Create Team</button>
    </form>
  );
}