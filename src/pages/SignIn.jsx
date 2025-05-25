// src/pages/SignInPage.jsx
import SignInForm from '../components/SignInForm';
import PublicLayout from '../layouts/PublicLayout';

export default function SignInPage() {
  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <SignInForm />
        </div>
      </div>
    </PublicLayout>
  );
}