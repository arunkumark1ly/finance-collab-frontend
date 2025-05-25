// src/layouts/DashboardLayout.jsx
import DashboardHeader from '../components/DashboardHeader';
import Footer from '../components/Footer';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer isAuthenticated={true} />
    </div>
  );
}