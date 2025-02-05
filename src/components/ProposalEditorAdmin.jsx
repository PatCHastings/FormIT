// ProposalEditorAdmin.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import api from "../services/api"; // Your Axios/fetch wrapper

const ProposalEditorAdmin = ({ requestId }) => {
  const theme = useTheme();

  // State to hold the proposal data
  // eslint-disable-next-line no-unused-vars
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Separate state for each proposal section
  const [overview, setOverview] = useState("");
  const [scope, setScope] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [terms, setTerms] = useState("");
  const [nextSteps, setNextSteps] = useState("");
  const [status, setStatus] = useState("draft"); // workflow: draft, submitted, approved, etc.
  const [version, setVersion] = useState(1);

  // Load existing proposal data when the component mounts or when requestId changes
  useEffect(() => {
    if (!requestId) return;
    const fetchProposal = async () => {
      setLoading(true);
      try {
        // Assume the API returns { proposal: { ... } } or null if not found
        const res = await api.get(`/proposals?requestId=${requestId}`);
        if (res.data && res.data.proposal) {
          const p = res.data.proposal;
          setProposal(p);
          setOverview(p.overview || "");
          setScope(p.scope || "");
          setTimeline(p.timeline || "");
          setBudget(p.budget || "");
          setTerms(p.terms || "");
          setNextSteps(p.nextSteps || "");
          setStatus(p.status || "draft");
          setVersion(p.version || 1);
        }
      } catch (err) {
        console.error("Error loading proposal:", err);
        setError("Failed to load proposal.");
      }
      setLoading(false);
    };

    fetchProposal();
  }, [requestId]);

  // Handle Save: This either creates a new proposal or updates an existing one.
  const handleSave = async () => {
    const proposalData = {
      requestId,
      overview,
      scope,
      timeline,
      budget,
      terms,
      nextSteps,
      status,
      version,
    };

    try {
      // We assume a POST endpoint that creates or updates the proposal based on requestId.
      const res = await api.post("/proposals", proposalData);
      if (res.data && res.data.proposal) {
        const savedProposal = res.data.proposal;
        setProposal(savedProposal);
        setVersion(savedProposal.version);
        alert("Proposal saved successfully.");
      }
    } catch (err) {
      console.error("Error saving proposal:", err);
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
        Proposal Editor
      </Typography>

      {loading && <Typography>Loading proposal...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

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

        {/* Terms & Conditions */}
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

export default ProposalEditorAdmin;
