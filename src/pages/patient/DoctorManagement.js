import React, { useState, useEffect } from "react";

const DoctorManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [editingDoctorId, setEditingDoctorId] = useState(null);
    const [editedNames, setEditedNames] = useState({});
    const [newDoctorName, setNewDoctorName] = useState(""); // State for new doctor name
    const [newSpecializationId, setNewSpecializationId] = useState(""); // State for new specialization ID
    const [specializations, setSpecializations] = useState([]); // State for available specializations

    // Fetch all doctors
    const fetchDoctors = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/doctors");
            const data = await response.json();
            setDoctors(data);
            const initialEditedNames = {};
            data.forEach((doctor) => {
                initialEditedNames[doctor.id] = doctor.name;
            });
            setEditedNames(initialEditedNames);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    // Fetch all specializations
    const fetchSpecializations = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/specializations");
            const data = await response.json();
            setSpecializations(data);
        } catch (error) {
            console.error("Error fetching specializations:", error);
        }
    };

    useEffect(() => {
        fetchDoctors();
        fetchSpecializations();
    }, []);

    // Add a new doctor
    const handleAddDoctor = async (e) => {
        e.preventDefault();
        if (!newDoctorName || !newSpecializationId) {
            alert("Please fill out all fields!");
            return;
        }

        try {
            await fetch("http://localhost:8080/api/doctors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newDoctorName,
                    specializationId: Number(newSpecializationId),
                }),
            });
            setNewDoctorName(""); // Clear input fields
            setNewSpecializationId("");
            fetchDoctors(); // Refresh the doctor list
        } catch (error) {
            console.error("Error adding doctor:", error);
        }
    };

    // Update an existing doctor
    const handleUpdate = async (id) => {
        const updatedName = editedNames[id];
        const doctorToUpdate = doctors.find((doctor) => doctor.id === id);
        if (!doctorToUpdate) return;

        try {
            await fetch(`http://localhost:8080/api/doctors/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: updatedName,
                    specializationId: doctorToUpdate.specializationId,
                }),
            });
            fetchDoctors(); // Refresh doctors
            setEditingDoctorId(null);
        } catch (error) {
            console.error("Error updating doctor:", error);
        }
    };

    // Delete a doctor
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/doctors/${id}`, {
                method: "DELETE",
            });
            fetchDoctors();
            setEditingDoctorId(null);
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };

    const handleEdit = (id) => {
        setEditingDoctorId(id);
    };

    const handleInputChange = (id, value) => {
        setEditedNames((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Doctor Management</h2>
            <h3 style={{ color: "#666", marginBottom: "10px" }}>Add Doctor</h3>
            <form onSubmit={handleAddDoctor} style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ fontWeight: "bold" }}>
                        Doctor Name:
                        <input
                            type="text"
                            value={newDoctorName}
                            onChange={(e) => setNewDoctorName(e.target.value)}
                            placeholder="Enter doctor's name"
                            style={{ marginLeft: "10px", padding: "5px", width: "70%" }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ fontWeight: "bold" }}>
                        Specialization:
                        <select
                            value={newSpecializationId}
                            onChange={(e) => setNewSpecializationId(e.target.value)}
                            style={{ marginLeft: "10px", padding: "5px", width: "70%" }}
                        >
                            <option value="">Select Specialization</option>
                            {specializations.map((specialization) => (
                                <option key={specialization.id} value={specialization.id}>
                                    {specialization.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Add Doctor
                </button>
            </form>
            <h3 style={{ color: "#666", marginBottom: "10px" }}>Existing Doctors</h3>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {doctors.map((doctor) => (
                    <li
                        key={doctor.id}
                        style={{
                            marginBottom: "10px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            backgroundColor: "#f9f9f9",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ marginBottom: "5px" }}>
                            <input
                                type="text"
                                value={editedNames[doctor.id] || ""}
                                onChange={(e) => handleInputChange(doctor.id, e.target.value)}
                                disabled={editingDoctorId !== doctor.id}
                                style={{
                                    padding: "5px",
                                    width: "70%",
                                    border: editingDoctorId === doctor.id ? "1px solid #4CAF50" : "none",
                                    backgroundColor: editingDoctorId === doctor.id ? "#fff" : "transparent",
                                    borderRadius: "4px",
                                    textAlign: "center",
                                }}
                            />
                        </div>
                        {editingDoctorId === doctor.id ? (
                            <div>
                                <button
                                    onClick={() => handleUpdate(doctor.id)}
                                    style={{
                                        marginRight: "5px",
                                        padding: "5px 10px",
                                        backgroundColor: "#4CAF50",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(doctor.id)}
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: "#FF5733",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleEdit(doctor.id)}
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#FFA500",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                Edit
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorManagement;