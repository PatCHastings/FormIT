import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const RequestsList = () => {
  const { auth } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
            <Paper key={request.id} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">{request.projectName}</Typography>
              <Typography>Status: {request.status}</Typography>
              {request.proposal ? (
                <Button
                  variant="contained"
                  onClick={() => navigate(`/proposal/${request.proposal.id}`)}
                >
                  View Proposal
                </Button>
              ) : (
                <Typography>No proposal available</Typography>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RequestsList;
