import React from "react";

const AdminAppointmentCreation = () => {
    return (
        <div style={styles.page}>
            <h1>Appointment Creation</h1>
            <p>Create a new appointment by selecting a doctor and an available time slot.</p>
            {/* Add form elements for appointment creation here */}
        </div>
    );
};

const styles = {
    page: {
        padding: "2rem",
    },
};

export default AdminAppointmentCreation;