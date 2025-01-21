import React, { useState } from "react";
import { Box, Typography, Button, TextField, Modal } from "@mui/material";
import api from "../services/api";

const ResetPassword = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes for email, reset token, and new password
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "resetToken") setResetToken(value);
    if (name === "newPassword") setNewPassword(value);
  };

  // Request password reset email
  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/password-reset-request", {
        email,
      });
      setMessage(
        response.data.message || "Password reset email sent successfully!"
      );
      setEmail(""); // Clear email input
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to send password reset email."
      );
    }
  };

  // Submit new password with reset token
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/reset-password", {
        token: resetToken,
        newPassword,
      });
      setMessage(response.data.message || "Password reset successfully!");
      setResetToken("");
      setNewPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to reset password. Try again."
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "400px",
          padding: "2rem",
          backgroundColor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isResetMode ? "Reset Password" : "Request Password Reset"}
        </Typography>
        {message && (
          <Typography
            variant="body2"
            color={message.includes("successfully") ? "success.main" : "error"}
            sx={{ marginBottom: "1rem" }}
          >
            {message}
          </Typography>
        )}

        {!isResetMode ? (
          // Request Password Reset Form
          <form onSubmit={handleResetRequest}>
            <TextField
              label="Email Address"
              name="email"
              value={email}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ marginBottom: "1rem" }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Reset Email
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ marginTop: "1rem" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsResetMode(true)}
              variant="text"
              color="primary"
              fullWidth
              sx={{ marginTop: "0.5rem" }}
            >
              Already have a reset token?
            </Button>
          </form>
        ) : (
          // Reset Password Form
          <form onSubmit={handleResetSubmit}>
            <TextField
              label="Reset Token"
              name="resetToken"
              value={resetToken}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ marginBottom: "1.5rem" }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Reset Password
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ marginTop: "1rem" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setIsResetMode(false)}
              variant="text"
              color="primary"
              fullWidth
              sx={{ marginTop: "0.5rem" }}
            >
              Back to Request Reset
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default ResetPassword;
