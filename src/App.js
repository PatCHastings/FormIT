import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import RegisterAccount from "./pages/RegisterAccount";
import CreatePassword from "./pages/CreatePassword";
import AdminDashboard from "./pages/AdminDashboard";
import ClientForm from "./pages/ClientForm";    
import ClientDashboard from "./pages/ClientDashboard"; 
import Navbar from "./components/Navbar";
import AdminUserForm from "./pages/AdminUserForm";
import AdminUserView from "./components/AdminUserView";
import ProposalEditorAdmin from "./components/ProposalEditorAdmin"; 
import ProposalViewer from "./components/ProposalViewer";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
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
          <Route path="/reset-password" element={<ResetPassword />} />

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
          <Route path="/admin" element={<AdminUserView />} />
          <Route path="/proposals/:requestId" element={<ProposalEditorAdmin />} />

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
          <Route path="/proposal/:requestId" element={<ProposalViewer />} />
        </Routes>
      </div>
    </BrowserRouter>
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
    if (auth.role === "client") return <Navigate to="/client" />;

    return <Navigate to="/" />;
  };

  return getDefaultRoute();
}

export default App;
