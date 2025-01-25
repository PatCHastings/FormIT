import React, { useEffect, useState } from "react";
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
import api from "../services/api";

const ClientForm = () => {
  // Wizard steps, loading, error
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Tracking step progress
  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // The user's answers (keyed by questionId)
  const [answers, setAnswers] = useState({});

  // Parse serviceType from query param: /questionnaire?serviceType=someType
  const location = useLocation();
  const serviceType =
    new URLSearchParams(location.search).get("serviceType") || "";

  // Unique localStorage key for this serviceType
  const localStorageKey = `requestId_${serviceType}`;

  // Initialize requestId from localStorage (if we already created one before)
  const [requestId, setRequestId] = useState(() => {
    const storedId = localStorage.getItem(localStorageKey);
    return storedId ? Number(storedId) : null;
  });

  // 1) Fetch the wizard steps for this serviceType
  useEffect(() => {
    if (!serviceType) {
      setFetchError("No serviceType specified.");
      setLoading(false);
      return;
    }

    const fetchSteps = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/wizard?serviceType=${serviceType}`);
        setSteps(response.data);
      } catch (err) {
        console.error("Failed to fetch wizard steps:", err);
        setFetchError("Failed to fetch wizard steps: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, [serviceType]);

  // 2) If we already have a requestId (meaning we've created or reused a request in the past),
  //    fetch existing answers so the fields are pre-populated.
  useEffect(() => {
    if (!requestId) {
      console.log("No requestId in localStorage => skip GET /answers");
      return;
    }

    console.log("Fetching answers for existing requestId:", requestId);
    const fetchAnswers = async () => {
      try {
        const response = await api.get(`/answers?requestId=${requestId}`);
        const fetchedAnswers = {};
        response.data.completedAnswers.forEach(({ questionId, answerText }) => {
          fetchedAnswers[questionId] = answerText;
        });
        setAnswers(fetchedAnswers);
      } catch (error) {
        console.error("Error fetching completed answers:", error);
      }
    };

    fetchAnswers();
  }, [requestId]);

  // 3) Handle Submit
  //    - Only create a request if there is at least one non-empty answer
  //    - If requestId is null, the backend will "findOrCreate" a Request.
  const handleSubmit = async () => {
    // Grab the current step definition
    const currentStepData = steps[currentStep];
    if (!currentStepData) return;

    // Collect the step's answers
    const stepAnswers = currentStepData.categories.flatMap((category) =>
      category.questions.map((q) => ({
        questionId: q.id,
        answerText: answers[q.id] || "",
      }))
    );

    // Only keep non-empty answers
    const formattedAnswers = {};
    stepAnswers.forEach(({ questionId, answerText }) => {
      if (answerText.trim()) {
        formattedAnswers[questionId] = answerText;
      }
    });

    // Check if there's at least one non-empty answer
    const hasAtLeastOneAnswer = Object.keys(formattedAnswers).length > 0;
    if (!hasAtLeastOneAnswer) {
      // If user didn't fill out anything, do NOT create a request
      console.log("No answers provided => not creating request yet.");
      return;
    }

    try {
      // POST to /answers
      // If requestId is null, the backend route "finds or creates" a new request record
      const response = await api.post("/answers", {
        requestId,
        answers: formattedAnswers,
        serviceType,
      });

      // The backend always returns the requestId (either reused or newly created)
      const newRequestId = response.data.requestId;
      console.log("POST /answers => returns requestId:", newRequestId);

      // If we didn't have one before, or if it changed, store in localStorage
      if (!requestId || requestId !== newRequestId) {
        setRequestId(newRequestId);
        localStorage.setItem(localStorageKey, newRequestId);
      }

      // Mark this step as completed if all questions in this step are answered
      const allAnswered = currentStepData.categories
        .flatMap((cat) => cat.questions.map((q) => q.id))
        .every((qid) => answers[qid]?.trim());
      if (allAnswered) {
        setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      }

      // Move to the next step (or finish if last)
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        console.log("All steps completed!");
      }
    } catch (err) {
      console.error("Error submitting section:", err);
    }
  };

  // Roadmap UI
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

  // Current step questions
  const renderCurrentStepContent = () => {
    const stepData = steps[currentStep];
    if (!stepData) {
      return <Typography>No data available for this step.</Typography>;
    }

    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {stepData.title}
        </Typography>
        {stepData.categories.map((category, catIndex) => (
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

  // Loading / error states
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
      <Box sx={{ p: 4 }}>
        <Typography color="error">{fetchError}</Typography>
      </Box>
    );
  }

  // Main render
  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Left side: roadmap */}
      <Box sx={{ width: "200px", padding: "16px" }}>{renderRoadmap()}</Box>

      {/* Right side: form content */}
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
