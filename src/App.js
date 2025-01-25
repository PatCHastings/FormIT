import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ThemeContextProvider from "./context/themeContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import RegisterAccount from "./pages/RegisterAccount";
import CreatePassword from "./pages/CreatePassword";
import AdminDashboard from "./pages/AdminDashboard";
import ClientForm from "./pages/ClientForm";    // Existing questionnaire form
import ClientDashboard from "./pages/ClientDashboard"; // <-- Import your new dashboard
import Navbar from "./components/Navbar";
import AdminUserForm from "./pages/AdminUserForm";

function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Navbar />

          {/* Routes */}
          <div style={{ marginTop: "55px" /* current Navbar height */ }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterAccount />} />
              <Route path="/create-password" element={<CreatePassword />} />

              {/* Inline component to determine default route based on auth */}
              <Route path="/default" element={<DefaultRedirect />} />

              {/* Admin Dashboard */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/user-form/:clientId"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminUserForm />
                  </ProtectedRoute>
                }
              />


              {/* Client Dashboard */}
              <Route
                path="/client"
                element={
                  <ProtectedRoute requiredRole="client">
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Client Form (Questionnaire) */}
              <Route
                path="/questionnaire"
                element={
                  <ProtectedRoute requiredRole="client">
                    <ClientForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeContextProvider>
  );
}

// Default redirect logic based on role
function DefaultRedirect() {
  const { auth } = useContext(AuthContext);

  // Determine default route based on authentication and role
  const getDefaultRoute = () => {
    if (!auth.isAuthenticated) {
      return <Navigate to="/" />;
    }

    // Redirect based on role
    if (auth.role === "admin") return <Navigate to="/admin" />;
    if (auth.role === "client") return <Navigate to="/client/dashboard" />;

    return <Navigate to="/" />;
  };

  return getDefaultRoute();
}

export default App;
