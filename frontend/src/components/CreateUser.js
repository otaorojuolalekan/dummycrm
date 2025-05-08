import React, { useState } from 'react';
import API_BASE_URL from './apiConfig';

const CreateUser = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        is_admin: 0,
        department: ''
    });
    const [notification, setNotification] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification('');
        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setNotification('User registered successfully!');
                setTimeout(() => {
                    setNotification('');
                    window.location.href = '/users'; // Change if you want a different redirect
                }, 2000);
            } else {
                setNotification(data.error || 'Failed to register user.');
            }
        } catch {
            setNotification('Network error. Please try again.');
        }
    };

    return (
        <div className="case-details-container">
            <h2>Create User</h2>
            {notification && (
                <div style={{
                    background: notification.includes('successfully') ? '#4caf50' : '#f44336',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    textAlign: 'center'
                }}>
                    {notification}
                </div>
            )}
            <form onSubmit={handleSubmit} className="account-info-grid">
                <div className="grid-item">
                    <label>First Name:</label>
                    <input name="first_name" value={form.first_name} onChange={handleChange} required />
                </div>
                <div className="grid-item">
                    <label>Last Name:</label>
                    <input name="last_name" value={form.last_name} onChange={handleChange} required />
                </div>
                <div className="grid-item">
                    <label>Username:</label>
                    <input name="username" value={form.username} onChange={handleChange} required />
                </div>
                <div className="grid-item">
                    <label>Password:</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} required />
                </div>
                <div className="grid-item">
                    <label>Department:</label>
                    <input name="department" value={form.department} onChange={handleChange} required />
                </div>
                <div className="grid-item">
                    <label>
                        <input
                            type="checkbox"
                            name="is_admin"
                            checked={!!form.is_admin}
                            onChange={handleChange}
                        />{' '}
                        Is Admin
                    </label>
                </div>
                <div className="grid-item" style={{ gridColumn: '1 / -1' }}>
                    <button type="submit">Create User</button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;