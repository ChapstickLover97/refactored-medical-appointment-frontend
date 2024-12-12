import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminAppointmentCreation from "../pages/admin/AdminAppointmentCreation";
import AdminAppointmentList from "../pages/admin/AdminAppointmentList";
import DoctorManagement from "../pages/admin/DoctorManagement";
import ErrorPage from "../pages/admin/ErrorPage";

const AuthenticatedRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/admin-create" element={<AdminAppointmentCreation />} />
            <Route path="/admin/admin-list" element={<AdminAppointmentList />} />
            <Route path="/admin/doctor-management" element={<DoctorManagement />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AuthenticatedRoutes;