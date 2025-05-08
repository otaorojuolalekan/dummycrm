import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CaseDetails.css';
import API_BASE_URL from './apiConfig';

const subcategories = {
    Technical: ["Wire Cut", "Transformer Fault"],
    Commercial: ["High Bills", "Tariff Issues"],
    Metering: ["Unable to load token", "Meter not working"],
    Payment: ["Uncredited payment"],
    Enquiries: ["Office Address"]
};


const getUserNameById = (id) => {
    const user = usersList.find(u => u.id === Number(id));
    return user ? user.name : "Unknown";
};

const CaseDetails = () => {
    const { case_id } = useParams();
    const [caseDetails, setCaseDetails] = useState(null);
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usersList, setUsersList] = useState([]);

    // For update box
    const [newUpdate, setNewUpdate] = useState("");
    // For editable fields
    const [assignedTo, setAssignedTo] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchCaseDetails();
        fetchUsersList();
        // eslint-disable-next-line
    }, [case_id]);

    const fetchCaseDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/cases/case_details/${case_id}`);
            const data = await response.json();
            setCaseDetails(data.case);
            setUpdates(data.updates);
            setAssignedTo(data.case.assigned_user_id);
            setStatus(data.case.status);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching case details:', error);
            setLoading(false);
        }
    };

    // Add update handler
const handleAddUpdate = async () => {
    if (!newUpdate.trim()) return;
    await fetch(`${API_BASE_URL}/updates/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            case_id: case_id, // Use the case_id from the URL
            update_description: newUpdate, // Use the textarea value
            created_user_id: 3 // Default to user_id 3
        })
    });
    setNewUpdate("");
    fetchCaseDetails(); // Refresh updates table
};
    // Fetch users list for Assigned To dropdown
    const fetchUsersList = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/user_list`);
            const data = await response.json();
            setUsersList(data);
        } catch (error) {
            console.error('Error fetching users list:', error);
        }
    };

    // Save changes for assigned_to and status
    const handleSaveCase = async () => {
        await fetch(`${API_BASE_URL}/cases/update_case/${caseDetails.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                assigned_user_id: assignedTo,
                status: status
            })
        });
        fetchCaseDetails();
    };

    if (loading) return <div>Loading...</div>;
    if (!caseDetails) return <div>No case details found.</div>;



return (
    <div className="case-details-container">
        <h2>Service Request Details</h2>
        <h3>SR Information</h3>
        <div className="case-info-grid">
            <div className="grid-item">
                <label><strong>SR Number:</strong></label>
                <input type="text" value={caseDetails.id} readOnly />
            </div>
            <div className="grid-item">
                <label><strong>Account Number:</strong></label>
                <input type="text" value={caseDetails.account_id} readOnly />
            </div>
            <div className="grid-item">
                <label><strong>Status:</strong></label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>
            </div>
            <div className="grid-item">
                <label><strong>Category:</strong></label>
                <select value={caseDetails.category} disabled>
                    <option value="Technical">Technical</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Metering">Metering</option>
                    <option value="Payment">Payment</option>
                    <option value="Enquiries">Enquiries</option>
                </select>
            </div>
            <div className="grid-item">
                <label><strong>Subcategory:</strong></label>
                <select value={caseDetails.subcategory} disabled>
                    {subcategories[caseDetails.category]?.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
            </div>
            <div className="grid-item">
                <label><strong>Business Unit:</strong></label>
                <input type="text" value={caseDetails.business_unit} readOnly />
            </div>
            <div className="grid-item">
                <label><strong>Undertaking:</strong></label>
                <input type="text" value={caseDetails.undertaking} readOnly />
            </div>
            <div className="grid-item">
                <label><strong>Created By:</strong></label>
                <input type="text" value={caseDetails.created_user_name} readOnly />
            </div>
            <div className="grid-item grid-item--desc" style={{gridColumn: "1 / span 2"}}>
                <label><strong>Description:</strong></label>
                <textarea value={caseDetails.description} readOnly className="desc-textarea" />
            </div>
            {/* Move Assigned To below Description */}
            <div className="grid-item" style={{gridColumn: "1 / span 2"}}>
                <label><strong>Assigned To:</strong></label>
                <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
                    {usersList.map(user => (
                        <option key={user.user_id} value={user.user_id}>{user.assigned_name}</option>
                    ))}
                </select>
                {/* Save Changes button under Assigned To */}
                <div style={{marginTop: "1rem"}}>
                    <button onClick={handleSaveCase}>Save Changes</button>
                </div>
            </div>
        </div>
        {/* Updates Table */}
        <div>
            <h3>Updates</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Update ID</th>
                            <th>Update Description</th>
                            <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updates.map(update => (
                            <tr key={update.id}>
                                <td>{update.id}</td>
                                <td>{update.update_description}</td>
                                <td>{update.created_by}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {/* Add Update box below Updates table */}
        <div style={{marginTop: "2rem"}}>
            <h3>Add Update</h3>
            <textarea
                className="desc-textarea"
                placeholder="Enter update..."
                value={newUpdate}
                onChange={e => setNewUpdate(e.target.value)}
                style={{marginBottom: "0.5rem"}}
            />
            <br />
            <button onClick={handleAddUpdate}>Add Update</button>
        </div>
    </div>
);

};

export default CaseDetails;