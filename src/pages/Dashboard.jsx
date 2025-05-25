// src/pages/Dashboard.jsx
import TeamForm from '../components/TeamForm';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const handleTeamCreated = (team) => {
    alert(`Team created: ${team.name}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Sidebar</h2>
          <ul>
            <li className="mb-2">Home</li>
            <li className="mb-2">Teams</li>
            <li className="mb-2">Settings</li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
          <TeamForm onTeamCreated={handleTeamCreated} />
        </main>
      </div>
      <footer className="bg-white shadow p-4 text-center">
        <p>© 2023 Your Company</p>
      </footer>
    </div>
  );
}