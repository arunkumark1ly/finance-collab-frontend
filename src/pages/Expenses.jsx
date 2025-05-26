// src/pages/Expenses.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Expenses() {
  const { teamId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');
  const [newExpense, setNewExpense] = useState({
    amount: '',
    description: '',
    category: '',
    spent_on: '',
  });

  // Fetch expenses when the component mounts
  const fetchExpenses = async () => {
    try {
      const response = await api.get(`/api/v1/teams/${teamId}/expenses`);
      if (response.status === 200) {
        setExpenses(response.data); // Set expenses data
      } else {
        setError('Failed to fetch expenses');
      }
    } catch (err) {
      setError('Error fetching expenses: ' + err.message);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Call fetchExpenses when the component mounts
  }, [teamId]);

  const handleCreateExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/api/v1/teams/${teamId}/expenses`, {
        expense: newExpense,
      });
      if (response.status === 201) {
        setExpenses([...expenses, response.data]); // Add new expense to the list
        setNewExpense({ amount: '', description: '', category: '', spent_on: '' }); // Reset form
      } else {
        setError('Failed to create expense');
      }
    } catch (err) {
      setError('Error creating expense: ' + err.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await api.delete(`/api/v1/teams/${teamId}/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense.id !== id)); // Remove deleted expense from the list
    } catch (err) {
      setError('Error deleting expense: ' + err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-1 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs 
              items={[
                { label: 'Team', path: `/teams/${teamId}` },
                { label: 'Expenses', path: `/teams/${teamId}/expenses` }
              ]}
            />

            <h2 className="text-2xl font-bold mb-6">Expenses for Team</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* New Expense Form */}
            <form onSubmit={handleCreateExpense} className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Create New Expense</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="number"
                  placeholder="Amount"
                  className="p-2 border border-gray-300 rounded"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="p-2 border border-gray-300 rounded"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="p-2 border border-gray-300 rounded"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  required
                />
                <input
                  type="date"
                  className="p-2 border border-gray-300 rounded"
                  value={newExpense.spent_on}
                  onChange={(e) => setNewExpense({ ...newExpense, spent_on: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
              >
                Add Expense
              </button>
            </form>

            {/* Expenses List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Current Expenses</h3>
                {expenses?.length === 0 ? (
                  <p className="text-gray-500">No expenses recorded yet.</p>
                ) : (
                  <div className="space-y-4">
                    {expenses?.map((expense) => (
                      <div key={expense.id} className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0">
                        <div>
                          <Link to={`/teams/${teamId}/expenses/${expense.id}/audit_log`} className="font-medium text-blue-600 hover:underline">
                            {expense.description}
                          </Link>
                          <p className="text-sm text-gray-600">Amount: ${expense.amount}</p>
                          <p className="text-sm text-gray-600">Category: {expense.category}</p>
                          <p className="text-sm text-gray-600">Spent On: {new Date(expense.spent_on).toLocaleDateString()}</p>
                          {expense.deleted_at && (
                            <p className="text-sm text-gray-600">Deleted: Yes</p>
                          )}
                        </div>
                        {!expense.deleted_at && (
                          <button
                            className="text-red-600 hover:text-red-800 text-sm"
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
