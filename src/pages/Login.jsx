import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      const role = localStorage.getItem("role");
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "client") {
        navigate("/client");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError("Invalid username or password");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", err);
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
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ width: "100%", mt: 1 }}
      >
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
