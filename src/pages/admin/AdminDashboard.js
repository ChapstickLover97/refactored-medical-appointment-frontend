import React from "react";

const AdminDashboard = () => {
    return (
        <div style={styles.container}>
            <main style={styles.main}>
                <h1 style={styles.heading}>Admin Dashboard</h1>
                <p style={styles.description}>
                    Welcome, Admin! Here you can manage appointments, doctors, and more.
                </p>
                {/* Placeholder for additional admin-specific content */}
                <section style={styles.section}>
                    <h2>Manage Appointments</h2>
                    <p>View, create, or modify appointments as needed.</p>
                </section>
                <section style={styles.section}>
                    <h2>Doctor Management</h2>
                    <p>Add or update doctor information.</p>
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
    section: {
        marginBottom: "2rem",
    },
};

export default AdminDashboard;