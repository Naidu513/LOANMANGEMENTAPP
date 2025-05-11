import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
// import './ApplicationForm.css';

function ApplicationForm({ onSubmit }) {
  const [loanAmount, setLoanAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // Add more form fields as needed
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      loanAmount,
      purpose,
      // Add more data from your form fields
    };

    try {
      const response = await axios.post('http://localhost:5000/api/applications', applicationData);
      console.log('Application submitted successfully:', response.data);
      navigate('/dashboard'); // Redirect after successful submission
    } catch (error) {
      console.error('Error submitting application:', error.response ? error.response.data : error.message);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="application-form-container">
      <h2>Loan Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="number"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label htmlFor="loanAmount">Loan Amount:</label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="purpose">Purpose of Loan:</label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>
        {/* Add more form fields here */}
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplicationForm;