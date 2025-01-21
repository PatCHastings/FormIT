import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, requiredRole }) {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Use jwtDecode

        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          logout(); // Clears auth state and storage
          setIsTokenValid(false);
        } else if (decodedToken.role !== requiredRole) {
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsTokenValid(false);
      }
    } else {
      setIsTokenValid(false);
    }
  }, [auth, requiredRole, logout]);

  // Redirect to login if token is invalid or role does not match
  if (!auth.isAuthenticated || !isTokenValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
