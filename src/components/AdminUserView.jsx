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
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import api from "../services/api"; // Replace with your API helper file
import { useNavigate } from "react-router-dom";
import ProposalEditorAdmin from "./ProposalEditorAdmin"; // We'll nest this, or navigate to a new route
import { useTheme } from "@mui/material/styles";

const AdminUserView = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedClientId, setExpandedClientId] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

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

  const toggleExpand = (clientId) => {
    setExpandedClientId((prev) => (prev === clientId ? null : clientId));
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
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <React.Fragment key={client.id}>
                {/* Main Row */}
                <TableRow>
                  <TableCell>{client.full_name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => toggleExpand(client.id)}
                      startIcon={
                        expandedClientId === client.id ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )
                      }
                    >
                      {expandedClientId === client.id
                        ? "Hide Details"
                        : "View Details"}
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Expanded Row */}
                <TableRow>
                  <TableCell colSpan={3} sx={{ p: 0 }}>
                    <Collapse
                      in={expandedClientId === client.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        sx={{ p: 2, backgroundColor: theme.palette.background }}
                      >
                        {client.requests.length > 0 ? (
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <strong>Project Name</strong>
                                </TableCell>
                                <TableCell>
                                  <strong>Questions Submitted</strong>
                                </TableCell>
                                <TableCell>
                                  <strong>Proposal</strong>
                                </TableCell>
                                <TableCell>
                                  <strong>Actions</strong>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {client.requests.map((request) => (
                                <TableRow key={request.id}>
                                  <TableCell>{request.project_name}</TableCell>
                                  <TableCell>
                                    {`${
                                      request.answers.filter((a) => a.answer)
                                        .length
                                    } / ${request.answers.length}`}
                                  </TableCell>
                                  <TableCell>
                                    {request.proposal ? (
                                      <Button
                                        onClick={() =>
                                          handleOpenProposal(request.id)
                                        }
                                      >
                                        View Proposal
                                      </Button>
                                    ) : (
                                      "No Proposal"
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => handleViewForm(client.id)}
                                    >
                                      View Form
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <Typography color="textSecondary">
                            No submissions available
                          </Typography>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
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
