import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:8080/api"; // Ensure this URL is correct

const PatientAppointmentCreation = () => {
    const [specializations, setSpecializations] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [patientId, setPatientId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch specializations on component mount
    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const response = await fetch(`${BASE_URL}/specializations`, {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch specializations.");
                }
                const data = await response.json();
                setSpecializations(data);
                console.log("Specializations fetched:", data);
            } catch (error) {
                console.error("Error fetching specializations:", error);
            }
        };

        fetchSpecializations();
    }, []);

    // Fetch doctors when a specialization is selected
    useEffect(() => {
        if (!selectedSpecialization) {
            setDoctors([]);
            return;
        }

        const fetchDoctors = async () => {
            try {
                const response = await fetch(`${BASE_URL}/doctors/specialization/${selectedSpecialization}`, {
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch doctors.");
                const data = await response.json();
                setDoctors(data);
                console.log("Doctors fetched:", data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, [selectedSpecialization]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setError("");

        if (!patientId || !selectedSpecialization || !selectedDoctor || !date || !time) {
            setError("Please fill out all fields.");
            return;
        }

        const appointmentData = {
            patientId,
            specializationId: selectedSpecialization,
            doctorId: selectedDoctor,
            date,
            time,
        };

        try {
            const response = await fetch(`${BASE_URL}/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                throw new Error("Failed to create appointment.");
            }

            const data = await response.json();
            setSuccessMessage(`Appointment created successfully with ID: ${data.id}`);
        } catch (error) {
            console.error("Error creating appointment:", error);
            setError("Failed to create appointment. Please try again.");
        }
    };

    return (
        <div style={styles.page}>
            <h1>Create Appointment</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                {/* Patient ID */}
                <div style={styles.inputGroup}>
                    <label htmlFor="patientId" style={styles.label}>Patient ID:</label>
                    <input
                        type="text"
                        id="patientId"
                        name="patientId"
                        style={styles.input}
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                    />
                </div>

                {/* Specialization Dropdown */}
                <div style={styles.inputGroup}>
                    <label htmlFor="specialization" style={styles.label}>Choose Specialization:</label>
                    <select
                        id="specialization"
                        name="specialization"
                        style={styles.input}
                        value={selectedSpecialization}
                        onChange={(e) => setSelectedSpecialization(e.target.value)}
                    >
                        <option value="">Select a Specialization</option>
                        {specializations.map((specialization) => (
                            <option key={specialization.id} value={specialization.id}>
                                {specialization.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Doctor Dropdown */}
                <div style={styles.inputGroup}>
                    <label htmlFor="doctor" style={styles.label}>Choose Doctor:</label>
                    <select
                        id="doctor"
                        name="doctor"
                        style={styles.input}
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                        <option value="">Select a Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div style={styles.inputGroup}>
                    <label htmlFor="date" style={styles.label}>Choose Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        style={styles.input}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Time */}
                <div style={styles.inputGroup}>
                    <label htmlFor="time" style={styles.label}>Choose Time:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        style={styles.input}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={styles.submitButton}
                >
                    Submit
                </button>

                {/* Success Message */}
                {successMessage && <p style={styles.success}>{successMessage}</p>}

                {/* Error Message */}
                {error && <p style={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

const styles = {
    page: {
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "600px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "1rem",
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
        padding: "0.75rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
    },
    success: {
        color: "green",
        marginTop: "1rem",
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginTop: "1rem",
    },
};

export default PatientAppointmentCreation;