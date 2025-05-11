import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error.response ? error.response.data : error.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the administrator dashboard!</p>
      <h3>All Loan Applications</h3>
      {applications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.loanAmount}</td>
                <td>{app.purpose}</td>
                <td>{app.status || 'Pending'}</td>
                <td><button>Approve/Reject</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loan applications submitted yet.</p>
      )}
    </div>
  );
}

export default AdminDashboard;