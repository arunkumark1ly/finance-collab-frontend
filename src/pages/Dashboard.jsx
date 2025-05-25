// src/pages/Dashboard.jsx
import TeamForm from '../components/TeamForm';
import DashboardLayout from '../layouts/DashboardLayout';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-1 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, User</h2>
          <TeamForm />
        </main>
      </div>
    </DashboardLayout>
  );
}