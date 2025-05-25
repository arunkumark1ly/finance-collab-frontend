// src/components/SignInForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function SignInForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/sign_in', { user: { email, password } });
      if (res.data && res.data.data) {
        const token = res.headers['authorization'];
        login(res.data.data, token);
        navigate('/dashboard');
      } else {
        setError('Invalid response structure');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
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
      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition duration-200">Login</button>
    </form>
  );
}