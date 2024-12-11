// src/pages/ErrorPage.js

import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Oops! Page not found.</h1>
            <p>The page you are looking for doesn’t exist or an error occurred.</p>
            <Link to="/admin/admin-dashboard">Go back to Admin Dashboard</Link>
        </div>
    );
};

export default ErrorPage;