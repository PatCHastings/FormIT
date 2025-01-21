import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem("token"),
    role: localStorage.getItem("role") || null,
  });

  const [shouldRefreshData, setShouldRefreshData] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.role);
      setAuth({ isAuthenticated: true, role: decoded.role });
      setShouldRefreshData(true); // Trigger refresh after login
    } catch (error) {
      throw error; // Allows error to propagate for handling in LoginPage
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({ isAuthenticated: false, role: null });
    setShouldRefreshData(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({ isAuthenticated: true, role: decoded.role });
      } catch (error) {
        console.error("Invalid token, logging out:", error);
        logout(); // Clear invalid tokens
      }
    }
  }, []); // Run only once when the app initializes

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, shouldRefreshData, setShouldRefreshData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
