// This file contains the API base URL for the application.
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://dummycrm-backend.onrender.com");

export default API_BASE_URL;