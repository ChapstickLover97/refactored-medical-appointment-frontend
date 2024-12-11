import React from "react";

const PatientAppointmentList = () => {
    return (
        <div style={styles.page}>
            <h1>My Appointments</h1>
            <p>View all your upcoming scheduled appointments here.</p>
            <form style={styles.form}>
                {/* First Name */}
                <div style={styles.inputGroup}>
                    <label htmlFor="firstName" style={styles.label}>First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        style={styles.input}
                    />
                </div>

                {/* Last Name */}
                <div style={styles.inputGroup}>
                    <label htmlFor="lastName" style={styles.label}>Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        style={styles.input}
                    />
                </div>

                {/* Date of Birth */}
                <div style={styles.inputGroup}>
                    <label htmlFor="dateOfBirth" style={styles.label}>Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        style={styles.input}
                    />
                </div>

                {/* Appointment ID */}
                <div style={styles.inputGroup}>
                    <label htmlFor="appointmentId" style={styles.label}>Appointment ID:</label>
                    <input
                        type="text"
                        id="appointmentId"
                        name="appointmentId"
                        style={styles.input}
                    />
                </div>
            </form>
        </div>
    );
};

const styles = {
    page: {
        padding: "2rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontWeight: "bold",
        marginBottom: "0.5rem",
    },
    input: {
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
};

export default PatientAppointmentList;