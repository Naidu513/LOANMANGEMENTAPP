import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';

function UserDashboard() {
  const [userApplications, setUserApplications] = useState([]);

  useEffect(() => {
    const fetchUserApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/applications'); // For now, fetch all
        setUserApplications(response.data);
      } catch (error) {
        console.error('Error fetching user applications:', error.response ? error.response.data : error.message);
      }
    };

    fetchUserApplications();
  }, []);
  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <p>Welcome to your user dashboard!</p>
      <h3>Your Loan Applications</h3>
      {userApplications.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.loanAmount}</td>
                <td>{app.purpose}</td>
                <td>{app.status || 'Pending'}</td>
                <td><button>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You haven't submitted any loan applications yet.</p>
      )}
    </div>
  );
}

export default UserDashboard;