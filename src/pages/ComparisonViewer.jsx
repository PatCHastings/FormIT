import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import api from "../services/api"; // Ensure this correctly points to your API wrapper

const ComparisonViewer = ({ requestId }) => {
  const { requestId: paramRequestId } = useParams();
  const finalRequestId = requestId || paramRequestId;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);

  useEffect(() => {
    if (!finalRequestId) {
      setError("No requestId provided.");
      return;
    }
  }, [finalRequestId]);

  // Function to fetch or generate the comparison
  const handleGenerateComparison = async () => {
    if (!finalRequestId) {
      setError("No requestId found, cannot generate comparison.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/generate-comparison", {
        requestId: finalRequestId,
      });

      if (response.data && response.data.comparison) {
        setComparisonData(response.data.comparison);
      } else {
        setError("Comparison data could not be retrieved.");
      }
    } catch (err) {
      console.error("Error fetching comparison:", err);
      setError("Failed to generate comparison. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, m: 2, backgroundColor: "white", borderRadius: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Industry vs. FormIT AI Comparison
      </Typography>

      {/* Show button if comparison hasn't been generated */}
      {!comparisonData && !loading && (
        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateComparison}
          >
            Finish & Generate Comparison
          </Button>
        </Box>
      )}

      {/* Show loading animation while waiting for OpenAI response */}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Generating Comparison...
          </Typography>
        </Box>
      )}

      {/* Display Error Message */}
      {error && (
        <Typography color="error" textAlign="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Render Comparison Data */}
      {comparisonData && (
        <Box mt={4}>
          <Typography variant="h5">📊 Timeline Estimates</Typography>
          <Typography>
            <strong>Industry Standard:</strong>{" "}
            {comparisonData.timelineIndustryTime}
          </Typography>
          <Typography>
            <strong>FormIT AI-Powered:</strong>{" "}
            {comparisonData.timelineFormitTime}
          </Typography>

          <Typography variant="h5" mt={3}>
            💰 Budget Estimates
          </Typography>
          <Typography>
            <strong>Industry Standard:</strong>{" "}
            {comparisonData.budgetIndustryCost}
          </Typography>
          <Typography>
            <strong>FormIT AI-Powered:</strong>{" "}
            {comparisonData.budgetFormitCost}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ComparisonViewer;
