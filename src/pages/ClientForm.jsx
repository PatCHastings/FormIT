import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  ListItem,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const ClientForm = () => {
  const { auth } = useContext(AuthContext);

  const [steps, setSteps] = useState([]); // Wizard steps
  const [loading, setLoading] = useState(true); // Loading state
  const [fetchError, setFetchError] = useState(null); // Error state
  const [completedSteps, setCompletedSteps] = useState([]); // Track completed steps
  const [currentStep, setCurrentStep] = useState(0); // Current step in the form
  const [answers, setAnswers] = useState({}); // Store user answers
  const [requestId, setRequestId] = useState(null); // Dynamically assigned requestId

  const location = useLocation();

  // Parse serviceType from query string: e.g. /questionnaire?serviceType=website_development
  const serviceType =
    new URLSearchParams(location.search).get("serviceType") || "";

  // -------------------------
  // Fetch wizard steps based on serviceType
  // -------------------------
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await api.get(`/wizard?serviceType=${serviceType}`);
        setSteps(response.data);
      } catch (err) {
        setFetchError("Failed to fetch wizard steps. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, [serviceType]);

  // -------------------------
  // Submit answers and create request dynamically if needed
  // -------------------------
  const handleSubmit = async () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData) return;

    const stepAnswers = currentStepData.categories.flatMap((category) =>
      category.questions.map((question) => ({
        questionId: question.id,
        answerText: answers[question.id] || "",
      }))
    );

    const formattedAnswers = stepAnswers.reduce(
      (acc, { questionId, answerText }) => {
        if (answerText.trim()) {
          acc[questionId] = answerText;
        }
        return acc;
      },
      {}
    );

    try {
      const response = await api.post("/answers", {
        requestId, // Use existing requestId or let the backend create one
        answers: formattedAnswers,
        serviceType, // Pass serviceType for new requests
      });

      const newRequestId = response.data.requestId;
      if (!requestId) {
        setRequestId(newRequestId); // Update context with new requestId
      }

      const allAnswered = currentStepData.categories
        .flatMap((cat) => cat.questions.map((q) => q.id))
        .every((qid) => answers[qid]?.trim());

      if (allAnswered) {
        setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        console.log("All steps completed!");
      }
    } catch (error) {
      console.error("Error submitting section:", error);
    }
  };

  // -------------------------
  // Render roadmap
  // -------------------------
  const renderRoadmap = () => {
    return steps.map((step, index) => (
      <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {completedSteps.includes(index) ? (
          <CheckCircleIcon color="success" />
        ) : (
          <RadioButtonUncheckedIcon color="disabled" />
        )}
        <Box sx={{ marginLeft: 2, flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: index === currentStep ? "bold" : "normal",
              color: index === currentStep ? "primary" : "text.primary",
              cursor: "pointer",
            }}
            onClick={() => setCurrentStep(index)}
          >
            {step.title}
          </Typography>
        </Box>
      </Box>
    ));
  };

  // -------------------------
  // Render current step
  // -------------------------
  const renderCurrentStepContent = () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData) {
      return <Typography>No data available for this step.</Typography>;
    }

    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {currentStepData.title}
        </Typography>
        {currentStepData.categories.map((category, catIndex) => (
          <Box key={catIndex} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {category.title}
            </Typography>
            {category.questions.map((question) => (
              <ListItem key={question.id} sx={{ display: "block", mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  {question.questionText} {question.isRequired && "*"}
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your answer"
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: e.target.value,
                    }))
                  }
                />
              </ListItem>
            ))}
          </Box>
        ))}
      </Box>
    );
  };

  // -------------------------
  // Loading/Error states
  // -------------------------
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

  if (fetchError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{fetchError}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <Box sx={{ width: "200px", padding: "16px" }}>{renderRoadmap()}</Box>
      <Box sx={{ flex: 1, padding: "24px" }}>
        {renderCurrentStepContent()}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !steps[currentStep]?.categories
                .flatMap((cat) => cat.questions)
                .every(
                  (q) => !q.isRequired || answers[q.id]?.trim()?.length > 0
                )
            }
          >
            {currentStep === steps.length - 1 ? "Finish" : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientForm;
