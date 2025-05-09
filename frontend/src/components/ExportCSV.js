import React from 'react';

const ExportCSV = ({ csvData, fileName }) => {
  const handleExport = () => {
    const csvRows = [];
    // Get headers
    const headers = Object.keys(csvData[0] || {});
    csvRows.push(headers.join(','));

    // Loop over rows
    for (const row of csvData) {
      const values = headers.map(header => {
        const val = row[header];
        // Escape quotes
        return `"${(val !== null && val !== undefined ? String(val) : '').replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button onClick={handleExport} disabled={!csvData.length}>
      Export to CSV
    </button>
  );
};

export default ExportCSV;
