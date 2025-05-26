// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [totalTeams, setTotalTeams] = useState(0);
  const [teamExpenses, setTeamExpenses] = useState({});
  const [error, setError] = useState('');

  // Fetch total number of teams
  const fetchTotalTeams = async () => {
    try {
      const response = await api.get('/api/v1/teams');
      if (response.data.status.code === 200) {
        setTotalTeams(response.data.data.length);
      } else {
        setError('Failed to fetch teams');
      }
    } catch (err) {
      setError('Error fetching teams: ' + err.message);
    }
  };

  // Fetch total expenses per team
  const fetchTeamExpenses = async () => {
    try {
      const response = await api.get('/api/v1/teams');
      const teams = response.data.data;
      const expenses = {};

      for (const team of teams) {
        const expenseResponse = await api.get(`/api/v1/teams/${team.id}/expenses`);
        if (expenseResponse.data) {
          const totalExpense = expenseResponse.data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
          expenses[team.id] = totalExpense;
        }
      }
      setTeamExpenses(expenses);
    } catch (err) {
      setError('Error fetching team expenses: ' + err.message);
    }
  };

  useEffect(() => {
    fetchTotalTeams();
    fetchTeamExpenses();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-1 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, User</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Display Total Number of Teams */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Total Number of Teams</h3>
            <p className="text-2xl font-bold">{totalTeams}</p>
          </div>

          {/* Display Total Expenses per Team */}
          <div>
            <h3 className="text-lg font-semibold">Total Expenses per Team</h3>
            {Object.keys(teamExpenses).length === 0 ? (
              <p className="text-gray-500">No expenses recorded yet.</p>
            ) : (
              <ul className="space-y-2">
                {Object.entries(teamExpenses).map(([teamId, totalExpense]) => (
                  <li key={teamId} className="flex justify-between items-center border-b pb-2">
                    <span>Team ID: {teamId}</span>
                    <span className="font-bold">${totalExpense.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}