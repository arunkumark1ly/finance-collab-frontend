import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Teams from './pages/Teams';
import TeamShow from './pages/TeamShow';
import Expenses from './pages/Expenses';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/teams" element={
        <PrivateRoute>
          <Teams />
        </PrivateRoute>
      } />
      <Route path="/teams/:id" element={
        <PrivateRoute>
          <TeamShow />
        </PrivateRoute>
      } />
      <Route path="/teams/:teamId/expenses" element={
        <PrivateRoute>
          <Expenses />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;