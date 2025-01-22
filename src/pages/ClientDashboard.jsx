import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  ListItem,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const ClientDashboard = () => {
  // ---- Get the auth context, including requestId
  const { auth } = useContext(AuthContext);
  /**
   *  If you stored requestId as a string, here it is a string.
   *  If you parsed it in AuthContext, it's an integer.
   */
  const requestId = auth?.requestId;

  // ---- State for steps data and fetch statuses ----
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // ---- State for user input ----
  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(false);

  // ---- Fetch wizard steps and completed steps once on mount ----
  useEffect(() => {
    // If there's no requestId, show error
    if (!requestId) {
      setFetchError("No requestId available. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Use requestId in the query param
        const [wizardResponse, answersResponse] = await Promise.all([
          api.get("/wizard"),
          api.get(`/answers?requestId=${requestId}`),
        ]);

        const fetchedSteps = wizardResponse.data;
        const { completedSteps } = answersResponse.data;

        // Normalize the steps
        const normalizedSteps = fetchedSteps.map((step) => ({
          id: step.id,
          title: step.title,
          categories: step.categories.map((category) => ({
            id: category.id,
            title: category.title,
            questions: category.questions.map((question) => ({
              id: question.id,
              questionText: question.questionText,
              questionType: question.questionType,
              isRequired: question.isRequired,
              helpText: question.helpText,
            })),
          })),
        }));

        setSteps(normalizedSteps);
        setCompletedSteps(
          normalizedSteps
            .map((step, index) =>
              completedSteps.includes(step.id) ? index : null
            )
            .filter((index) => index !== null)
        );
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setFetchError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId]);

  // ---- Handle input changes ----
  const handleInputChange = (answerIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        [answerIndex]: value,
      },
    }));
  };

  // ---- Handle form submission ----
  const handleSubmit = async () => {
    if (!requestId) {
      console.error("Cannot submit answers without a valid requestId.");
      return;
    }

    const stepAnswers = answers[currentStep] || {};
    const formattedAnswers = {};

    steps[currentStep]?.categories.forEach((category, catIndex) => {
      category.questions.forEach((question, qIndex) => {
        const answerIndex = `${catIndex}-${qIndex}`;
        if (stepAnswers[answerIndex]) {
          formattedAnswers[question.id] = stepAnswers[answerIndex];
        }
      });
    });

    try {
      await api.post("/answers", {
        requestId,
        answers: formattedAnswers,
      });

      // Mark the current step as completed
      setCompletedSteps((prev) => [...prev, currentStep]);

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        console.log("All steps completed!");
      }
    } catch (error) {
      console.error("Error submitting section:", error);
    }
  };

  // ---- Render the left-hand Roadmap ----
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
              cursor: "pointer",
            }}
            onClick={() => setCurrentStep(index)}
          >
            {step.title}
          </Typography>
        </Box>
        {index < steps.length - 1 && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              marginLeft: "16px",
              borderLeft: "2px solid",
              borderColor: completedSteps.includes(index)
                ? "success.main"
                : "grey.400",
              height: "50px",
            }}
          />
        )}
      </Box>
    ));
  };

  // ---- Render the questions for the current step ----
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
            {category.questions.map((question, qIndex) => {
              const answerIndex = `${catIndex}-${qIndex}`;
              return (
                <ListItem key={qIndex} sx={{ display: "block", mb: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    {question.questionText}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your answer"
                    value={answers[currentStep]?.[answerIndex] || ""}
                    onChange={(e) =>
                      handleInputChange(answerIndex, e.target.value)
                    }
                    error={
                      error &&
                      (!answers[currentStep]?.[answerIndex] ||
                        answers[currentStep]?.[answerIndex].trim() === "")
                    }
                    helperText={
                      error &&
                      (!answers[currentStep]?.[answerIndex] ||
                        answers[currentStep]?.[answerIndex].trim() === "")
                        ? "This field is required."
                        : ""
                    }
                  />
                </ListItem>
              );
            })}
          </Box>
        ))}
      </Box>
    );
  };

  // ---- Loading/Error Handling ----
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

  if (!steps.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>No step data available.</Typography>
      </Box>
    );
  }

  // ---- Main Layout ----
  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <Box
        sx={{
          width: "200px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Project Roadmap
        </Typography>
        {renderRoadmap()}
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>{renderCurrentStepContent()}</Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            disabled={completedSteps.includes(currentStep)}
          >
            {currentStep === steps.length - 1 ? "Finish" : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientDashboard;
