import React, { useEffect, useState } from 'react';
import API_BASE_URL from './apiConfig';

const AccountsReport = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/accounts`)
      .then(res => res.json())
      .then(data => setAccounts(Array.isArray(data) ? data : []))
      .catch(() => setAccounts([]));
  }, []);

  const exportCSV = () => {
    if (!accounts.length) return;
    const headers = Object.keys(accounts[0]);
    const rows = accounts.map(acc =>
      headers.map(h => `"${(acc[h] ?? '').toString().replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accounts_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="landing-container">
      <h1>Accounts Report</h1>
      <button onClick={exportCSV} disabled={!accounts.length}>Export to CSV</button>
      {accounts.length > 0 && (
        <table border="1" cellPadding="4" style={{marginTop: 20}}>
          <thead>
            <tr>
              {Object.keys(accounts[0]).map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {accounts.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => <td key={j}>{val}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccountsReport;