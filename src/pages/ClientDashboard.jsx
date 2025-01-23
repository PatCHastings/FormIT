import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const services = [
  { key: "general", title: "General" },
  { key: "new_app", title: "New Application" },
  { key: "hosting", title: "Web Hosting" },
  { key: "cloud", title: "Cloud Solutions" },
  // add more as needed...
];

const ClientDashboard = () => {
  const navigate = useNavigate();

  const handleSelectService = (serviceType) => {
    // Navigate to the question flow with a query param or route param
    navigate(`/questionnaire?serviceType=${serviceType}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome to Your Dashboard</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Which service do you need help with today?
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.key}>
            <Button
              variant="contained"
              onClick={() => handleSelectService(service.key)}
            >
              {service.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClientDashboard;
