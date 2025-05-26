// src/pages/AuditLog.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import DashboardLayout from '../layouts/DashboardLayout';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AuditLog() {
  const { teamId, expenseId } = useParams();
  const [auditLogs, setAuditLogs] = useState([]);
  const [error, setError] = useState('');

  const fetchAuditLogs = async () => {
    try {
      const response = await api.get(`/api/v1/teams/${teamId}/expenses/${expenseId}/audit_trail`);
      if (response.data) {
        setAuditLogs(response.data);
      } else {
        setError('Failed to fetch audit logs');
      }
    } catch (err) {
      setError('Error fetching audit logs: ' + err.message);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [teamId, expenseId]);

  return (
    <DashboardLayout>
      <div className="flex flex-1 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <Breadcrumbs 
              items={[
                { label: 'Team', path: `/teams/${teamId}` },
                { label: 'Expenses', path: `/teams/${teamId}/expenses` },
                { label: 'Audit Log', path: '#' }
              ]}
            />

            <h2 className="text-2xl font-bold mb-6">Audit Log for Expense ID: {expenseId}</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Audit Log List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                {auditLogs.length === 0 ? (
                  <p className="text-gray-500">No audit logs available.</p>
                ) : (
                  <div className="space-y-4">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <p className="font-medium">Action: {log.action}</p>
                        <p className="text-sm text-gray-600">Changed By: {log.changed_by.email}</p>
                        <p className="text-sm text-gray-600">Created At: {new Date(log.created_at).toLocaleString()}</p>
                        <div>
                          <h4 className="font-semibold">Previous Data:</h4>
                          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(log.previous_data, null, 2)}</pre>
                          <h4 className="font-semibold">New Data:</h4>
                          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(log.new_data, null, 2)}</pre>
                        </div>
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
