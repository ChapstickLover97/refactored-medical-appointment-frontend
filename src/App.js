import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import UnauthenticatedRoutes from "./routes/UnauthenticatedRoutes";
import { useCookies } from "react-cookie";

// Utility function to get CSRF token from cookies
const getCsrfToken = () => {
    const csrfCookie = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN="));
    if (!csrfCookie) {
        console.warn("[getCsrfToken] CSRF token not found in cookies.");
        return null;
    }
    const token = csrfCookie.split("=")[1];
    console.debug("[getCsrfToken] CSRF token extracted:", token);
    return token;
};

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(["XSRF-TOKEN"]);

    // Reset authentication state
    const resetAuthState = () => {
        console.debug("Resetting authentication state.");
        setAuthenticated(false);
    };

    // Check authentication status
    useEffect(() => {
        const checkAuthStatus = async () => {
            setLoading(true);
            console.debug("[checkAuthStatus] Starting authentication check...");
            try {
                const csrfToken = cookies["XSRF-TOKEN"];
                console.debug("[checkAuthStatus] CSRF Token retrieved from cookies:", csrfToken);

                const response = await fetch("/api/auth/status", {
                    credentials: "include",
                    headers: csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {},
                });

                if (response.ok) {
                    const data = await response.json();
                    console.debug("[checkAuthStatus] Response Data:", data);

                    if (data.authenticated) {
                        console.debug("[checkAuthStatus] Authentication successful!");
                        setAuthenticated(true);
                    } else {
                        console.warn("[checkAuthStatus] User is not authenticated.");
                        resetAuthState();
                    }
                } else {
                    console.error("[checkAuthStatus] Response status not OK:", response.status, response.statusText);
                    resetAuthState();
                }
            } catch (error) {
                console.error("[checkAuthStatus] Error during fetch:", error);
                resetAuthState();
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, [cookies]);

    // Login function
    const login = () => {
        const port = window.location.port === "3000" ? ":8080" : window.location.port ? `:${window.location.port}` : "";
        window.location.href = `//${window.location.hostname}${port}/oauth2/authorization/okta`;
    };

    // Logout function
    const logout = async () => {
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
            console.error("CSRF token not found. Logout may fail.");
            return;
        }

        try {
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
                window.location.href = `${data.logoutUrl}?id_token_hint=${data.idToken}&post_logout_redirect_uri=${window.location.origin}`;
                resetAuthState();
            } else {
                throw new Error("Logout failed with status: " + response.status);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Render a loading screen while checking authentication status
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar authenticated={authenticated} onLogin={login} onLogout={logout} />
            <Routes>
                {/* Routes for authenticated users */}
                {authenticated ? (
                    <Route path="/*" element={<AuthenticatedRoutes />} />
                ) : (
                    // Routes for unauthenticated users
                    <Route path="/*" element={<UnauthenticatedRoutes />} />
                )}
                {/* Catch-all route for unexpected cases */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;