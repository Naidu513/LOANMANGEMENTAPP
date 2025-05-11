const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/loan_management_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Loan Application Schema (e.g., models/LoanApplication.js)
const LoanApplicationSchema = new mongoose.Schema({
  loanAmount: Number,
  purpose: String,
  // Add other form fields here
  status: { type: String, default: 'Pending' },
  appliedDate: { type: Date, default: Date.now },
  // You might want to associate with a user if you implement authentication
});

const LoanApplication = mongoose.model('LoanApplication', LoanApplicationSchema);

// API Endpoint to Submit Loan Application (e.g., routes/loanRoutes.js)
app.post('/api/applications', async (req, res) => {
  try {
    const newApplication = new LoanApplication(req.body);
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Failed to submit application' });
  }
});

// API Endpoint to Get All Loan Applications (for Admin)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await LoanApplication.find();
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// API Endpoint to Get Pending Loan Applications (for Verifier)
app.get('/api/applications/pending', async (req, res) => {
  try {
    const pendingApplications = await LoanApplication.find({ status: 'Pending' });
    res.json(pendingApplications);
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ message: 'Failed to fetch pending applications' });
  }
});

// API Endpoint to Get User's Loan Applications (if you have user association)
// app.get('/api/users/:userId/applications', async (req, res) => { ... });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});