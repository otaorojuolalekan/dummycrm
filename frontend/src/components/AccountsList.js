import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CaseDetails.css'


const AccountsList = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await fetch('http://localhost:5000/accounts');
            const data = await response.json();
            setAccounts(data);
        };

        fetchAccounts();
    }, []);

    return (
        <div className='case-details-container'>
            <h1>Accounts List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>First Name</th>
                        <th>Business Unit</th>
                        <th>Undertaking</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.account_id}>
                            <td>
                                <Link to={`/account_details/${account.account_id}`}>
                                    {account.account_id}
                                </Link>
                            </td>
                            <td>{account.first_name}</td>
                            <td>{account.business_unit}</td>
                            <td>{account.undertaking}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountsList;