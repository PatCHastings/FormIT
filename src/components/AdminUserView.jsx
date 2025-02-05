import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import api from "../services/api"; // Replace with your API helper file
import { useNavigate } from "react-router-dom";
import ProposalEditorAdmin from "./ProposalEditorAdmin"; // We'll nest this, or navigate to a new route

const AdminUserView = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // If you want to display ProposalEditorAdmin in-line after selecting a request:
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // GET /admin/users-with-answers should include each client, their requests,
        // and optionally "request.proposal" if you add an "include: [Proposal]" in your backend
        const response = await api.get("/admin/users-with-answers");
        setClients(response.data);
      } catch (err) {
        setError("Failed to fetch client data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Existing function: handle viewing the Q&A form for a particular client
  const handleViewForm = (clientId) => {
    // Navigate to the Q&A details view for the client
    navigate(`/admin/user-form/${clientId}`);
  };

  const handleOpenProposal = (requestId) => {
    // Navigate to a new route to view the proposal editor
    navigate(`/proposals/${requestId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Client Submissions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Full Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Project Name</strong>
              </TableCell>
              <TableCell>
                <strong>Questions Submitted</strong>
              </TableCell>
              {/* New Column: "Proposal" */}
              <TableCell>
                <strong>Proposal</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.id}
                sx={{
                  backgroundColor: client.requests.length
                    ? "inherit"
                    : "#f0f0f0",
                  color: client.requests.length ? "inherit" : "#888",
                }}
              >
                {/* Full Name */}
                <TableCell>{client.full_name}</TableCell>

                {/* Email */}
                <TableCell>{client.email}</TableCell>

                {/* Service Type (Project Name) */}
                <TableCell>
                  {client.requests.length > 0 ? (
                    client.requests.map((request) => (
                      <Typography key={request.id}>
                        {request.project_name}
                      </Typography>
                    ))
                  ) : (
                    <Typography color="textSecondary">
                      No submissions
                    </Typography>
                  )}
                </TableCell>

                {/* Questions Submitted */}
                <TableCell>
                  {client.requests.length > 0
                    ? client.requests.map((request) => {
                        const totalQuestions = request.answers.length;
                        const submittedAnswers = request.answers.filter(
                          (answer) => answer.answer
                        ).length;
                        return (
                          <Typography key={request.id}>
                            {submittedAnswers}/{totalQuestions}
                          </Typography>
                        );
                      })
                    : "N/A"}
                </TableCell>

                {/* NEW: Proposal Column */}
                <TableCell>
                  {client.requests.length > 0 ? (
                    client.requests.map((request) => {
                      // If your backend includes "request.proposal" to indicate if a proposal exists
                      if (request.proposal) {
                        return (
                          <Box key={request.id} sx={{ mb: 1 }}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleOpenProposal(request.id)}
                              // or handleInlineProposal(request.id) if you prefer in-page
                            >
                              Open Proposal
                            </Button>
                          </Box>
                        );
                      } else {
                        return (
                          <Typography key={request.id} sx={{ mb: 1 }}>
                            No Proposal
                          </Typography>
                        );
                      }
                    })
                  ) : (
                    <Typography color="textSecondary">N/A</Typography>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  {client.requests.length > 0 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewForm(client.id)}
                    >
                      View Form
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* If you want to show <ProposalEditorAdmin> in the same page after selecting requestId */}
      {selectedRequestId && (
        <Box sx={{ mt: 4 }}>
          <ProposalEditorAdmin requestId={selectedRequestId} />
        </Box>
      )}
    </Container>
  );
};

export default AdminUserView;
