import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div>
      <div></div>
      <Fade in timeout={1000}>
        <Box
          component="main"
          sx={{
            minHeight: "100vh",
            backgroundColor: "",
            py: 4,
          }}
        >
          <Container maxWidth="md">
            {/* Hero Section */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                textAlign: "center",
                backgroundColor: "",
              }}
            >
              <Typography variant="h3" component="h1" gutterBottom>
                Welcome to FormIT, Your Custom Software Builder.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Specialized in building custom applications fast and
                inexpensive; tailored to your business needs. Before we begin,
                we need to learn more about your requirements to ensure a
                successful product.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Get Started
              </Button>
            </Paper>

            {/* Key Questions Section */}
            <Typography variant="h5" gutterBottom>
              Key Questions to Understand Your Project
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              These questions help us gather essential details about your
              software/application needs.
            </Typography>

            {/* Example of MUI Accordions for grouping questions */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  1. Company & Stakeholder Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="ul" variant="body2">
                  <li>What does your company do?</li>
                  <li>Who are your primary customers or end users?</li>
                  <li>
                    Who is the main point of contact and who are key
                    stakeholders?
                  </li>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  2. Project Scope & Requirements
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="ul" variant="body2">
                  <li>What problem(s) are you trying to solve?</li>
                  <li>What are the must-have features?</li>
                  <li>
                    Are there any technical preferences or integrations
                    required?
                  </li>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  3. Budget & Timeline
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="ul" variant="body2">
                  <li>What is your estimated or approved budget range?</li>
                  <li>Do you have a specific deadline or milestone?</li>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Container>
        </Box>
      </Fade>
    </div>
  );
}

export default Homepage;
