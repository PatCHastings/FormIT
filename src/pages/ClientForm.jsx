import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  ListItem,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import api from "../services/api";
import { useTheme } from "@mui/material/styles";

const ClientForm = () => {
  // Wizard steps, loading, error
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  // For final "Finish" confirmation dialog
  const [showFinishModal, setShowFinishModal] = useState(false);

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

  // If we already have a requestId, fetch existing answers
  useEffect(() => {
    if (!requestId) {
      console.log("No requestId => skip GET /answers");
      return;
    }
    console.log("Fetching answers for requestId:", requestId);

    const fetchAnswers = async () => {
      try {
        const response = await api.get(`/answers?requestId=${requestId}`);
        const fetchedAnswers = {};
        response.data.completedAnswers.forEach(({ questionId, answerText }) => {
          fetchedAnswers[questionId] = answerText;
        });
        setAnswers(fetchedAnswers);

        // Pre-mark completed steps
        const completed = steps
          .map((step, index) => {
            const allAnswered = step.categories
              .flatMap((cat) => cat.questions.map((q) => q.id))
              .every((qid) => fetchedAnswers[qid]?.trim());
            return allAnswered ? index : null;
          })
          .filter((index) => index !== null);

        setCompletedSteps(completed);
      } catch (error) {
        console.error("Error fetching completed answers:", error);
      }
    };

    fetchAnswers();
  }, [requestId, steps]);

  // Submit answers for the current step
  const handleSubmit = async () => {
    const currentStepData = steps[currentStep];
    if (!currentStepData) return;

    const stepAnswers = currentStepData.categories.flatMap((cat) =>
      cat.questions.map((q) => ({
        questionId: q.id,
        answerText: answers[q.id] || "",
      }))
    );

    const formattedAnswers = {};
    stepAnswers.forEach(({ questionId, answerText }) => {
      if (answerText.trim()) {
        formattedAnswers[questionId] = answerText;
      }
    });
    const hasAtLeastOneAnswer = Object.keys(formattedAnswers).length > 0;
    if (!hasAtLeastOneAnswer) {
      console.log("No answers => not creating request yet.");
      return;
    }

    try {
      const response = await api.post("/answers", {
        requestId,
        answers: formattedAnswers,
        serviceType,
      });
      const newRequestId = response.data.requestId;

      if (!requestId || requestId !== newRequestId) {
        setRequestId(newRequestId);
        localStorage.setItem(localStorageKey, newRequestId);
      }

      // Mark step as completed if all questions in this step are answered
      const allAnswered = currentStepData.categories
        .flatMap((cat) => cat.questions.map((q) => q.id))
        .every((qid) => answers[qid]?.trim());
      if (allAnswered) {
        setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // We are on the LAST step => check if ALL steps are answered
        console.log("All steps completed! Checking final conditions...");
        handleFinishCheck();
      }
    } catch (err) {
      console.error("Error submitting section:", err);
    }
  };

  // After finishing the last step, check if ALL questions are answered
  const handleFinishCheck = () => {
    console.log("handleFinishCheck -> checking if all answered...");
    const totalQuestions = steps
      .flatMap((step) => step.categories)
      .flatMap((cat) => cat.questions).length;

    // Count how many answers we have that are non-empty
    const submittedAnswersCount = Object.values(answers).filter(
      (ans) => ans && ans.trim()
    ).length;

    const allAnswered = submittedAnswersCount === totalQuestions;
    if (!allAnswered) {
      alert("You have not answered all required questions yet.");
      return;
    }
    // If all answered, show confirmation dialog
    setShowFinishModal(true);
  };

  // User confirms "Finish" => call /proposals/generate
  const confirmFinish = async () => {
    console.log("confirmFinish -> About to POST /generate", requestId);
    setShowFinishModal(false);

    if (!requestId) {
      alert("No requestId found, cannot generate proposal.");
      return;
    }

    try {
      const res = await api.post("/generate", { requestId });

      if (res.data && res.data.proposal) {
        // Navigate user to ProposalViewer after successful generation
        navigate(`/proposal/${requestId}`);
      } else {
        alert("Proposal generation failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status === 429) {
        alert(`Rate limit: ${err.response.data.error}`);
      } else {
        alert(`Error generating proposal: ${err.message}`);
      }
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

  const renderCurrentStepContent = () => {
    const stepData = steps[currentStep];
    if (!stepData) {
      return <Typography>No data available for this step.</Typography>;
    }

    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
      }}
    >
      {isMobile ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            mx: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Step Progress Bar Container */}
          <Box sx={{ position: "relative", width: "100%", mt: 5 }}>
            {/* Background Progress Line */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: "100%",
                height: "4px",
                background: theme.palette.offBackground.default,
                transform: "translateY(-50%)",
                zIndex: 0,
              }}
            />
            {/* Progress Line (Completed Steps) */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: `${(100 / (steps.length - 1)) * currentStep}%`,
                height: "4px",
                background: theme.palette.primary.main,
                transform: "translateY(-50%)",
                zIndex: 1,
                transition: "width 0.4s ease",
              }}
            />

            {/* Step Indicators (Clickable) */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 2,
              }}
            >
              {steps.map((step, index) => (
                <Box
                  key={index}
                  sx={{
                    textAlign: "center",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  {/* Step Circle */}
                  <Box
                    onClick={() => setCurrentStep(index)} // Click to navigate to step
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: theme.palette.background.default,
                      border: `3px solid ${
                        currentStep === index // If the step is active, apply the hover effect permanently
                          ? theme.palette.primary.light
                          : completedSteps.includes(index)
                          ? theme.palette.primary.main
                          : theme.palette.offBackground.default
                      }`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      transition: "0.4s ease",
                      transform:
                        currentStep === index ? "scale(1.1)" : "scale(1)", // Keep scaled if active
                      "&:hover": {
                        border: `3px solid ${theme.palette.primary.light}`,
                        transform: "scale(1.1)", // Slight enlarge on hover
                      },
                    }}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckCircleIcon
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: "26px",
                        }}
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "19px",
                          color: theme.palette.grey[500],
                        }}
                      >
                        {index + 1}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: "200px",
            padding: "16px",
            borderRight: `1px solid ${theme.palette.divider}`,
            display: "flex",
            flexDirection: "row", // Separate progress bar and text
            alignItems: "flex-start",
            gap: 2, // Adds space between progress bar and text
          }}
        >
          {/* Progress Bar Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {steps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Vertical Connecting Line (Separate from Text) */}
                {index > 0 && (
                  <Box
                    sx={{
                      width: "4px",
                      height: "35px",
                      background:
                        currentStep >= index
                          ? theme.palette.primary.main
                          : theme.palette.offBackground.default,
                      position: "relative",
                      zIndex: -1,
                    }}
                  />
                )}

                {/* Step Circle */}
                <Box
                  onClick={() => setCurrentStep(index)}
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: theme.palette.background.default,
                    border: `3px solid ${
                      currentStep === index
                        ? theme.palette.primary.dark
                        : completedSteps.includes(index)
                        ? theme.palette.primary.main
                        : theme.palette.offBackground.default
                    }`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "0.4s ease",
                    transform:
                      currentStep === index ? "scale(1.1)" : "scale(1)",
                    "&:hover": {
                      border: `3px solid ${theme.palette.primary.light}`,
                      transform: "scale(1.1)", // Slight enlarge on hover
                    },
                  }}
                >
                  {completedSteps.includes(index) ? (
                    <CheckCircleIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "26px",
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{ fontSize: "19px", color: theme.palette.grey[500] }}
                    >
                      {index + 1}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Step Titles Container (Separate from Progress Bar) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {steps.map((step, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  fontWeight: currentStep === index ? "bold" : "normal",
                  color:
                    currentStep === index
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  cursor: "pointer",
                  textAlign: "left",
                  mt: "10px",
                }}
                onClick={() => setCurrentStep(index)}
              >
                {step.title}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      {/* Right side: form content */}
      <Box sx={{ flex: 1, padding: "24px" }}>
        {renderCurrentStepContent()}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
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

      {/* Confirmation Dialog for "Finish" */}
      <Dialog
        open={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        variant="persistent"
        sx={{
          "& .MuiDialog-paper": {
            padding: "24px",
            borderRadius: "12px",
            backgroundColor: theme.windows.primary,
            backdropFilter: "blur(10px)",
            border: "1px solid", // Optional border
            borderColor: theme.palette.primary.main,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle>Generate Proposal?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Clicking "Confirm" will submit your answers to our AI and generate a
            preliminary proposal for your review. This is rate-limited to once
            every 15 minutes, so review your answers to ensure they accurately
            describe your project goals. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFinishModal(false)}>Cancel</Button>
          <Button onClick={confirmFinish} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientForm;
