import React from "react";

// Components
import PatientAppointmentCreation from "./PatientAppointmentCreation";
import PatientAppointmentList from "./PatientAppointmentList";

const PatientDashboard = () => {
    return (
        <div style={styles.container}>
            <main style={styles.main}>
                <h1 style={styles.heading}>Patient Dashboard</h1>
                <p style={styles.description}>
                    Welcome! Manage your appointments with ease.
                </p>
                {/* Appointment Creation Section */}
                <section style={styles.section}>
                    <h2 style={styles.subheading}>Book an Appointment</h2>
                    <PatientAppointmentCreation />
                </section>
                {/* Appointment List Section */}
                <section style={styles.section}>
                    <h2 style={styles.subheading}>Upcoming Appointments</h2>
                    <PatientAppointmentList />
                </section>
            </main>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        padding: "1rem",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
    },
    main: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        fontSize: "2.5rem",
        color: "#333",
        marginBottom: "1rem",
    },
    description: {
        fontSize: "1.2rem",
        color: "#666",
        marginBottom: "2rem",
        textAlign: "center",
    },
    subheading: {
        fontSize: "1.5rem",
        color: "#444",
        marginBottom: "1rem",
    },
    section: {
        marginBottom: "2rem",
    },
};

export default PatientDashboard;