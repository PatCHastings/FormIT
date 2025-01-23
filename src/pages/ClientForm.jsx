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
  const requestId = auth?.requestId;

  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error] = useState(false);

  const location = useLocation();

  // Parse serviceType from query string: e.g. /questionnaire?serviceType=new_app
  const serviceType =
    new URLSearchParams(location.search).get("serviceType") || "";

  // -------------------------
  // Fetch wizard steps and answers
  // -------------------------
  useEffect(() => {
    if (!requestId) {
      setFetchError("No requestId available. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Use serviceType if present
        const wizardUrl = serviceType
          ? `/wizard?serviceType=${serviceType}`
          : "/wizard";

        const [wizardResponse, answersResponse] = await Promise.all([
          api.get(wizardUrl),
          api.get(`/answers?requestId=${requestId}`),
        ]);

        const fetchedSteps = wizardResponse.data;
        const completedAnswers = answersResponse.data.completedAnswers || [];

        // Map questionId -> answerText
        const answersMap = completedAnswers.reduce((acc, answer) => {
          acc[answer.questionId] = answer.answerText;
          return acc;
        }, {});

        // Normalize steps
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

        // Compute completed steps
        const computedStepsCompleted = normalizedSteps
          .map((step, stepIndex) => {
            const stepQuestionIds = step.categories.flatMap((cat) =>
              cat.questions.map((q) => q.id)
            );
            const allAnswered = stepQuestionIds.every((qid) =>
              Object.keys(answersMap).includes(qid.toString())
            );
            return allAnswered ? stepIndex : null;
          })
          .filter((index) => index !== null);

        setSteps(normalizedSteps);
        setAnswers(answersMap);
        setCompletedSteps(computedStepsCompleted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setFetchError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId, serviceType]);

  // -------------------------
  // Handle input changes
  // -------------------------
  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // -------------------------
  // Submit answers
  // -------------------------
  const handleSubmit = async () => {
    if (!requestId) {
      console.error("Cannot submit answers without a valid requestId.");
      return;
    }

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
      await api.post("/answers", {
        requestId,
        answers: formattedAnswers,
      });

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
                    handleInputChange(question.id, e.target.value)
                  }
                  error={error && question.isRequired && !answers[question.id]}
                  helperText={
                    error &&
                    question.isRequired &&
                    !answers[question.id]?.trim()
                      ? "This field is required."
                      : ""
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
