import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import api from "../services/api";

const ComparisonViewer = ({ requestId }) => {
  const { requestId: paramRequestId } = useParams();
  const finalRequestId = requestId || paramRequestId;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (!finalRequestId) {
      setError("No requestId provided.");
    }
  }, [finalRequestId]);

  const handleGenerateComparison = async () => {
    if (!finalRequestId) {
      setError("No requestId found, cannot generate comparison.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/comparison/generate-comparison", {
        requestId: finalRequestId,
      });

      if (response.data && response.data.comparison) {
        setComparisonData(response.data.comparison);
      } else {
        setError("Comparison data could not be retrieved.");
      }
    } catch (err) {
      setError("Failed to generate comparison. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        minWidth: 300,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        mt: 6,
        pt: 6,
        maxWidth: 1000,
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        overflow: "hidden",
        border: ".5px solid",
        borderColor: theme.palette.primary.main,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Industry average vs. FormIT comparison
      </Typography>

      {/* Show button if comparison hasn't been generated */}
      {!comparisonData && !loading && (
        <Box textAlign="center" mt={3} mb={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGenerateComparison}
          >
            Generate Comparison
          </Button>
        </Box>
      )}

      {/* Show loading animation */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          mb={4}
        >
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

      {/* Render Comparison Table with Styled Columns */}
      {comparisonData && (
        <TableContainer
          component={Paper}
          sx={{
            mt: 4,
            maxWidth: 600,
            borderRadius: 0,
            overflow: "hidden",
          }}
        >
          <Table sx={{ borderCollapse: "separate" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                ></TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: theme.palette.chartLesser.default,
                    color: theme.palette.primary.contrastText,
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Industry Standard
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: theme.palette.chart.default,
                    color: theme.palette.secondary.contrastText,
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  FormIT AI-Powered
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Timeline (weeks)</TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: theme.palette.chartLesser.default }}
                >
                  {comparisonData.timelineIndustryTime}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: theme.palette.chart.default }}
                >
                  {comparisonData.timelineFormitTime}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Budget (cost in $)</TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: theme.palette.chartLesser.default }}
                >
                  {comparisonData.budgetIndustryCost}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: theme.palette.chart.default }}
                >
                  {comparisonData.budgetFormitCost}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default ComparisonViewer;
