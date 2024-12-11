import React from "react";

const DoctorManagement = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Doctor Management</h1>
            <p style={styles.text}>
                This is where you can manage doctor profiles, specializations, and availability.
            </p>
        </div>
    );
};

const styles = {
    container: {
        padding: "2rem",
        textAlign: "center",
    },
    heading: {
        fontSize: "2rem",
        color: "#333",
        marginBottom: "1rem",
    },
    text: {
        fontSize: "1.2rem",
        color: "#555",
    },
};

export default DoctorManagement;