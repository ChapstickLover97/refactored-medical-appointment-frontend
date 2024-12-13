import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientDashboard from "../pages/patient/PatientDashboard";
import PatientAppointmentCreation from "../pages/patient/PatientAppointmentCreation";
import PatientAppointmentList from "../pages/patient/PatientAppointmentList";
import NotFound from "../pages/NotFound";
import PatientManagement from "../pages/patient/PatientManagement";
import DoctorManagement from "../pages/patient/DoctorManagement";

const UnauthenticatedRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PatientDashboard />} />
            <Route path="/create" element={<PatientAppointmentCreation />} />
            <Route path="/list" element={<PatientAppointmentList />} />
            <Route path="/patient-management" element={<PatientManagement />} />
            <Route path="/doctor-management" element={<DoctorManagement />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default UnauthenticatedRoutes;