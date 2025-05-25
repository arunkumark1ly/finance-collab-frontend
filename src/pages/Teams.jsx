import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamForm from '../components/TeamForm';
import DashboardLayout from '../layouts/DashboardLayout';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get('/api/v1/teams');
        if (response.data.status.code === 200) {
          setTeams(response.data.data);
        } else {
          setError('Failed to fetch teams');
        }
      } catch (err) {
        setError('Error fetching teams: ' + err.message);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamCreated = (team) => {
    console.log('New team created:', team);
    setTeams([...teams, team]);
    navigate(`/teams/${team.id}`);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-1 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Teams</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            {/* Team Form */}
            <div className="mb-8">
              <TeamForm onTeamCreated={handleTeamCreated} />
            </div>

            {/* Teams List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Teams</h3>
                <div className="space-y-4">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/teams/${team.id}`)}
                    >
                      <h4 className="font-medium text-lg">{team.name}</h4>
                      <p className="text-sm text-gray-600">
                        Created at: {new Date(team.created_at).toLocaleString()}
                      </p>
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