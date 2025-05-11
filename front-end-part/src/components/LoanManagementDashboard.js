import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './LoanManagementDashboard.css';

function LoanManagementDashboard({ userRole, onRoleChange }) {
  const [loanApplications, setLoanApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/applications');
        setLoanApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error.response ? error.response.data : error.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="loan-management-dashboard">
      <h2>Loan Management Dashboard</h2>

      <nav className="role-nav">
        <label htmlFor="userRole">View As:</label>
        <select id="userRole" value={userRole} onChange={onRoleChange}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Verifier">Verifier</option>
        </select>
      </nav>

      <h3>Applied Loans</h3>
      {loanApplications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Status</th>
              {userRole === 'Admin' && <th>Admin Actions</th>}
              {userRole === 'Verifier' && <th>Verifier Actions</th>}
              {userRole === 'User' && <th>User Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loanApplications.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.loanAmount}</td>
                <td>{loan.purpose}</td>
                <td>{loan.status || 'Pending'}</td> {/* Default status */}
                {userRole === 'Admin' && <td><button>Edit</button></td>}
                {userRole === 'Verifier' && <td><button>Verify</button></td>}
                {userRole === 'User' && <td>View Details</td>}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loans applied yet.</p>
      )}

      <Link to="/apply" className="apply-button">Apply for a New Loan</Link>
    </div>
  );
}

export default LoanManagementDashboard;