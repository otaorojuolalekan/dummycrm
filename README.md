# CRMIFY - Dummy CRM for Power Distribution Company

## Overview
CRMIFY is a customer relationship management system designed for a fictitious power distribution company. The application allows users to manage accounts, cases, and updates efficiently.

## Project Structure
The project is divided into two main parts: the backend and the frontend.

### Backend
- **app.py**: Main entry point for the backend application. Initializes the Flask app and sets up database connections.
- **models/schema.py**: Defines the database schema using SQLAlchemy for users, accounts, cases, and updates.
- **routes/accounts.py**: Handles account management routes.
- **routes/auth.py**: Manages authentication routes for user login and session management.
- **routes/cases.py**: Contains routes for managing cases.
- **routes/updates.py**: Handles routes related to updates on cases.
- **db/database.db**: SQLite database file for storing data.
- **requirements.txt**: Lists Python dependencies required for the backend.

### Frontend
- **public/index.html**: Main HTML file for the frontend application.
- **src/App.js**: Main component that sets up routing and layout.
- **src/index.js**: Entry point for the React application.
- **src/components/LoginPage.js**: Renders the login page.
- **src/components/AccountsList.js**: Displays a list of all accounts.
- **src/components/AccountDetails.js**: Shows details of a specific account and related cases.
- **src/components/CasesList.js**: Displays a list of all cases.
- **src/components/CaseDetails.js**: Shows details of a specific case and its updates.
- **src/components/CreateCaseForm.js**: Provides a form for creating a new case.
- **src/routes.js**: Defines the routes for the frontend application.
- **package.json**: Configuration file for npm, listing dependencies and scripts.

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the application:
   ```
   python app.py
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Usage
- Access the application in your web browser at `http://localhost:3000`.
- Use the login page to authenticate and access the accounts and cases management features.

## License
This project is for educational purposes and is not intended for production use.