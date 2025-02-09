import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Get requestId from the URL
import { Box, Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import api from "../services/api"; // Your Axios wrapper

const ProposalEditorAdmin = () => {
  const { requestId } = useParams(); // Extract requestId from the URL
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Proposal Fields
  const [proposalContent, setProposalContent] = useState("");
  const [projectOverview, setProjectOverview] = useState("");
  const [projectScope, setProjectScope] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [nextSteps, setNextSteps] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [complianceRequirements, setComplianceRequirements] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [version, setVersion] = useState(1);
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    if (!requestId) {
      setError("No requestId provided.");
      return;
    }

    const fetchProposal = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/proposal/${requestId}`); // Call the updated route
        if (res.data && res.data.proposal) {
          const p = res.data.proposal;
          setProposalContent(p.proposalContent || "");
          setProjectOverview(p.projectOverview || "");
          setProjectScope(p.projectScope || "");
          setTimeline(p.timeline || "");
          setBudget(p.budget || "");
          setTermsAndConditions(p.termsAndConditions || "");
          setNextSteps(p.nextSteps || "");
          setDeliverables(p.deliverables || "");
          setComplianceRequirements(p.complianceRequirements || "");
          setAdminNotes(p.adminNotes || "");
          setVersion(p.version || 1);
          setStatus(p.status || "draft");
        } else {
          setError("Proposal not found.");
        }
      } catch (err) {
        console.error("Error loading proposal:", err);
        setError("Failed to load proposal.");
      }
      setLoading(false);
    };

    fetchProposal();
  }, [requestId]);

  // Save the proposal modifications
  const handleSave = async () => {
    try {
      await api.post("/proposals", {
        requestId,
        proposalContent,
        projectOverview,
        projectScope,
        timeline,
        budget,
        termsAndConditions,
        nextSteps,
        deliverables,
        complianceRequirements,
        adminNotes,
        version,
        status,
      });
      alert("Proposal saved successfully.");
    } catch (err) {
      console.error("Error saving proposal:", err);
      alert("Error saving proposal. Please try again.");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        m: 2,
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Proposal Editor
      </Typography>

      {loading && <Typography>Loading proposal...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Wrap the form fields inside a Box */}
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Proposal Content"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={proposalContent}
              onChange={(e) => setProposalContent(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Project Overview"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              value={projectOverview}
              onChange={(e) => setProjectOverview(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Project Scope"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={projectScope}
              onChange={(e) => setProjectScope(e.target.value)}
            />
          </Grid>

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

          <Grid item xs={12}>
            <TextField
              label="Terms & Conditions"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
            />
          </Grid>

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

          <Grid item xs={12}>
            <TextField
              label="Deliverables"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Compliance Requirements"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              value={complianceRequirements}
              onChange={(e) => setComplianceRequirements(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Admin Notes"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Box for Save Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Proposal
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProposalEditorAdmin;
