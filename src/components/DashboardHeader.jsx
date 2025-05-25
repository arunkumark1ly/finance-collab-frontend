import { useAuth } from '../context/AuthContext';

export default function DashboardHeader() {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
      </div>
    </header>
  );
}