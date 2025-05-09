import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const reportPages = [
    { path: '/reports/accounts', label: 'Accounts Report' },
    { path: '/reports/cases', label: 'SRs Report' },
    { path: '/reports/users', label: 'Users Report' },
    { path: '/reports/updates', label: 'Updates Report' },
];

const ReportsPage = () => (
    <div className="landing-container">
        <h1>Download Reports</h1>
        <p className="landing-subtitle">Choose a report to export as CSV</p>
        <div className="landing-links">
            {reportPages.map(page => (
                <Link key={page.path} to={page.path} className="landing-link">
                    {page.label}
                </Link>
            ))}
            
        </div>
    </div>
);

export default ReportsPage;