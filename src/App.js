import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PatientDashboard from "./pages/patient/PatientDashboard";
import AdminRoutes from "./routes/AdminRoutes";
import PatientRoutes from "./routes/PatientRoutes";
import { useCookies } from "react-cookie";

// Utility function to get CSRF token from cookies
const getCsrfToken = () => {
    const csrfCookie = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
};

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState("PATIENT"); // Default to "PATIENT"
    const [loading, setLoading] = useState(false); // Only used for Admin auth checks
    const [cookies, setCookies] = useCookies(["XSRF-TOKEN"]);

    // Reset authentication state
    const resetAuthState = () => {
        setAuthenticated(false);
        setUserRole("PATIENT");
    };

    // Check authentication only for Admin users
    useEffect(() => {
        if (userRole === "ADMIN") {
            const checkAuthStatus = async () => {
                setLoading(true); // Only set loading for Admin auth checks
                try {
                    console.debug("Checking authentication status for ADMIN...");
                    const csrfToken = cookies["XSRF-TOKEN"];

                    const response = await fetch("/api/auth/status", {
                        credentials: "include",
                        headers: csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {},
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.debug("Authentication successful:", data);
                        setAuthenticated(true);
                    } else {
                        console.warn("Failed to authenticate Admin. Resetting auth state.");
                        resetAuthState();
                    }
                } catch (error) {
                    console.error("Error during Admin authentication check:", error);
                    resetAuthState();
                } finally {
                    setLoading(false);
                }
            };

            checkAuthStatus();
        }
    }, [userRole]);

    // Login only for Admins
    const login = () => {
        console.debug("Redirecting to login...");
        const port = window.location.port === "3000" ? ":8080" : window.location.port ? `:${window.location.port}` : "";
        window.location.href = `//${window.location.hostname}${port}/oauth2/authorization/okta`;
    };

    // Logout only for Admins
    const logout = async () => {
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
            console.error("CSRF token not found. Logout may fail.");
            return;
        }

        try {
            console.debug("Logging out...");
            const response = await fetch("/api/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrfToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.debug("Logout successful:", data);
                window.location.href = `${data.logoutUrl}?id_token_hint=${data.idToken}&post_logout_redirect_uri=${window.location.origin}`;
                resetAuthState();
            } else {
                throw new Error("Logout failed");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Log state updates for debugging
    useEffect(() => {
        console.debug("Auth state updated:", { authenticated, userRole });
    }, [authenticated, userRole]);

    // Render a loading screen while checking Admin auth status
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar authenticated={authenticated} userRole={userRole} onLogin={login} onLogout={logout} />
            <Routes>
                {/* Routes for Admin users */}
                {authenticated && userRole === "ADMIN" && (
                    <Route path="/admin/*" element={<AdminRoutes />} />
                )}

                {/* Routes for Patients */}
                {!authenticated && userRole === "PATIENT" && (
                    <>
                        <Route path="/" element={<PatientDashboard />} />
                        <Route path="/*" element={<PatientRoutes />} />
                    </>
                )}

                {/* Catch-all route for unexpected cases */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;