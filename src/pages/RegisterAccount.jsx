import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import api from "../services/api";

const RegisterAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
  });
  const [message, setMessage] = useState(""); // For success or error messages
  const [loading, setLoading] = useState(false); // Loading state for button

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting formData:", formData);
      const response = await api.post("/auth/register/initiate", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(
        response.data.message || "Check your email to set a password."
      );
      setFormData({ email: "", fullName: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "An error occurred while initiating registration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "2rem",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Register Account
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", mt: 1 }}
      >
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <TextField
          label="Full Name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
        />
        {message && (
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: message.includes("Check your email") ? "green" : "red",
            }}
          >
            {message}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          disabled={loading}
        >
          {loading ? "Processing..." : "Register"}
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterAccount;
