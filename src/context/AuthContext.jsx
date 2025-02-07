import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem("token"),
    userId: localStorage.getItem("userId") || null, // ✅ Ensure userId is stored
    role: localStorage.getItem("role") || null,
  });

  const [shouldRefreshData, setShouldRefreshData] = useState(false);

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      // Store data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id); // ✅ Store userId
      localStorage.setItem("role", user.role);

      setAuth({
        isAuthenticated: true,
        userId: user.id, // ✅ Ensure auth state has userId
        role: user.role,
      });

      setShouldRefreshData(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setAuth({
      isAuthenticated: false,
      userId: null,
      role: null,
    });
    setShouldRefreshData(false);

    window.location.href = "/";
  };

  // ON APP INIT: Ensure auth state syncs with localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // ✅ Retrieve stored userId
    const role = localStorage.getItem("role");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setAuth({
          isAuthenticated: true,
          userId: decoded.userId || userId, // ✅ Ensure we have userId
          role: decoded.role || role,
        });
      } catch (error) {
        console.error("Invalid token, logging out:", error);
        logout();
      }
    }
  }, []);

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
