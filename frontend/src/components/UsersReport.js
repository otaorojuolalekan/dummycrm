import React, { useEffect, useState } from 'react';
import API_BASE_URL from './apiConfig';

const UsersReport = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/user_list`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  const exportCSV = () => {
    if (!users.length) return;
    const headers = Object.keys(users[0]);
    const rows = users.map(row => headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="landing-container">
      <h1>Users Report</h1>
      <button onClick={exportCSV} disabled={!users.length}>Export to CSV</button>
    </div>
  );
};

export default UsersReport;