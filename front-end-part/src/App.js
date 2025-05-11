import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ApplicationForm from './components/ApplicationForm';
import AdminDashboard from './components/AdminDashboard';
import VerifierDashboard from './components/VerifierDashboard';
import UserDashboard from'./components/UserDashboard';
import LoanManagementDashboard from './components/LoanManagementDashboard'; 
import './App.css';

function App() {
  const [userRole, setUserRole] = useState('User');
  const [loanApplications, setLoanApplications] = useState([]);

  // const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const handleApplicationSubmit = (newApplication) => {
    // In a real application, you would send this data to your backend API
    console.log('Application submitted:', newApplication);
    setLoanApplications([...loanApplications, { ...newApplication, id: Date.now() }]); 
    Navigate('/dashboard'); // Redirect to the dashboard after submission
  };



  // For demonstration, let's log the applications whenever they change
  useEffect(() => {
    console.log('Current Loan Applications:', loanApplications);
  }, [loanApplications]);

  return (
    <Router>
      <div className="app-container">
        <h1>Credit Application Portal</h1>

        <Routes>
          <Route path="/apply" element={<ApplicationForm onSubmit={handleApplicationSubmit} />} />
          <Route
            path="/dashboard"
            element={
              <LoanManagementDashboard
                userRole={userRole}
                onRoleChange={handleRoleChange}
                loanApplications={loanApplications}
              />
            }
          />
          <Route
            path="/admin"
            element={userRole === 'Admin' ? <AdminDashboard applications={loanApplications} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/verifier"
            element={userRole === 'Verifier' ? <VerifierDashboard applications={loanApplications} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/user"
            element={userRole === 'User' ? <UserDashboard applications={loanApplications} /> : <Navigate to="/dashboard" />}
          />
          <Route path="/" element={<Navigate to="/apply" />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;