import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import api from "../services/api";

const RegisterAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "client", // Default role
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
      const response = await api.post("/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(
        `User registered successfully! Welcome, ${response.data.user.fullName}.`
      );
      setFormData({ email: "", password: "", fullName: "", role: "client" });
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "An error occurred while registering the user."
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
          label="Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
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
              color: message.includes("successfully") ? "green" : "red",
            }}
          >
            {message}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterAccount;
