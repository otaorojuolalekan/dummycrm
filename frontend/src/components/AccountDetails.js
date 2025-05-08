import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_BASE_URL from './apiConfig';

const AccountDetails = () => {
    const { account_id } = useParams();
    const [account, setAccount] = useState(null);
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            const response = await fetch(`${API_BASE_URL}/accounts/account_details/${account_id}`);
            const data = await response.json();
            setAccount(data);
        };

        const fetchAccountCases = async () => {
            const response = await fetch(`${API_BASE_URL}/accounts/account_cases/${account_id}`);
            const data = await response.json();
            setCases(data);
        };

        fetchAccountDetails();
        fetchAccountCases();
    }, [account_id]);

    if (!account) {
        return <div>Loading...</div>;
    }

    return (
        <div className='case-details-container'>
            <h2>Account Details</h2>
            <h3>Account Information</h3>
            <div className="account-info-grid">
                <div className="grid-item">
                    <label><strong>Account Number:</strong></label>
                    <input type="text" value={account.account_id} readOnly />
                </div>
                <div className="grid-item">
                    <label><strong>First Name:</strong></label>
                    <input type="text" value={account.first_name} readOnly />
                </div>
                <div className="grid-item">
                    <label><strong>Last Name:</strong></label>
                    <input type="text" value={account.last_name} readOnly />
                </div>
                <div className="grid-item">
                    <label><strong>Address:</strong></label>
                    <input type="text" value={account.address} readOnly />
                </div>
                <div className="grid-item">
                    <label><strong>Business Unit:</strong></label>
                    <input type="text" value={account.business_unit} readOnly />
                </div>
                <div className="grid-item">
                    <label><strong>Undertaking:</strong></label>
                    <input type="text" value={account.undertaking} readOnly />
                </div>
            </div>
            <div>
                <h3>Related Cases</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Case ID</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Assigned User Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map((caseItem) => (
                            <tr key={caseItem.case_id}>
                                <td>
                                    <a href={`/case_details/${caseItem.case_id}`}>
                                        {caseItem.case_id}
                                    </a>
                                </td>
                                <td>{caseItem.category}</td>
                                <td>{caseItem.subcategory}</td>
                                <td>{caseItem.assigned_user_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountDetails;