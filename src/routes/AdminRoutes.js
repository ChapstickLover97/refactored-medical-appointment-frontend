// AdminRoutes.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminAppointmentCreation from "../pages/admin/AdminAppointmentCreation";
import AdminAppointmentList from "../pages/admin/AdminAppointmentList";
import DoctorManagement from "../pages/admin/DoctorManagement";
import ErrorPage from "../pages/admin/ErrorPage"; // Import ErrorPage

const AdminRoutes = ({ isAdmin }) => {
    console.log("[AdminRoutes] Rendering routes. isAdmin:", isAdmin);

    if (!isAdmin) {
        console.warn("[AdminRoutes] Unauthorized access. Redirecting to /.");
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="admin-create" element={<AdminAppointmentCreation />} />
            <Route path="admin-list" element={<AdminAppointmentList />} />
            <Route path="doctor-management" element={<DoctorManagement />} />
            <Route path="*" element={<ErrorPage />} /> {/* Add ErrorPage as fallback */}
        </Routes>
    );
};

export default AdminRoutes;