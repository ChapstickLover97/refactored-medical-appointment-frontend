import React, { useState } from "react";

const PatientAppointmentList = () => {
    const [formData, setFormData] = useState({
        appointmentId: "",
        patientId: "",
        dateOfBirth: "",
    });

    const [appointments, setAppointments] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const newState = { ...prev, [name]: value };

            if (name === "appointmentId" && value) {
                newState.patientId = ""; // Clear and disable Patient ID when Appointment ID is filled
            } else if (name === "patientId" && value) {
                newState.appointmentId = ""; // Clear and disable Appointment ID when Patient ID is filled
            }

            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setAppointments(null);

        try {
            if (!formData.dateOfBirth) {
                throw new Error("Please enter your Date of Birth.");
            }

            let endpoint = "";
            if (formData.patientId) {
                endpoint = `http://localhost:8080/api/appointments/patient/${formData.patientId}?dateOfBirth=${formData.dateOfBirth}`;
            } else if (formData.appointmentId) {
                endpoint = `http://localhost:8080/api/appointments/${formData.appointmentId}?dateOfBirth=${formData.dateOfBirth}`;
            } else {
                throw new Error("Please provide either an Appointment ID or a Patient ID.");
            }

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error("Failed to retrieve appointment(s). Please check the entered information.");
            }

            const data = await response.json();
            setAppointments(Array.isArray(data) ? data : [data]);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={styles.page}>
            <h1>My Appointments</h1>
            <p>View and manage your upcoming scheduled appointments.</p>
            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <label htmlFor="appointmentId" style={styles.label}>Appointment ID:</label>
                    <input
                        type="text"
                        id="appointmentId"
                        name="appointmentId"
                        style={styles.input}
                        value={formData.appointmentId}
                        onChange={handleChange}
                        disabled={!!formData.patientId} // Disable when Patient ID is filled
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="patientId" style={styles.label}>Patient ID:</label>
                    <input
                        type="text"
                        id="patientId"
                        name="patientId"
                        style={styles.input}
                        value={formData.patientId}
                        onChange={handleChange}
                        disabled={!!formData.appointmentId} // Disable when Appointment ID is filled
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="dateOfBirth" style={styles.label}>Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        style={styles.input}
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" style={styles.submitButton}>
                    Retrieve Appointment
                </button>
            </form>

            {error && <p style={styles.error}>{error}</p>}

            {appointments && (
                <div style={styles.details}>
                    <h2>Appointments</h2>
                    {appointments.map((appointment) => (
                        <div key={appointment.id} style={styles.appointmentCard}>
                            <p><strong>Appointment ID:</strong> {appointment.id}</p>
                            <p><strong>Doctor:</strong> {appointment.doctor.name}</p>
                            <p><strong>Specialization:</strong> {appointment.doctor.specialization.name}</p>
                            <p><strong>Date:</strong> {appointment.date}</p>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Status:</strong> {appointment.status}</p>
                        </div>
                    ))}
                </div>
            )}
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
        marginBottom: "1rem",
        maxWidth: "33%",
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
    submitButton: {
        padding: "0.5rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginTop: "1rem",
    },
    details: {
        marginTop: "2rem",
        backgroundColor: "#f9f9f9",
        padding: "1rem",
        borderRadius: "4px",
        border: "1px solid #ddd",
    },
    appointmentCard: {
        marginTop: "1rem",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
};

export default PatientAppointmentList;