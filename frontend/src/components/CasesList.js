import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CaseDetails.css';
import API_BASE_URL from './apiConfig';

const CasesList = () => {
    const [cases, setCases] = useState([]);
    const [userNames, setUserNames] = useState({}); // userId -> assigned_name

    useEffect(() => {
        const fetchCases = async () => {
            const response = await fetch(`${API_BASE_URL}/cases/`);
            if (!response.ok) {
                console.error('Failed to fetch cases');
                return;
            }
            const data = await response.json();
            setCases(data);
        };

        const fetchUserNames = async () => {
            const response = await fetch('http://127.0.0.1:5000/auth/user_list');
            if (!response.ok) {
                console.error('Failed to fetch user names');
                return;
            }
            const data = await response.json();
            // Map userId to assigned_name for quick lookup
            const userMap = {};
            data.forEach(user => {
                userMap[user.user_id] = user.assigned_name;
            });
            setUserNames(userMap);
        };

        fetchCases();
        fetchUserNames();
    }, []);

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Africa/Lagos'
        });
    }

    function getUserName(userId) {
        return userNames[userId] || userId;
    }

    return (
        <div className='case-details-container'>
            <h1>Service Requests List</h1>
            <table>
                <thead>
                    <tr>
                        <th>SR Number</th>
                        <th>Account Number</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Assigned User Name</th>
                        <th>Status</th>
                        <th>Date Created</th>
                        <th>Date Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((caseItem) => (
                        <tr key={caseItem.id}>
                            <td>
                                <Link to={`/case_details/${caseItem.id}`}>{caseItem.id}</Link>
                            </td>
                            <td>
                                <Link to={`/account_details/${caseItem.account_id}`}>
                                    {caseItem.account_id}
                                </Link>
                            </td>
                            <td>{caseItem.description}</td>
                            <td>{caseItem.category}</td>
                            <td>{caseItem.subcategory}</td>
                            <td>{getUserName(caseItem.assigned_user_id)}</td>
                            <td>{caseItem.status}</td>
                            <td>{formatDate(caseItem.date_created)}</td>
                            <td>{formatDate(caseItem.date_modified)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CasesList;