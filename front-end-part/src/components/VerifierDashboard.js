import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VerifierDashboard.css';

function VerifierDashboard() {
  const [pendingApplications, setPendingApplications] = useState([]);

  useEffect(() => {
    const fetchPendingApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/applications/pending');
        setPendingApplications(response.data);
      } catch (error) {
        console.error('Error fetching pending applications:', error.response ? error.response.data : error.message);
      }
    };

    fetchPendingApplications();
  }, []);
  return (
    <div className="verifier-dashboard">
      <h2>Verifier Dashboard</h2>
      <p>Welcome to the loan verifier dashboard!</p>
      <h3>Applications for Verification</h3>
      {pendingApplications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.loanAmount}</td>
                <td>{app.purpose}</td>
                <td><button>Verify</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications pending verification.</p>
      )}
    </div>
  );
}

export default VerifierDashboard;