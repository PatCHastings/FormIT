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

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      // Expecting { token, user } in response
      const { token, user } = response.data;

      // Store data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // Update context state
      setAuth({
        isAuthenticated: true,
        role: user.role,
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

    setAuth({
      isAuthenticated: false,
      role: null,
    });
    setShouldRefreshData(false);

    // Optionally redirect
    window.location.href = "/";
  };

  // ON APP INIT
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      try {
        // Decode token to get user info
        const decoded = jwtDecode(token);

        setAuth({
          isAuthenticated: true,
          role: decoded.role || role,
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
