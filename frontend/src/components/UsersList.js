import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CaseDetails.css'


const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5000/auth/get_users');
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div className='case-details-container'>
            <h1>Users List</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Department</th>
                        <th>Is Admin?</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.username}</td>
                            <td>{user.department}</td>
                            <td>{user.is_admin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;