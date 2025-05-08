import React, { useState } from 'react';
import './LoginPage.css'; // Assuming you have a CSS file for styling
import API_BASE_URL from './apiConfig';

const LoginPage = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [notification, setNotification] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification('');
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setNotification('Login successful!');
                setTimeout(() => {
                    setNotification('');
                    window.location.href = '/welcome'; // Redirect after login
                }, 1000);
            } else {
                setNotification(data.error || 'Invalid credentials.');
            }
        } catch {
            setNotification('Network error. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {notification && (
                <div style={{
                    background: notification.includes('successful') ? '#4caf50' : '#f44336',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    textAlign: 'center'
                }}>
                    {notification}
                </div>
            )}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-grid">
                    <div className="login-item">
                        <label>Username:</label>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="login-item">
                        <label>Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;