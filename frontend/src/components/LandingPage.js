import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const pages = [
    { path: '/cases', label: 'View Cases' },
    { path: '/accounts', label: 'View Accounts' },
    { path: '/create_user', label: 'Create User' },
    { path: '/create_case', label: 'Create Case' },
    { path: '/create_account', label: 'Create Account' },
    { path: '/users', label: 'View Users' },
    { path: '/reports', label: 'Reports' }, // <-- Added Reports link
];

const LandingPage = () => (
    <div className="landing-container">
        <h1>Welcome to CRMIFY</h1>
        <p className="landing-subtitle">Quick Links</p>
        <div className="landing-links">
            {pages.map(page => (
                <Link key={page.path} to={page.path} className="landing-link">
                    {page.label}
                </Link>
            ))}
        </div>
    </div>
);

export default LandingPage;