import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import api from "../services/api";
import ComparisonViewer from "../pages/ComparisonViewer";
import { useTheme } from "@mui/material/styles";
import FormITsmall from "../svg/FormITsmall";

const ProposalViewer = () => {
  const { requestId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposalData, setProposalData] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    console.log("Fetched requestId:", requestId); // Debugging
    if (!requestId) {
      setError("No requestId found.");
      setLoading(false);
      return;
    }

    const fetchProposal = async () => {
      try {
        const res = await api.get(`/proposal/${requestId}`);
        if (res.data && res.data.proposal) {
          setProposalData(res.data.proposal);
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh", // Ensures it's centered even with less content
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
          maxWidth: 1000,
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          <FormITsmall /> AI Proposal
        </Typography>

        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
          >
            <CircularProgress />
          </Box>
        )}
        {error && <Typography color="error">{error}</Typography>}

        {proposalData && (
          <>
            <Typography variant="h6">Project Overview</Typography>
            <Typography>{proposalData.projectOverview}</Typography>

            <Typography variant="h6" mt={2}>
              Project Scope
            </Typography>
            <Typography>{proposalData.projectScope}</Typography>

            <Typography variant="h6" mt={2}>
              Timeline
            </Typography>
            <Typography>{proposalData.timeline}</Typography>

            <Typography variant="h6" mt={2}>
              Budget
            </Typography>
            <Typography>{proposalData.budget}</Typography>

            {/* Show Comparison Button */}
            {!showComparison && (
              <Box textAlign="center" mt={4}>
                <Button
                  variant="outlined"
                  onClick={() => setShowComparison(true)}
                >
                  Compare Industry vs FormIT
                </Button>
              </Box>
            )}

            {/* Render Comparison Component if Button is Clicked */}
            {showComparison && <ComparisonViewer requestId={requestId} />}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProposalViewer;
