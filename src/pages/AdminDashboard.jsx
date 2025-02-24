import React, { useState } from "react";
import { Tabs, Tab, Box, Paper } from "@mui/material";
import AdminUserView from "../components/AdminUserView";
import ProposalEditorAdmin from "../components/ProposalEditorAdmin";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "",
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{ p: 1, mb: 4, textAlign: "center", backgroundColor: "" }}
      >
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Users" />
          <Tab label="Projects" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>

      {/* Render content based on active tab */}
      <Box sx={{ p: 0 }}>
        {activeTab === 0 && <AdminUserView />} {/* Users tab */}
        {activeTab === 1 && <ProposalEditorAdmin />} {/* Projects tab */}
        {activeTab === 2 && <div>Settings Section Coming Soon</div>}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
