import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create a context
export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark"); // Default to dark mode

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Memoize the theme for performance
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: mode === "light" ? "#804cc4" : "#34e6dd", 
          },
          secondary: {
            main: mode === "light" ? "#caffe3" : "#242322", 
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212", 
          },
          chart: {
            default: mode === "light" ? "#aa63fa" : "#1ba386", 
          },
          chartLesser: {
            default: mode === "light" ? "#79618d" : "#5f9175", 
          },
        },
        gradients: {
          secondary: mode === "light"
            ? "linear-gradient(45deg, ##eea215 90%, #34e6dd 90%)"
            : "linear-gradient(-45deg, #242322 30%, #3a3a3a 90%)",
        }, 
        gradient: {
          primary: mode === "light"
            ? "linear-gradient(45deg, #5d5afc46 30%, #00d9ff36 90%)"
            : "#24232200",
        },
        windows: {
          primary: mode === "light"
            ? "#ffffff00" // 0% transparency
            : "#00000000", // 0% transparency
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {

                borderRadius: "50px", // Optional: rounded corners for buttons
                textTransform: "none", // Optional: remove uppercase text
                padding: "8px 16px", // Optional: consistent padding
                "&:hover": {
                  backgroundColor: mode === "light" ? "#804cc4" : "#34e6dd",
                  color: mode === "light" ? "#f5f5f5" : "#121212",
          },
              },
            },
            defaultProps: {
              variant: "outlined", // Default button variant
              color: "primary", // Default button color
            },
          },
        },
        typography: {
          button: {
            fontWeight: 300, // Optional: make buttons' text bold
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensure global styles (background, text color, etc.) update */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;