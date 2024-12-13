import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ authenticated, onLogin, onLogout }) => {

    console.log("Navbar Props:", { authenticated });

    return (
        <nav
            style={{
                backgroundColor: authenticated ? "#343a40" : "#007bff",
                padding: "10px",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {/* Application Title */}
            <div>
                <Link
                    to="/"
                    style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    Medical Appointment System
                </Link>
            </div>

            {/* Navigation Links */}
            <div>
                {authenticated ? (
                    <>
                        <span style={{ marginRight: "15px", fontSize: "16px" }}>
                            Welcome, Doctor
                        </span>
                        <Link
                            to="/admin/admin-dashboard"
                            style={{
                                color: "#007bff",
                                textDecoration: "none",
                                marginRight: "15px",
                            }}
                        >
                            Admin Dashboard
                        </Link>
                        <Link
                            to="/admin/doctor-management"
                            style={{
                                color: "#007bff",
                                textDecoration: "none",
                                marginRight: "15px",
                            }}
                        >
                            Doctor Management
                        </Link>
                        <button
                            style={{
                                background: "none",
                                border: "none",
                                color: "#007bff",
                                cursor: "pointer",
                                fontSize: "16px",
                            }}
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/"
                            style={{
                                color: "#fff",
                                textDecoration: "none",
                                marginRight: "15px",
                            }}
                        >
                            Patient Dashboard
                        </Link>
                        <Link
                            to="/patient-management"
                            style={{
                                color: "#fff",
                                textDecoration: "none",
                                marginRight: "15px",
                            }}
                        >
                            Patient Management
                        </Link>
                        <Link
                            to="/create"
                            style={{
                                color: "#fff",
                                textDecoration: "none",
                                marginRight: "15px",
                            }}
                        >
                            Patient Appointment Creation
                        </Link>
                        <Link
                            to="/list"
                            style={{
                                color: "#fff",
                                textDecoration: "none",
                                marginRight: "15px",
                            }}
                        >
                            Patient Appointment List
                        </Link>
                        {/* New Doctor Management Link */}
                        <Link
                            to="/doctor-management"
                            style={{
                                color: "#fff",
                                textDecoration: "none",
                                marginRight: "15px",
                            }}
                        >
                            MOCK Doctor Management
                        </Link>
                        <button
                            style={{
                                background: "#007bff",
                                border: "none",
                                color: "#fff",
                                padding: "5px 10px",
                                cursor: "pointer",
                                fontSize: "16px",
                            }}
                            onClick={onLogin}
                        >
                            Admin Login
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;