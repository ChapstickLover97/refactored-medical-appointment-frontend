import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientDashboard from '../pages/patient/PatientDashboard';
import PatientAppointmentCreation from '../pages/patient/PatientAppointmentCreation';
import PatientAppointmentList from '../pages/patient/PatientAppointmentList';

const PatientRoutes = () => (
    <>
        <Routes>
            <Route path="/" element={<PatientDashboard />} />
            <Route path="/create" element={<PatientAppointmentCreation />} />
            <Route path="/list" element={<PatientAppointmentList />} />
        </Routes>
    </>
);

export default PatientRoutes;