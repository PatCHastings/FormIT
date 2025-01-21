import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThemeContextProvider from './context/themeContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Homepage from './pages/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import RegisterAccount from './pages/RegisterAccount';
import CreatePassword from "./pages/CreatePassword";
import AdminDashboard from './pages/AdminDashboard';
// import ClientDashboard from './pages/ClientDashboard';
import Navbar from './components/Navbar'; // Import Navbar

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
          {/* Navbar will always render */}
          <Navbar />

          {/* Routes */}
          <div style={{ marginTop: '55px' /* Matches Navbar height */ }}>
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

              {/* Client Dashboard */}
              <Route
                path="/client"
                element={
                  <ProtectedRoute requiredRole="client">
                    
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
    if (auth.role === 'admin') return <Navigate to="/admin" />;
    if (auth.role === 'client') return <Navigate to="/client" />;

    return <Navigate to="/" />;
  };

  return getDefaultRoute();
}

export default App;
