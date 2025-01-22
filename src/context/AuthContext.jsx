import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem("token"),
    role: localStorage.getItem("role") || null,
    requestId: localStorage.getItem("requestId")
      ? parseInt(localStorage.getItem("requestId"), 10) // Parse to int
      : null,
  });

  const [shouldRefreshData, setShouldRefreshData] = useState(false);

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      // Expecting { token, requestId, user } in response
      const { token, requestId, user } = response.data;

      // Store data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("requestId", requestId);

      // Update context state
      setAuth({
        isAuthenticated: true,
        role: user.role,
        requestId: parseInt(requestId, 10), // Convert to integer
      });

      setShouldRefreshData(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Rethrow so caller can handle it (e.g., show error message)
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("requestId");

    setAuth({
      isAuthenticated: false,
      role: null,
      requestId: null,
    });
    setShouldRefreshData(false);

    // Optionally redirect
    window.location.href = "/";
  };

  // ON APP INIT
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const storedRequestId = localStorage.getItem("requestId");

    if (token) {
      try {
        // Decode token to get user info
        const decoded = jwtDecode(token);

        // Convert requestId from localStorage to an integer
        const numericRequestId = storedRequestId
          ? parseInt(storedRequestId, 10)
          : null;

        setAuth({
          isAuthenticated: true,
          role: decoded.role || role,
          requestId: isNaN(numericRequestId) ? null : numericRequestId,
        });
      } catch (error) {
        console.error("Invalid token, logging out:", error);
        logout(); // Clear invalid tokens
      }
    }
  }, []);

  // RENDER
  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        shouldRefreshData,
        setShouldRefreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
