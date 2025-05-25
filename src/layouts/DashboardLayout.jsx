// src/layouts/DashboardLayout.jsx
import DashboardHeader from '../components/DashboardHeader';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 pt-16 pl-52">
        {children}
      </main>
    </div>
  );
}