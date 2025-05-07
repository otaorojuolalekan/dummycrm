import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CaseDetails.css';

const CasesList = () => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            const response = await fetch('http://localhost:5000/cases/');
            console.log(response);
            if (!response.ok) {
                console.error('Failed to fetch cases');
                return;
            }
            // Check if the response is ok (status code 200)
            // If not, handle the error accordingly
            const data = await response.json();
            setCases(data);
        };

        fetchCases();
    }, []);

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
                        <th>Assigned User ID</th>
                        <th>Status</th>
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
                            <td>{caseItem.assigned_user_id}</td>
                            <td>{caseItem.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CasesList;