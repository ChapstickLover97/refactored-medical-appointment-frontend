import React, { useState } from "react";

const PatientManagement = () => {
    const [isNewPatient, setIsNewPatient] = useState(true); // Toggle state for New vs Existing Patient
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        patientId: "",
    });

    const [foundPatient, setFoundPatient] = useState(null); // Holds the details of the found patient
    const [message, setMessage] = useState(null);

    const handleToggle = () => {
        setIsNewPatient((prev) => !prev);
        setFormData({ firstName: "", lastName: "", dateOfBirth: "", patientId: "" });
        setMessage(null);
        setFoundPatient(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNewPatientSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await fetch("http://localhost:8080/api/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    dateOfBirth: formData.dateOfBirth,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create patient.");
            }

            const data = await response.json();
            setMessage(`Patient created successfully. Patient ID: ${data.id}`);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleExistingPatientSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            if (!formData.patientId) {
                throw new Error("Please provide a Patient ID.");
            }

            const response = await fetch(`http://localhost:8080/api/patients/${formData.patientId}`);

            if (!response.ok) {
                throw new Error("Patient not found. Please check the Patient ID.");
            }

            const data = await response.json();
            setFoundPatient(data); // Store the patient details to display fields
            setMessage(null); // Clear any previous message
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleUpdatePatient = async () => {
        setMessage(null);

        try {
            const response = await fetch(`http://localhost:8080/api/patients/${formData.patientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(foundPatient),
            });

            if (!response.ok) {
                throw new Error("Failed to update patient information.");
            }

            const data = await response.json();
            setFoundPatient(data); // Update the displayed fields with the updated data
            setMessage("Patient information updated successfully.");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1>Patient Management</h1>
                <h2 style={styles.subheading}>{isNewPatient ? "New Patient" : "Update Patient Info"}</h2>
                <button style={styles.toggleButton} onClick={handleToggle}>
                    {isNewPatient ? "Existing User?" : "New User?"}
                </button>

                {isNewPatient ? (
                    <form style={styles.form} onSubmit={handleNewPatientSubmit}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="firstName" style={styles.label}>
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                style={styles.input}
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="lastName" style={styles.label}>
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                style={styles.input}
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="dateOfBirth" style={styles.label}>
                                Date of Birth:
                            </label>
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
                            Create Patient
                        </button>
                    </form>
                ) : (
                    <form style={styles.form} onSubmit={handleExistingPatientSubmit}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="patientId" style={styles.label}>
                                Patient ID:
                            </label>
                            <input
                                type="text"
                                id="patientId"
                                name="patientId"
                                style={styles.input}
                                value={formData.patientId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" style={styles.submitButton}>
                            Find Patient
                        </button>
                    </form>
                )}

                {foundPatient && (
                    <div style={styles.details}>
                        <h3>Update Patient Information</h3>
                        <div style={styles.inputGroup}>
                            <label htmlFor="firstName" style={styles.label}>
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                style={styles.input}
                                value={foundPatient.firstName}
                                onChange={(e) =>
                                    setFoundPatient((prev) => ({
                                        ...prev,
                                        firstName: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="lastName" style={styles.label}>
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                style={styles.input}
                                value={foundPatient.lastName}
                                onChange={(e) =>
                                    setFoundPatient((prev) => ({
                                        ...prev,
                                        lastName: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="dateOfBirth" style={styles.label}>
                                Date of Birth:
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                style={styles.input}
                                value={foundPatient.dateOfBirth}
                                onChange={(e) =>
                                    setFoundPatient((prev) => ({
                                        ...prev,
                                        dateOfBirth: e.target.value,
                                    }))
                                }
                                required
                            />
                        </div>
                        <button style={styles.updateButton} onClick={handleUpdatePatient}>
                            Update Patient Information
                        </button>
                    </div>
                )}

                {message && (
                    <div style={styles.messageBox}>
                        <p style={styles.message}>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
    },
    content: {
        width: "50%",
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    subheading: {
        fontSize: "1.5rem",
        fontWeight: "normal",
        marginBottom: "1rem",
        color: "#6c757d",
    },
    toggleButton: {
        marginBottom: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "1rem",
        width: "80%",
    },
    label: {
        fontWeight: "bold",
        marginBottom: "0.5rem",
    },
    input: {
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
    },
    submitButton: {
        padding: "0.5rem 1rem",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    messageBox: {
        marginTop: "1.5rem",
        padding: "1rem",
        border: "1px solid #28a745",
        borderRadius: "4px",
        backgroundColor: "#d4edda",
    },
    message: {
        color: "#155724",
        fontWeight: "bold",
        margin: 0,
    },
};

export default PatientManagement;