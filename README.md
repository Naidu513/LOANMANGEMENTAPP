# Loan Management Application

This project is a web application for managing loan applications. It allows users to apply for loans, and administrators and verifiers to manage and review these applications.

## Overview

The application consists of a frontend built with React and a backend built with Node.js and Express, utilizing MongoDB for data storage.

### Frontend Features:

* **Direct Loan Application Form:** Users can fill out and submit loan applications directly.
* **Role-Based Dashboards:**
    * **User Dashboard:** Displays the user's submitted loan applications and their statuses.
    * **Admin Dashboard:** Provides a comprehensive view of all loan applications, with options for administrative actions (e.g., approve/reject).
    * **Verifier Dashboard:** Shows pending loan applications that require verification.
* **Role Switching:** A dropdown menu allows users (for development and testing purposes) to switch between different roles (Admin, User, Verifier) to view the respective dashboards.

### Backend Features:

* **API Endpoints:**
    * `/api/applications` (POST): Accepts loan application data and stores it in the MongoDB database.
    * `/api/applications` (GET): Retrieves all loan applications (for Admin).
    * `/api/applications/pending` (GET): Retrieves pending loan applications (for Verifier).
* **MongoDB Integration:** Uses Mongoose to interact with the MongoDB database for storing and retrieving loan application data.

## Technologies Used

### Frontend:

* React
* React Router DOM (for routing)
* Axios (for making HTTP requests to the backend)
* CSS (for styling)

### Backend:

* Node.js
* Express (web framework)
* Mongoose (MongoDB object modeling)
* Body-parser (middleware for parsing request bodies)
* CORS (middleware for enabling Cross-Origin Resource Sharing)

### Database:

* MongoDB

## Getting Started

Follow these steps to get the application running on your local machine.

### Prerequisites

* Node.js and npm (Node Package Manager) installed (You can download them from [https://nodejs.org/](https://nodejs.org/))
* MongoDB installed and running locally, or a MongoDB Atlas account set up with a connection string.
* Git installed (You can download it from [https://git-scm.com/](https://git-scm.com/))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd LoanManagementApp
    ```
    (Replace `<repository-url>` with the actual URL of your GitHub repository)

2.  **Navigate to the backend directory and install dependencies:**
    ```bash
    cd App-backend
    npm install
    ```

3.  **Configure MongoDB connection:**
    * Open the `server.js` file in the `App-backend` directory.
    * Replace `'YOUR_MONGODB_URI'` with your actual MongoDB connection string (either your local MongoDB URI or your MongoDB Atlas connection string).

4.  **Start the backend server:**
    ```bash
    node server.js
    ```
    The backend server should now be running on `http://localhost:5000`.

5.  **Navigate to the frontend directory and install dependencies:**
    ```bash
    cd ../front-end-part
    npm install
    ```

6.  **Start the frontend development server:**
    ```bash
    npm start
    ```
    The frontend application should now be running in your browser, usually on `http://localhost:3000`.

## Usage

1.  Open your browser to `http://localhost:3000`. You will be directly presented with the Loan Application Form.
2.  Fill out the form and click "Submit Application".
3.  After submission, you will be redirected to the Loan Management Dashboard.
4.  Use the "View As" dropdown in the navigation bar to switch between different user roles (Admin, User, Verifier) and view the corresponding dashboards. The displayed loan applications will reflect the data stored in the MongoDB database.

## Project Structure
