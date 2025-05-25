import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Sidebar from '../components/Sidebar';
import InviteUserForm from '../components/InviteUserForm';
import api from '../api/axios';

export default function TeamShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]); // Initialize with an empty array
  const [invitations, setInvitations] = useState([]); // Initialize invitations
  const [error, setError] = useState('');

  // Fetch team data when the component mounts
  const fetchTeam = async () => {
    try {
      const response = await api.get(`/api/v1/teams/${id}`);
      if (response.data.status.code === 200) {
        setTeam(response.data.data.team); // Set team details
        setMembers(response.data.data.users); // Set team members
        setInvitations(response.data.data.invitations); // Set team invitations
      } else {
        setError('Failed to fetch team details');
      }
    } catch (err) {
      setError('Error fetching team details: ' + err.message);
    }
  };

  useEffect(() => {
    fetchTeam(); // Call fetchTeam when the component mounts
  }, [id]);

  const handleUserInvited = (email) => {
    console.log(`User invited: ${email}`);
    fetchTeam(); // Refresh the team data to reflect the new member
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

            {/* Use the InviteUserForm component */}
            <InviteUserForm teamId={team.id} onUserInvited={handleUserInvited} />

            {/* Team Members List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                {members.length === 0 ? (
                  <p className="text-gray-500">No team members yet.</p> // Placeholder message
                ) : (
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{member.email}</p>
                          <p className="text-sm text-gray-600 capitalize">Member</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Invitations List */}
            <div className="bg-white rounded-lg shadow mt-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Pending Invitations</h3>
                {invitations.length === 0 ? (
                  <p className="text-gray-500">No pending invitations.</p> // Placeholder message
                ) : (
                  <div className="space-y-4">
                    {invitations.map((invitation) => (
                      <div
                        key={invitation.id}
                        className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{invitation.email}</p>
                          <p className="text-sm text-gray-600">Invited</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
} 