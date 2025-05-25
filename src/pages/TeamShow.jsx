import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

export default function TeamShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]); // Initialize with an empty array
  const [inviteEmail, setInviteEmail] = useState('');
  const [error, setError] = useState('');

  // Fetch team data when the component mounts
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get(`/api/v1/teams/${id}`);
        if (response.data.status.code === 200) {
          setTeam(response.data.data);
          // You can also fetch members here if needed
        } else {
          setError('Failed to fetch team details');
        }
      } catch (err) {
        setError('Error fetching team details: ' + err.message);
      }
    };

    fetchTeam();
  }, [id]);

  const handleInviteUser = async (e) => {
    e.preventDefault();
    try {
      // Mock API call to add a new member
      const newMember = {
        id: members.length + 1,
        email: inviteEmail,
        role: 'member',
      };
      setMembers([...members, newMember]);
      setInviteEmail('');
      setError('');
    } catch (err) {
      setError('Failed to invite user');
    }
  };

  if (!team) return null; // Show nothing until the team data is fetched

  return (
    <DashboardLayout>
      <div className="flex flex-1 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{team.name}</h2>
              <button
                onClick={() => navigate('/teams')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Back to Teams
              </button>
            </div>

            {/* Invite User Form */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Invite Team Member</h3>
              <form onSubmit={handleInviteUser} className="space-y-4">
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

            {/* Team Members List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{member.email}</p>
                        <p className="text-sm text-gray-600 capitalize">{member.role}</p>
                      </div>
                      {member.role !== 'admin' && (
                        <button
                          className="text-red-600 hover:text-red-800 text-sm"
                          onClick={() => {
                            setMembers(members.filter((m) => m.id !== member.id));
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
} 