import React, { useEffect, useState, useContext } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Paper,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import api from "../services/api"; // API service
import { AuthContext } from "../context/AuthContext";
import RequestViewer from "../components/RequestViewer";

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
  const theme = useTheme();
  const { auth } = useContext(AuthContext);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelectService = (serviceType) => {
    // Navigate to the question flow with a query param or route param
    navigate(`/questionnaire?serviceType=${serviceType}`);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Fetch completed proposals for the logged-in client
  useEffect(() => {
    const fetchProposals = async () => {
      if (!auth.isAuthenticated || !auth.userId) {
        console.warn("User is not authenticated or userId is missing.");
        return;
      }

      try {
        console.log("Fetching proposals for userId:", auth.userId);
        const response = await api.get(`/client/${auth.userId}`);
        console.log("API Response:", response.data);

        // Handle single proposal response
        const proposalData = response.data.proposal
          ? [response.data.proposal] // Wrap in an array
          : [];

        setProposals(proposalData);
      } catch (err) {
        console.error("Failed to fetch proposals:", err);
        setError("No proposals found.");
      } finally {
        setLoading(false);
      }
    };

    if (auth.userId && auth.userId !== "null") fetchProposals();
  }, [auth.isAuthenticated, auth.userId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>

      {/* Current Projects Section */}
      <Accordion
        sx={{ width: "100%", maxWidth: "1200px", minWidth: "350px", mb: 4 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="current-projects-header"
        >
          <Typography variant="h6">Current Projects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            textColor="inherit"
            indicatorColor="none"
            sx={{
              "& .MuiTabs-flexContainer": { gap: 0.5 },
              "& .MuiTab-root": {
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "50px",
                padding: "8px 6px",
                transition: "all 0.3s ease",
                border: `1px solid transparent`,
                "&:hover": {
                  border: `1px solid`,
                  borderColor: theme.palette.primary.main,
                },
              },
              "& .Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
                border: `1px solid`,
              },
            }}
          >
            <Tab label="Proposals" />
            <Tab label="Roadmaps" />
            <Tab label="Outlines" />
          </Tabs>

          {selectedTab === 0 && (
            <Box
              sx={{
                p: 2,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Project Progress
              </Typography>
              <RequestViewer />
            </Box>
          )}

          {selectedTab === 1 && (
            <Box
              sx={{
                p: 2,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Roadmap
              </Typography>
              <Typography variant="body2">[Roadmap details go here]</Typography>
            </Box>
          )}

          {selectedTab === 2 && (
            <Box
              sx={{
                p: 2,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Project Outline
              </Typography>
              <Typography variant="body2">[Outline details go here]</Typography>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Completed Proposals Section */}
      <Accordion sx={{ width: "100%", maxWidth: "900px", mb: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="completed-proposals-header"
        >
          <Typography variant="h6">Completed Proposals</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Grid container spacing={2}>
              {proposals.map((proposal) => (
                <Grid item xs={12} sm={6} key={proposal.id}>
                  <Paper sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1">
                      {proposal.request
                        ? proposal.request.projectName
                        : "Untitled Project"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {proposal.status} | Last Updated:{" "}
                      {new Date(
                        proposal.last_generated_at
                      ).toLocaleDateString()}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() =>
                        navigate(`/proposal/${proposal.request_id}`)
                      }
                    >
                      View Proposal
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Service Selection Section */}
      <Box sx={{ p: 4, width: "100%", maxWidth: "900px" }}>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Which service do you need help with today?
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.key}>
              <Button
                variant="outlined"
                onClick={() => handleSelectService(service.key)}
                size="large"
              >
                {service.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ClientDashboard;
