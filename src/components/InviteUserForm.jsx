// src/components/InviteUserForm.jsx
import { useState } from 'react';
import api from '../api/axios';

export default function InviteUserForm({ teamId, onUserInvited }) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInviteUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/api/v1/teams/${teamId}/invitations`, {
        email: inviteEmail,
      });

      if (response.data.message) {
        setMessage(response.data.message);
        onUserInvited(inviteEmail);
        setInviteEmail('');
        setError('');
      } else {
        setError('Failed to invite user');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Error inviting user: ' + err.message);
      }
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Invite Team Member</h3>
      <form onSubmit={handleInviteUser} className="space-y-4">
        {message && <div className="text-green-500 text-sm">{message}</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Enter email address"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
          >
            Invite
          </button>
        </div>
      </form>
    </div>
  );
}