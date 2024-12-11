import React from "react";

const AdminAppointmentList = () => {
    return (
        <div style={styles.page}>
            <h1>Appointment List</h1>
            <p>View all your upcoming scheduled appointments here.</p>
            {/* Add components for displaying appointments dynamically */}
        </div>
    );
};

const styles = {
    page: {
        padding: "2rem",
    },
};

export default AdminAppointmentList;