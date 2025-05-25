// src/pages/Dashboard.jsx
import TeamForm from '../components/TeamForm';
import DashboardLayout from '../layouts/DashboardLayout';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const handleTeamCreated = (team) => {
    alert(`Team created: ${team.name}`);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Sidebar</h2>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li className="mb-2">Teams</li>
            <li className="mb-2">Settings</li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, User</h2>
          <TeamForm onTeamCreated={handleTeamCreated} />
        </main>
      </div>
    </DashboardLayout>
  );
}