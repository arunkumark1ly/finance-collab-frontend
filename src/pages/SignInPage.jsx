// src/pages/SignInPage.jsx
import SignInForm from '../components/SignInForm';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        <SignInForm />
      </div>
    </div>
  );
}