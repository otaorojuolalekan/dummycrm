import React, { useEffect, useState } from 'react';
import API_BASE_URL from './apiConfig';

const CasesReport = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/cases`)
      .then(res => res.json())
      .then(data => setCases(data))
      .catch(() => setCases([]));
  }, []);

  const exportCSV = () => {
    if (!cases.length) return;
    const headers = Object.keys(cases[0]);
    const rows = cases.map(row => headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cases_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="landing-container">
      <h1>SRs Report</h1>
      <button onClick={exportCSV} disabled={!cases.length}>Export to CSV</button>
    </div>
  );
};

export default CasesReport;