import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const services = [
  {
    key: "new_app", // Matches serviceType in the database
    title: "New Application Development",
    description: "Build a new app tailored to your needs.",
  },
  {
    key: "website", // Matches serviceType in the database
    title: "Website Development",
    description: "Get a modern, responsive website.",
  },
  {
    key: "hosting", // Matches serviceType in the database
    title: "Web Hosting Services",
    description: "Domain setup and hosting solutions.",
  },
  {
    key: "cloud", // Matches serviceType in the database
    title: "Cloud Solutions",
    description: "Cloud storage and server provisioning.",
  },
  {
    key: "bug_fixes", // Matches serviceType in the database
    title: "Bug Fixes & Debugging",
    description: "Fix issues in your existing applications.",
  },
  {
    key: "ui_ux", // Matches serviceType in the database
    title: "UI/UX Enhancements",
    description: "Enhance the look and usability of your software.",
  },
  {
    key: "database", // Matches serviceType in the database
    title: "Database Design",
    description: "Optimize your database for better performance.",
  },
  {
    key: "api_integration", // Matches serviceType in the database
    title: "API Integration",
    description: "Connect your software to third-party services.",
  },
  {
    key: "mobile", // Matches serviceType in the database
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps.",
  },
  {
    key: "maintenance", // Matches serviceType in the database
    title: "Ongoing Maintenance",
    description: "Regular updates and support for your apps.",
  },
  {
    key: "ai_ml", // Matches serviceType in the database
    title: "AI/ML Integration",
    description: "Add intelligent features to your applications.",
  },
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
