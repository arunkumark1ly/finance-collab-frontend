import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function SignInForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      login(res.data.user, res.data.token);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSignIn} className="bg-white p-6 rounded shadow w-80">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        className="input w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="input w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
    </form>
  );
}