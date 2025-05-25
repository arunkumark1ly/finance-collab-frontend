import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function TeamForm({ onTeamCreated }) {
  const { user } = useAuth();
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
    <form onSubmit={handleCreateTeam} className="bg-white p-4 shadow rounded w-96">
      <h3 className="text-lg font-bold mb-2">Create New Team</h3>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Team Name"
        className="input w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button className="bg-green-600 text-white py-2 px-4 rounded">Create Team</button>
    </form>
  );
}