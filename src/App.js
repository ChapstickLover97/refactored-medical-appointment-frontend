import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import UnauthenticatedRoutes from "./routes/UnauthenticatedRoutes";
import { useCookies } from "react-cookie";

// Utility: Parse URL for tokens
const parseTokenFromUrl = () => {
    // console.debug("[parseTokenFromUrl] Checking URL for tokens...");
    // const params = new URLSearchParams(window.location.hash.substring(1)); // Read tokens from URL hash
    // const idToken = params.get("id_token");
    // if (idToken) {
    //     console.debug("[parseTokenFromUrl] ID Token found in URL:", idToken);
    //     return idToken;
    // }
    // console.warn("[parseTokenFromUrl] No ID Token found in URL.");
    // return null;
};

// Utility: Save token in cookies/localStorage
const saveToken = (idToken) => {
    console.debug("[saveToken] Storing ID Token...");
    // Save in cookies
    document.cookie = `id_token=${idToken}; path=/; secure`;

    // Optionally save in localStorage for redundancy
    localStorage.setItem("id_token", idToken);
};

// Utility: Retrieve token from cookies/localStorage
const getIdToken = () => {
    console.debug("[getIdToken] Retrieving ID Token...");
    const idTokenCookie = document.cookie.split("; ").find((row) => row.startsWith("id_token="));
    if (idTokenCookie) {
        const token = idTokenCookie.split("=")[1];
        console.debug("[getIdToken] ID Token found in cookies:", token);
        return token;
    }

    const idTokenLocalStorage = localStorage.getItem("id_token");
    if (idTokenLocalStorage) {
        console.debug("[getIdToken] ID Token found in localStorage:", idTokenLocalStorage);
        return idTokenLocalStorage;
    }

    console.warn("[getIdToken] ID Token not found.");
    return null;
};

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(["XSRF-TOKEN"]);

    useEffect(() => {
        const initializeAuthentication = async () => {
            console.debug("[initializeAuthentication] Starting authentication process...");

            // Step 1: Check if token is in URL after login
            const idToken = parseTokenFromUrl();
            if (idToken) {
                saveToken(idToken); // Save the token for future use
                setAuthenticated(true);
                // Clear the URL hash to clean up
                window.location.hash = "";
                console.debug("[initializeAuthentication] Token stored and URL cleaned.");
            } else {
                // Step 2: Check backend authentication status
                try {
                    const csrfToken = cookies["XSRF-TOKEN"];
                    const response = await fetch("/api/auth/status", {
                        credentials: "include",
                        headers: csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {},
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.authenticated) {
                            console.debug("[initializeAuthentication] Backend authenticated user.");
                            setAuthenticated(true);
                        } else {
                            console.warn("[initializeAuthentication] Backend says user is not authenticated.");
                        }
                    } else {
                        console.error("[initializeAuthentication] Failed to fetch auth status:", response.statusText);
                    }
                } catch (error) {
                    console.error("[initializeAuthentication] Error during auth status check:", error);
                }
            }

            setLoading(false);
        };

        initializeAuthentication();
    }, [cookies]);

    // Login function
    const login = () => {
        window.location.href = `/oauth2/authorization/okta`;
      };

    // Logout function
    const logout = () => {
        const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN=')).split('=')[1];
        fetch('http://localhost:8080/api/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-Token': csrfToken
          }
        })
          .then((res) => res.json())
          .then((response) => {
            window.location.href = `${response.logoutUrl}?id_token_hint=${response.idToken}&post_logout_redirect_uri=${window.location.origin}`;
          })
         
      };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar authenticated={authenticated} onLogin={login} onLogout={logout} />
            <Routes>
                {authenticated ? (
                    <Route path="/*" element={<AuthenticatedRoutes />} />
                ) : (
                    <Route path="/*" element={<UnauthenticatedRoutes />} />
                )}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;