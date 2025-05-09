import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  Paper,
  Tabs,
  Tab,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import FormITSvg from "../svg/formITsvg";
import CircuitAnimation from "../svg/circuitAnimation";

function Homepage() {
  const navigate = useNavigate();
  const theme = useTheme();
  // Fade-in animations
  const [animateTitle, setAnimateTitle] = useState(false);
  const [animateDescription, setAnimateDescription] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Intersection Observer hooks
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.5,
  });

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const thresholdValue = useMemo(() => (isMobile ? 0.5 : 0.8), [isMobile]);

  const { ref: problemRef, inView: problemInView } = useInView({
    threshold: thresholdValue, // Dynamically set based on screen width
  });

  const { ref: demoRef, inView: demoInView } = useInView({
    threshold: thresholdValue, // Dynamically set based on screen width
  });

  const painPoints = [
    {
      title: "Cost",
      problem: [
        "High costs are incurred from manual software development and repetitive IT workflows.",
        "Organizations overspend on staffing for routine tasks that could be automated.",
        "Maintaining outdated IT infrastructure drains budgets with little value return.",
      ],
      solution: [
        "AI-driven agentic workflows reduce development and operational costs by automating repetitive processes.",
        "Automate documentation, testing, and deployment tasks to minimize staffing overhead.",
        "Modernize legacy systems through low-cost AI integrations and scalable automation pipelines.",
      ],
    },
    {
      title: "Time",
      problem: [
        "Manual requirement gathering and review processes delay project kickoff.",
        "Traditional SDLC processes are too slow to meet modern business demands.",
        "Debugging and QA cycles consume valuable development hours.",
      ],
      solution: [
        "AI agents accelerate requirement analysis by extracting insights from documentation instantly.",
        "Automated pipelines streamline the full SDLC, reducing delivery time from months to weeks.",
        "Leverage AI-powered testing and monitoring tools to reduce QA bottlenecks.",
      ],
    },
    {
      title: "Flexibility",
      problem: [
        "Rigid legacy systems can't adapt to rapid business or technology changes.",
        "Integrating modern tools into siloed architectures is complex and time-consuming.",
        "Lack of modularity in existing solutions hinders experimentation and innovation.",
      ],
      solution: [
        "Agentic workflows allow dynamic adaptation to evolving IT and business needs.",
        "Seamlessly integrate AI tools and third-party APIs into your existing systems.",
        "Modular automation frameworks empower continuous innovation without full system overhauls.",
      ],
    },
  ];

  // State to track the selected tab and whether to show the solution
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setSelectedIndex(newIndex);
  };

  useEffect(() => {
    if (heroInView) {
      setTimeout(() => setAnimateTitle(true), 200); // Title fades in first
      setTimeout(() => setAnimateDescription(true), 600); // Description fades in second
      setTimeout(() => setAnimateButton(true), 800); // Button fades in last
    } else {
      // Reset animations when the Hero section goes out of view
      setAnimateTitle(false);
      setAnimateDescription(false);
      setAnimateButton(false);
    }
  }, [heroInView]);

  const handleClick = () => {
    if (!hasStarted) {
      setIsVisible(false); // Hide Typography
      setHasStarted(true); // Mark animation as started
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div ref={heroRef}>
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            minHeight: "90vh",
            py: isMobile ? 1 : 4, // Tighter padding on mobile
            transform: isMobile ? "scale(0.8)" : "scale(1)", // Reduce scale for mobile
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              mt: isMobile ? -10 : 0, // Moves everything higher
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 1 : 6, // Less padding on mobile

                textAlign: "center",
                backgroundColor: "transparent",
              }}
            >
              {/* Title */}
              <div>
                {/* SVG Section */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: isMobile ? "scale(1)" : "scale(1.5)", // Shrink SVG on mobile
                    marginLeft: "-80px", // Adjust positioning
                    cursor: "pointer",
                  }}
                >
                  <FormITSvg isAnimated={animateTitle} onClick={handleClick} />
                  <CircuitAnimation
                    triggerAnimation={!isVisible}
                    strokeColor="gold"
                  />
                </div>

                {/* Typography - fades in/out on click */}
                <Fade in={isVisible} timeout={500}>
                  <Typography
                    variant={isMobile ? "h4" : "h3"} // Smaller heading on mobile
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      position: "relative",
                      top: isMobile ? "-150px" : "-150px", // Adjust positioning dynamically
                      mb: 3,
                      backgroundColor: theme.windows.primary,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    Streamlined Software Builder.
                  </Typography>
                </Fade>
              </div>

              {/* Description */}
              <Fade in={animateDescription} timeout={800}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontSize: isMobile ? "1.2rem" : "1.2rem", // Reduce font size on mobile
                    position: "relative",
                    top: isMobile ? "-150px" : "0px",
                    mb: isMobile ? 2 : 4, // Reduce bottom spacing on mobile
                  }}
                >
                  Specialized in fast and inexpensive software solutions
                  leveraging the power of AI and agentic workflows. Fill out the
                  form specific to your project and FormIT will respond with a
                  proposal that could save you time, money, and tech debt.
                </Typography>
              </Fade>

              {/* Button */}
              <Fade in={animateButton} timeout={2000}>
                <Button
                  sx={{
                    borderRadius: "50px",
                    top: isMobile ? "-100px" : "0px",
                  }}
                  type="submit"
                  size={isMobile ? "medium" : "large"} // Smaller button on mobile
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
              </Fade>
            </Paper>
          </Container>
        </Box>
      </div>

      {/* Problem/Solution Section */}
      <div ref={problemRef}>
        <Fade in={problemInView} timeout={1000}>
          <Box
            sx={{
              minHeight: "80vh",
              py: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Animated banner */}
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                padding: "8px",
                fontSize: isMobile ? "1.4rem" : "1.9rem", // Smaller font on mobile
                mb: 4,
              }}
            >
              AI is reducing time and cost in software development...
            </Typography>

            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: "900px",
                p: 1,
                textAlign: "center",
                borderRadius: 2, // Optional: Add rounded corners
                backgroundColor: "transparent", // Make background transparent
              }}
            >
              {/* Pain Points Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {/* Tabs for Pain Points */}
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: "50px",
                    display: "inline-flex",
                    p: 0.5,
                  }}
                >
                  <Tabs
                    value={selectedIndex}
                    onChange={handleTabChange}
                    centered
                    textColor="inherit"
                    indicatorColor="none"
                    sx={{
                      "& .MuiTabs-flexContainer": {
                        gap: 1,
                      },
                      "& .MuiTab-root": {
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        transition: "all 0.3s ease",
                        border: `1px solid transparent`,
                        "&:hover": {
                          border: `1px solid`,
                          borderColor: theme.palette.primary.main,
                        },
                      },
                      "& .Mui-selected": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.default,
                        border: `1px solid`,
                      },
                    }}
                  >
                    {painPoints.map((point, index) => (
                      <Tab key={index} label={point.title} />
                    ))}
                  </Tabs>
                </Box>

                {/* Problem/Solution display */}
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "800px",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,

                      backgroundColor: "transparent",
                      textAlign: "center",
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: 4,
                    }}
                  >
                    <Grid container>
                      {/* Table Header */}
                      <Grid
                        item
                        xs={6}
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          py: 1,
                          borderBottom: `1px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        <Typography variant="h6">Problem</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          py: 1,
                          borderBottom: `1px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        <Typography variant="h6">Solution</Typography>
                      </Grid>

                      {/* Rows for Problem and Solution */}
                      {painPoints[selectedIndex].problem.map((problem, idx) => (
                        <React.Fragment key={idx}>
                          <Grid
                            item
                            xs={6}
                            sx={{
                              textAlign: "left",
                              py: 2,
                              pr: 2,
                              backgroundColor: theme.palette.background.default,
                              borderBottom:
                                idx !==
                                painPoints[selectedIndex].problem.length - 1
                                  ? `1px solid ${theme.palette.divider}` // Border between rows
                                  : "none",
                            }}
                          >
                            <Typography variant="body1">{problem}</Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            sx={{
                              textAlign: "left",
                              py: 2,
                              pl: 1,
                              backgroundColor: theme.palette.background.default,
                              borderBottom:
                                idx !==
                                painPoints[selectedIndex].problem.length - 1
                                  ? `1px solid ${theme.palette.divider}` // Border between rows
                                  : "none",
                            }}
                          >
                            <Typography variant="body1">
                              {painPoints[selectedIndex].solution[idx]}
                            </Typography>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                  </Paper>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </div>

      {/* Demo Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          py: 6,
          gap: 3, // Adds space between text content and button
        }}
      >
        <div ref={demoRef}>
          <Fade in={demoInView} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                See FormIT in action
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: "transparent",
                  textAlign: "center",
                  borderRadius: 2,
                  maxWidth: "800px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: "600px",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      How FormIT Works
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      FormIT is a specialized AI software builder that
                      streamlines the development process for small businesses.
                      Our platform utilizes the latest in AI to mitigate the
                      time and cost associated with traditional software
                      development.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Simply fill out the form specific to your project, and
                      FormIT will respond with a detailed proposal that outlines
                      the scope, timeline, and cost of your project. Our goal is
                      to save you time and money by providing affordable
                      software solutions that meet your unique needs.
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Fade>
        </div>

        {/* Button Fade-in */}
        <Fade in={demoInView} timeout={2000}>
          <Button
            sx={{
              borderRadius: "50px",
              px: 4, // Adds padding for better button sizing
              py: 1.5,
            }}
            type="submit"
            size={isMobile ? "medium" : "large"} // Smaller button on mobile
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </Fade>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          minHeight: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderTop: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
        }}
      >
        <Typography variant="body1" gutterBottom>
          © 2025 FormIT. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
}

export default Homepage;
