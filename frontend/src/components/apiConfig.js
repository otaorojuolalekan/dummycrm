import dotenv from "dotenv";
dotenv.config();
// This file is used to set the base URL for the API
// It checks if the REACT_APP_API_BASE_URL environment variable is set
// If not, it defaults to localhost for local development or a production URL
// for deployment
// This allows for easy switching between development and production environments
// without changing the code
// The API_BASE_URL is used in the frontend to make API calls
// The API_BASE_URL is set to the REACT_APP_API_BASE_URL environment variable
// If the REACT_APP_API_BASE_URL environment variable is not set
// It defaults to localhost for local development
// or a production URL for deployment

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://dummycrm-backend.onrender.com");

export default API_BASE_URL;
