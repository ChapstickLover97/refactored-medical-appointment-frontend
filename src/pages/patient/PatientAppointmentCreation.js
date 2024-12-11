import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:8080/api";

const PatientAppointmentCreation = () => {
    const [specializations, setSpecializations] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState("");

    // Fetch all specializations on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!selectedSpecialization === "" ) {
                    // Fetch doctors when a specialization is selected
                    const doctorsResponse = await fetch(`${BASE_URL}/doctors/specialization/${selectedSpecialization}`, {
                        credentials: "include"
                    });
                    console.log("response:", doctorsResponse);
                    const doctorsData = await doctorsResponse.json();
                    console.log(doctorsData);
                    setDoctors(doctorsData);
                } else {
                    // Fetch specializations if no specialization is selected
                    const specializationsResponse = await fetch(`${BASE_URL}/specializations/getall`, {
                        credentials: "include"
                    });
                    console.log("response:", specializationsResponse);
                    const specializationsData = await specializationsResponse.json();
                    setSpecializations(specializationsData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [selectedSpecialization]);

    return (
        <div style={styles.page}>
            <h1>Create Appointment</h1>
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
                    <select id="doctor" name="doctor" style={styles.input}>
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
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={styles.submitButton}
                >
                    Submit
                </button>
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
    submitButton: {
        marginTop: "1rem",
        padding: "0.75rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        alignSelf: "center",
    },
};

export default PatientAppointmentCreation;