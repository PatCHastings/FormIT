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
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ProposalEditorAdmin from "./ProposalEditorAdmin";
import { useTheme } from "@mui/material/styles";

const AdminUserView = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedClientId, setExpandedClientId] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
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

  const handleViewForm = (clientId) => {
    navigate(`/admin/user-form/${clientId}`);
  };

  const handleOpenProposal = (requestId) => {
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
    <Container
      maxWidth="false" // Full width container
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        width: "100%",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Client Submissions
      </Typography>

      {/* Make Table Responsive */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto", // Enables scrolling on small screens
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <strong>Full Name</strong>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <strong>Email</strong>
              </TableCell>
              <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
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
                      sx={{
                        minWidth: "80px",
                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                        p: { xs: 0.5, sm: 1 }, // Adjust padding for mobile
                      }}
                      onClick={() => toggleExpand(client.id)}
                      startIcon={
                        expandedClientId === client.id ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )
                      }
                    >
                      {expandedClientId === client.id ? "Hide" : "View"}
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
                        sx={{
                          p: 1,
                          backgroundColor: theme.palette.background.default,
                          overflowX: "auto",
                        }}
                      >
                        {client.requests.length > 0 ? (
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                  <strong>Project Name</strong>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                  <strong>Qs</strong>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                  <strong>Proposal</strong>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                  <strong>Form</strong>
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
                                        sx={{
                                          minWidth: "50px",
                                          padding: { xs: 0.5, sm: 0.5 },
                                          fontSize: {
                                            xs: "0.7rem",
                                            sm: "0.8rem",
                                            md: "0.9rem",
                                          },
                                        }}
                                        onClick={() =>
                                          handleOpenProposal(request.id)
                                        }
                                      >
                                        View
                                      </Button>
                                    ) : (
                                      "No Proposal"
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      sx={{
                                        minWidth: "50px",
                                        padding: { xs: 0.5, sm: 0.5 },
                                        fontSize: {
                                          xs: "0.7rem",
                                          sm: "0.8rem",
                                          md: "0.9rem",
                                        },
                                      }}
                                      onClick={() => handleViewForm(client.id)}
                                    >
                                      View
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

      {/* Show ProposalEditorAdmin if a request is selected */}
      {selectedRequestId && (
        <Box sx={{ mt: 4 }}>
          <ProposalEditorAdmin requestId={selectedRequestId} />
        </Box>
      )}
    </Container>
  );
};

export default AdminUserView;
