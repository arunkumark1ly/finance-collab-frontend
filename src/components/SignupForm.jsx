// src/components/SignupForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/sign_up', { user: { email, password } });
      if (res.data && res.data.data) {
        navigate('/signin'); // Redirect to sign-in page after successful signup
      } else {
        setError('Invalid response structure');
      }
    } catch (err) {
      setError('Failed to sign up');
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        className="input w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition duration-200">Sign Up</button>
      <p className="text-center mt-4">
        Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>
      </p>
    </form>
  );
}