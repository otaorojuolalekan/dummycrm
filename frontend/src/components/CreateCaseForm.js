import React, { useState, useEffect } from 'react';
import API_BASE_URL from './apiConfig';

const CATEGORY_OPTIONS = [
    "Technical", "Commercial", "Metering", "Payment", "Enquiries"
];

const SUBCATEGORY_OPTIONS = {
    Technical: ["Wire Cut", "Broken Pole", "DT Fault", "Low Voltage"],
    Commercial: ["High Bills", "Account Reconciliation", "Change of Tariff", "Bills not received"],
    Metering: ["Token not received", "Meter Alarm on", "Unable to load token", "Delayed Metering"],
    Payment: ["Payment into wrong account", "Uncredited payment"],
    Enquiries: ["Complimentary call", "Application Feedback", "Office Address"]
};

const CreateCaseForm = () => {
    const [accountId, setAccountId] = useState('');
    const [status, setStatus] = useState('open');
    const [category, setCategory] = useState('Technical');
    const [subcategory, setSubcategory] = useState('');
    const [description, setDescription] = useState('');
    const [businessUnit, setBusinessUnit] = useState('');
    const [undertaking, setUndertaking] = useState('');
    const [assignedUserId, setAssignedUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [accountError, setAccountError] = useState('');
    const [isAccountValid, setIsAccountValid] = useState(false);
    const [notification, setNotification] = useState('');

    // Fetch users for dropdown
    useEffect(() => {
        fetch('${API_BASE_URL}/auth/user_list')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(() => setUsers([]));
    }, []);

    // Validate Account ID and auto-fill fields
    const handleAccountIdBlur = async () => {
        if (!accountId) return;
        setAccountError('');
        setIsAccountValid(false);
        setBusinessUnit('');
        setUndertaking('');
        try {
            const res = await fetch(`${API_BASE_URL}/accounts/account_details/${accountId}`);
            if (res.ok) {
                const data = await res.json();
                setBusinessUnit(data.business_unit);
                setUndertaking(data.undertaking);
                setIsAccountValid(true);
            } else {
                setAccountError('Account ID not found.');
                setIsAccountValid(false);
            }
        } catch {
            setAccountError('Error validating Account ID.');
            setIsAccountValid(false);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setSubcategory('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAccountValid) {
            setAccountError('Please enter a valid Account ID.');
            return;
        }
        const caseData = {
            account_id: accountId,
            assigned_user_id: assignedUserId,
            category,
            created_user_id: 1, // TODO: Replace with logged-in user ID
            description,
            status,
            subcategory
        };

        try {
            const res = await fetch('${API_BASE_URL}/cases/create_case', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(caseData)
            });
            const data = await res.json();
            if (res.ok) {
                setNotification('Case created successfully!');
                setTimeout(() => {
                    setNotification('');
                    window.location.href = '/cases';
                }, 2000);
            } else {
                setNotification(data.error || 'Failed to create case.');
                setTimeout(() => setNotification(''), 3000);
            }
        } catch (err) {
            setNotification('Network error. Please try again.');
            setTimeout(() => setNotification(''), 3000);
        }
    };

    return (
        <div className="case-details-container">
            <h2>Create Service Request</h2>
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
                    <label>Account Number:</label>
                    <input
                        type="text"
                        value={accountId}
                        onChange={e => setAccountId(e.target.value)}
                        onBlur={handleAccountIdBlur}
                        required
                        style={accountError ? { borderColor: 'red' } : {}}
                    />
                    {accountError && <span style={{ color: 'red', fontSize: '0.9em' }}>{accountError}</span>}
                </div>
                <div className="grid-item">
                    <label>Status:</label>
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <div className="grid-item">
                    <label>Category:</label>
                    <select value={category} onChange={handleCategoryChange}>
                        {CATEGORY_OPTIONS.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="grid-item">
                    <label>Subcategory:</label>
                    <select
                        value={subcategory}
                        onChange={e => setSubcategory(e.target.value)}
                        required
                        disabled={!category}
                    >
                        <option value="">Select Subcategory</option>
                        {category &&
                            SUBCATEGORY_OPTIONS[category].map(subcat => (
                                <option key={subcat} value={subcat}>{subcat}</option>
                            ))}
                    </select>
                </div>
                <div className="grid-item" style={{ gridColumn: '1 / -1' }}>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        style={{ minHeight: '120px', fontSize: '1rem' }}
                    />
                </div>
                <div className="grid-item">
                    <label>Business Unit:</label>
                    <input
                        type="text"
                        value={businessUnit}
                        readOnly
                        style={{ background: '#e8eaf6', fontStyle: 'italic' }}
                    />
                </div>
                <div className="grid-item">
                    <label>Undertaking:</label>
                    <input
                        type="text"
                        value={undertaking}
                        readOnly
                        style={{ background: '#e8eaf6', fontStyle: 'italic' }}
                    />
                </div>
                <div className="grid-item" style={{ gridColumn: '1 / -1' }}>
                    <label>Assigned User Name:</label>
                    <select
                        value={assignedUserId}
                        onChange={e => setAssignedUserId(e.target.value)}
                        required
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.user_id} value={user.user_id}>
                                {user.assigned_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid-item" style={{ gridColumn: '1 / -1' }}>
                    <button type="submit" disabled={!isAccountValid}>Create SR</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCaseForm;