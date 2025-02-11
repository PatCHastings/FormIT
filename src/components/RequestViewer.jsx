import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Button,
  useMediaQuery,
} from "@mui/material";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";

const RequestsList = () => {
  const { auth } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get(`/client/${auth.userId}/requests`);
        setRequests(response.data.requests);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    if (auth.userId) {
      fetchRequests();
    }
  }, [auth.userId]);

  return (
    <Box>
      <Typography variant="h4">Your Requests</Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && requests.length === 0 && (
        <Typography>No requests found.</Typography>
      )}
      {!loading && !error && (
        <Box>
          {requests.map((request) => (
            <Paper
              key={request.id}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                flexDirection: isMobile ? "column" : "row", // Responsive layout
                alignItems: isMobile ? "flex-start" : "center",
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ flex: isMobile ? "none" : 1 }}>
                {request.projectName}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  flex: isMobile ? "none" : 1,
                }}
              >
                Status: {request.status}
              </Typography>
              {request.proposal ? (
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/proposal/${request.proposal.id}`)}
                >
                  View Proposal
                </Button>
              ) : (
                <Typography
                  sx={{
                    color: theme.palette.error.main,
                    flex: isMobile ? "none" : 1,
                  }}
                >
                  Proposal not yet generated.
                </Typography>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RequestsList;
