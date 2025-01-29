import React, { useState, useEffect } from "react";
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
  const { ref: problemRef, inView: problemInView } = useInView({
    threshold: 0.8,
  });

  const painPoints = [
    {
      title: "Cost",
      problem: [
        "Small businesses spend an average of $35,000 for basic applications.",
        "Website development costs can exceed $5,000.",
        "Maintenance and upgrades to legacy software are expensive, averaging $15,000 annually.",
      ],
      solution: [
        "We offer custom applications starting at just $5,000, tailored to your specific needs.",
        "Affordable website development packages starting as low as $1,000.",
        "Cost-effective maintenance plans with free updates for the first year.",
      ],
    },
    {
      title: "Time",
      problem: [
        "Traditional software development takes 6-12 months to deliver.",
        "Delays in project timelines result in lost revenue opportunities.",
        "Legacy systems often require extensive debugging, wasting valuable time.",
      ],
      solution: [
        "We use agile development cycles to deliver products in as little as 4 weeks.",
        "Streamlined processes minimize delays and ensure projects stay on schedule.",
        "Our modern solutions reduce debugging time with optimized frameworks.",
      ],
    },
    {
      title: "Flexibility",
      problem: [
        "Legacy systems struggle to scale as your business grows.",
        "Integrating modern APIs into outdated platforms is often impossible.",
        "Customizations are limited, restricting your ability to innovate.",
      ],
      solution: [
        "Our solutions are built to scale seamlessly as your business grows.",
        "Easily integrate with modern APIs, enabling powerful new functionalities.",
        "Fully customizable platforms designed to adapt to your evolving needs.",
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
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
          }}
        >
          <Container maxWidth="md">
            <Paper
              elevation={0}
              sx={{
                p: 6,
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
                    transform: "scale(1.5)",
                    marginLeft: "-80px",
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
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      position: "relative",
                      top: "-150px",
                      mb: 3,
                      backgroundColor: theme.windows.primary,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    Your Custom Software Builder.
                  </Typography>
                </Fade>
              </div>

              {/* Description */}
              <Fade in={animateDescription} timeout={800}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontSize: "1.2rem", // Slightly larger text for readability
                    position: "relative",
                    top: "-25px",
                    mb: 4, // Add space below the body text
                  }}
                >
                  Specialized in fast and inexpensive software solutions;
                  tailored to your business needs. Fill out the form specific to
                  your project and FormIT will respond with a proposal that will
                  save you time and money.
                </Typography>
              </Fade>

              {/* Button */}
              <Fade in={animateButton} timeout={800}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.default,
                    },
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    navigate("/register");
                  }}
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
                p: 4,
                textAlign: "center",
                borderRadius: 4, // Optional: Add rounded corners
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
                        gap: 0.5,
                      },
                      "& .MuiTab-root": {
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        padding: "8px 16px",

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
                      p: 4,
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
    </div>
  );
}

export default Homepage;
