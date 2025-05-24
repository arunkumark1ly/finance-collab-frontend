import TeamForm from '../components/TeamForm';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const handleTeamCreated = (team) => {
    alert(`Team created: ${team.name}`);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Welcome, {user.email}</h2>
        <button onClick={logout} className="text-sm text-red-500">Logout</button>
      </div>
      <TeamForm onTeamCreated={handleTeamCreated} />
    </div>
  );
}