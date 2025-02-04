import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import api from "../services/api"; // Assume you have an API service for proposals

const ProposalEditor = ({ clientId }) => {
  const theme = useTheme();

  // State for each section of the proposal
  const [overview, setOverview] = useState("");
  const [scope, setScope] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [terms, setTerms] = useState("");
  const [nextSteps, setNextSteps] = useState("");

  // Optionally, load existing proposal data for the client if available
  useEffect(() => {
    const loadProposal = async () => {
      try {
        const res = await api.get(`/proposals?clientId=${clientId}`);
        if (res.data) {
          setOverview(res.data.overview);
          setScope(res.data.scope);
          setTimeline(res.data.timeline);
          setBudget(res.data.budget);
          setTerms(res.data.terms);
          setNextSteps(res.data.nextSteps);
        }
      } catch (error) {
        console.error("Error loading proposal:", error);
      }
    };
    loadProposal();
  }, [clientId]);

  const handleSave = async () => {
    const proposalData = {
      clientId,
      overview,
      scope,
      timeline,
      budget,
      terms,
      nextSteps,
    };

    try {
      // Save as draft; you might want to have a separate endpoint for final proposals.
      await api.post("/proposals", proposalData);
      alert("Proposal saved!");
    } catch (error) {
      console.error("Error saving proposal:", error);
      alert("Error saving proposal. Please try again.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        m: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Project Proposal
      </Typography>
      <Grid container spacing={2}>
        {/* Project Overview */}
        <Grid item xs={12}>
          <TextField
            label="Project Overview"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
        </Grid>
        {/* Project Scope */}
        <Grid item xs={12}>
          <TextField
            label="Project Scope"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
          />
        </Grid>
        {/* Timeline */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Timeline"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
          />
        </Grid>
        {/* Budget */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Budget"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </Grid>
        {/* Terms */}
        <Grid item xs={12}>
          <TextField
            label="Terms & Conditions"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </Grid>
        {/* Next Steps */}
        <Grid item xs={12}>
          <TextField
            label="Next Steps"
            multiline
            rows={2}
            fullWidth
            variant="outlined"
            value={nextSteps}
            onChange={(e) => setNextSteps(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Proposal
        </Button>
      </Box>
    </Paper>
  );
};

export default ProposalEditor;
