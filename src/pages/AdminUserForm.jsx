import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import api from "../services/api";

const AdminUserForm = () => {
  const { clientId } = useParams(); // Extract clientId from the URL
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientForm = async () => {
      try {
        const response = await api.get(`/admin/user-form/${clientId}`);
        setClientData(response.data);
      } catch (err) {
        setError("Failed to fetch client form data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientForm();
  }, [clientId]);

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
        {clientData.full_name}'s Form
      </Typography>
      <Paper sx={{ p: 4 }}>
        {clientData.requests.length > 0 ? (
          clientData.requests.map((request) => (
            <Box key={request.id} sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {request.project_name}
              </Typography>
              <List>
                {request.answers.map((answer) => (
                  <ListItem key={answer.id}>
                    <ListItemText
                      primary={`Q: ${answer.question.question_text}`}
                      secondary={`A: ${answer.answer}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))
        ) : (
          <Typography>No form submissions found.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AdminUserForm;
