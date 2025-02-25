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
  useMediaQuery,
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

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      maxWidth={false}
      sx={{
        px: isMobile ? 1 : 4, // Less padding on mobile
        width: isMobile ? "100%" : "900px", // Full width on mobile, fixed width on desktop
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: isMobile ? 2 : 3,
          textAlign: "center",
          fontSize: isMobile ? "1.5rem" : "2rem",
        }}
      >
        Client Submissions
      </Typography>

      {/* Responsive Table */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto", // Enables scrolling on small screens
        }}
      >
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
              >
                <strong>Full Name</strong>
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
              >
                <strong>Email</strong>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
              >
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <React.Fragment key={client.id}>
                {/* Main Row */}
                <TableRow>
                  <TableCell sx={{ fontSize: isMobile ? "0.7rem" : "0.9rem" }}>
                    {client.full_name}
                  </TableCell>
                  <TableCell sx={{ fontSize: isMobile ? "0.7rem" : "0.9rem" }}>
                    {client.email}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{
                        minWidth: "80px",
                        fontSize: isMobile ? "0.7rem" : "0.9rem",
                        p: isMobile ? 0.3 : 0.8,
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
                          p: isMobile ? 1 : 2,
                          backgroundColor: theme.palette.background.default,
                          overflowX: "auto",
                        }}
                      >
                        {client.requests.length > 0 ? (
                          <Table size={isMobile ? "small" : "medium"}>
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  sx={{
                                    fontSize: isMobile ? "0.7rem" : "0.9rem",
                                  }}
                                >
                                  <strong>Project</strong>
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: isMobile ? "0.7rem" : "0.9rem",
                                  }}
                                >
                                  <strong>Qs</strong>
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: isMobile ? "0.7rem" : "0.9rem",
                                  }}
                                >
                                  <strong>Proposal</strong>
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: isMobile ? "0.7rem" : "0.9rem",
                                  }}
                                >
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
                                          minWidth: isMobile ? "50px" : "80px",
                                          fontSize: isMobile
                                            ? "0.7rem"
                                            : "0.9rem",
                                          p: isMobile ? 0.3 : 0.8,
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
                                        minWidth: isMobile ? "50px" : "80px",
                                        fontSize: isMobile
                                          ? "0.7rem"
                                          : "0.9rem",
                                        p: isMobile ? 0.3 : 0.8,
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
                          <Typography
                            color="textSecondary"
                            fontSize={isMobile ? "0.8rem" : "1rem"}
                          >
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

      {selectedRequestId && (
        <Box sx={{ mt: 4 }}>
          <ProposalEditorAdmin requestId={selectedRequestId} />
        </Box>
      )}
    </Container>
  );
};

export default AdminUserView;
