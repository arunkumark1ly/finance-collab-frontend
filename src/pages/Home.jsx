// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PublicLayout from '../layouts/PublicLayout';
import SignupForm from '../components/SignupForm';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if user is logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Sign up to get started!</h2>
          <SignupForm />
        </div>
      </div>
    </PublicLayout>
  );
}