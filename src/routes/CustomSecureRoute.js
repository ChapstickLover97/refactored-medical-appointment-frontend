// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useOktaAuth } from "@okta/okta-react";

// const CustomSecureRoute = ({ children }) => {
//     const { authState } = useOktaAuth();
//     const location = useLocation();

//     // Log initial state and location for debugging
//     console.log("[CustomSecureRoute] Invoked.");
//     console.log("[CustomSecureRoute] authState:", authState);
//     console.log("[CustomSecureRoute] location:", location);

//     // Handle undefined authState (indicates loading or error state)
//     if (!authState) {
//         console.error("[CustomSecureRoute] authState is undefined. Redirecting to /login...");
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     // Handle unauthenticated users
//     if (!authState.isAuthenticated) {
//         console.warn("[CustomSecureRoute] User is not authenticated. Redirecting to /login...");
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     // Log success and render protected content
//     console.log("[CustomSecureRoute] User is authenticated. Rendering protected content.");
//     return children;
// };

// export default CustomSecureRoute;