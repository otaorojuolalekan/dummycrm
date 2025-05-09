import React, { useEffect, useState } from 'react';
import API_BASE_URL from './apiConfig';

const UpdatesReport = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/updates`)
      .then(res => res.json())
      .then(data => setUpdates(data))
      .catch(() => setUpdates([]));
  }, []);

  const exportCSV = () => {
    if (!updates.length) return;
    const headers = Object.keys(updates[0]);
    const rows = updates.map(row => headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'updates_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="landing-container">
      <h1>Updates Report</h1>
      <button onClick={exportCSV} disabled={!updates.length}>Export to CSV</button>
    </div>
  );
};

export default UpdatesReport;