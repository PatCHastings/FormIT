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

const AdminUserView = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    // Navigate to the Q&A details view for the client
    navigate(`/admin/user-form/${clientId}`);
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
    </Container>
  );
};

export default AdminUserView;
