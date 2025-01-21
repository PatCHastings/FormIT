import React from "react";
import { Tabs, Tab, Box, Paper } from "@mui/material";
import Navbar from "../components/Navbar";
// import api from "../api";

function AdminDashboard() {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", backgroundColor: "", py: 4 }}
    >
      <Navbar />
      <Paper
        elevation={3}
        sx={{ p: 4, mb: 4, textAlign: "center", backgroundColor: "" }}
      >
        <Tabs>
          <Tab label="Users" />
          <Tab label="Projects" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>
    </Box>
  );
}

export default AdminDashboard;
