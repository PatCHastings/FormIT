import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Allows navigation to the login page
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Track success state

  // Extract token from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [location.search]);

  // Submit new password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });
      setMessage(response.data.message || "Password reset successfully!");
      setIsSuccess(true); // Hide the password field and change the button
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to reset password. Try again."
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
        Reset Your Password
      </Typography>
      {message && (
        <Typography
          variant="body2"
          color={message.includes("successfully") ? "success.main" : "error"}
          sx={{ marginBottom: "1rem", textAlign: "center" }}
        >
          {message}
        </Typography>
      )}
      {!isSuccess ? (
        <>
          <Typography variant="body1" gutterBottom>
            Enter a new password below to reset your account. The token has been
            automatically applied from the URL.
          </Typography>
          <Box
            sx={{
              padding: "0.5rem",
              borderRadius: "4px",
              marginBottom: "1rem",
              wordWrap: "break-word",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            <strong>Token:</strong> {token || "No token provided"}
          </Box>
          <form onSubmit={handleResetSubmit}>
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: "1.5rem" }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Reset Password
            </Button>
          </form>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/login")} // Redirect to login page
        >
          Go to Login
        </Button>
      )}
    </Box>
  );
};

export default ResetPassword;
