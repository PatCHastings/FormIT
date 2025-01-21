import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import api from "../services/api";

const CreatePassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get the token from the URL
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/register/complete",
        { token, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message || "Password set successfully!");
      setPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "An error occurred while setting your password."
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
        Create Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", mt: 1 }}
      >
        <TextField
          label="New Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
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
          {loading ? "Setting Password..." : "Set Password"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePassword;
