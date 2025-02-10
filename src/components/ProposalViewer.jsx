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
import FormITSvg from "../svg/formITsvg";

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
        const res = await api.get(`/proposals`, {
          params: { requestId }, // Pass requestId as query parameter
        });
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
        <FormITSvg /> AI Proposal
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
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
                sx={{
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.default,
                  },
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                }}
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
  );
};

export default ProposalViewer;
