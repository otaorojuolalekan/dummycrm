import React, { useState } from 'react';
import './CaseDetails.css';

const CreateAccount = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        address: '',
        business_unit: '',
        undertaking: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await fetch('http://localhost:5000/accounts/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Account created! ID: ' + data.account_id);
                setForm({
                    first_name: '',
                    last_name: '',
                    address: '',
                    business_unit: '',
                    undertaking: ''
                });
            } else {
                setMessage(data.error || 'Error creating account');
            }
        } catch (err) {
            setMessage('Network error');
        }
    };

    return (
        <div className="case-details-container">
            <h2>Create Account</h2>
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
                    <label>Address:</label>
                    <input name="address" value={form.address} onChange={handleChange} required />
                </div>
                <div className="grid-item">
                    <label>Business Unit:</label>
                    <input name="business_unit" value={form.business_unit} onChange={handleChange} required />
                </div>
                <div className="grid-item">
                    <label>Undertaking:</label>
                    <input name="undertaking" value={form.undertaking} onChange={handleChange} required />
                </div>
                <div className="grid-item" style={{ gridColumn: '1 / -1' }}>
                    <button type="submit">Create Account</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateAccount;