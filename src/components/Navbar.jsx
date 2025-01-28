import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/themeContext";
import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  Button,
} from "@mui/material";
import ChangePassword from "../pages/ChangePassword";

const Navbar = ({ onLoginToggle }) => {
  const { auth, logout } = useContext(AuthContext);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // State for hiding Navbar and hover effect
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // ADDED: State to control ChangePassword modal visibility
  const [openChangePassword, setOpenChangePassword] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide Navbar when scrolling down and not hovered
      if (!isHovered) {
        setIsHidden(currentScrollY > lastScrollY && currentScrollY > 50);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHovered]);

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const hoverColor = theme.palette.primary.main;

  return (
    <>
      {/* Wrapper to detect hover over hidden Navbar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: isHidden ? "55px" : "0",
          zIndex: 999,
          backgroundColor: "transparent",
        }}
        onMouseEnter={() => setIsHovered(true)} // Show Navbar on hover
        onMouseLeave={() => setIsHovered(false)} // Reapply hidden logic on leave
      />

      <nav
        className="navbar"
        style={{
          position: "fixed",
          top: isHidden && !isHovered ? "-55px" : "0", // Hide Navbar when scrolling
          left: 0,
          width: "100%",
          height: "55px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isHovered
            ? "rgba(255, 255, 255, 0)" // Add blur effect on hover
            : "rgba(255, 255, 255, 0)", // Semi-transparent when visible
          backdropFilter: "blur(6px)", // Blur effect
          color: theme.palette.text.primary,
          borderBottom: isHovered ? `.5px solid` : "none",
          transition: "top 0.3s, background-color 0.3s, border-bottom 0.3s", // Smooth transitions
        }}
        onMouseEnter={() => setIsHovered(true)} // Prevent hiding when hovering over Navbar
        onMouseLeave={() => setIsHovered(false)} // Allow hiding when leaving Navbar
      >
        <ul className="navbar-links">
          {auth.isAuthenticated && auth.role === "admin" && (
            <li>
              <p style={{ color: theme.palette.text.primary }}>
                Admin Dashboard
              </p>
            </li>
          )}
          {auth.isAuthenticated && auth.role === "client" && (
            <li>
              <p style={{ color: theme.palette.text.primary }}>
                Client Dashboard
              </p>
            </li>
          )}
        </ul>
        <div
          className="navbar-actions"
          style={{ display: "flex", alignItems: "center", marginRight: "1rem" }}
        >
          <CottageOutlinedIcon
            sx={{
              color: theme.palette.text.primary,
              marginRight: "1rem",
              border: "1px solid transparent",
              "&:hover, &:active": {
                color: hoverColor,
                backgroundColor: "transparent",
                border: ` ${hoverColor}`,
              },
            }}
            onClick={() => {
              if (onLoginToggle) onLoginToggle();
              navigate("/default");
            }}
          />
          {!auth.isAuthenticated && (
            <Button
              variant="text"
              sx={{
                color: theme.palette.text.primary,
                marginRight: "1rem",
                textTransform: "none",
                border: "1px solid transparent",
                borderRadius: "50px",
                "&:hover": {
                  color: hoverColor,
                  backgroundColor: "transparent",
                  border: `1px solid ${hoverColor}`,
                },
              }}
              onClick={() => {
                if (onLoginToggle) onLoginToggle(); // Call onLoginToggle if it's defined
                navigate("/login"); // Navigate to the login page
              }}
            >
              Login
            </Button>
          )}
          <IconButton
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{
              color: theme.palette.text.primary,
              border: "1px solid transparent",
              "&:hover, &:active": {
                color: hoverColor,
                backgroundColor: "transparent",
                border: `1px solid ${hoverColor}`,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            disableScrollLock={true}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              "& .MuiPaper-root": {
                borderTop: ".5px solid",
                borderRadius: "0px",
                position: "fixed",
                width: "200px",
                maxWidth: "200px",
                backgroundColor: "transparent",
                backdropFilter: "blur(10px)", // Blur effect
                color: theme.palette.text.primary,
                mt: 4.8,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                toggleTheme();
                handleMenuClose();
              }}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
              }}
            >
              {mode === "light" ? <NightlightIcon /> : <WbSunnyIcon />}
              <ListItemText
                primary="Mode"
                sx={{
                  textAlign: "right",
                  minWidth: "unset",
                  flex: "none",
                  paddingRight: "8px",
                }}
              />
            </MenuItem>
            {auth.isAuthenticated && [
              <MenuItem
                key="changePassword"
                onClick={() => {
                  setOpenChangePassword(true);
                  handleMenuClose();
                }}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                }}
              >
                <ListItemText
                  primary="Change Password"
                  sx={{
                    textAlign: "right",
                    minWidth: "unset",
                    flex: "none",
                    paddingRight: "8px",
                  }}
                />
              </MenuItem>,
              <MenuItem
                key="logout"
                onClick={handleLogout}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                }}
              >
                <ListItemText
                  primary="Logout"
                  sx={{
                    textAlign: "right",
                    minWidth: "unset",
                    flex: "none",
                    paddingRight: "8px",
                  }}
                />
              </MenuItem>,
            ]}
          </Menu>
        </div>
      </nav>

      {/* ADDED: ChangePassword modal using openChangePassword state */}
      <ChangePassword
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
    </>
  );
};

export default Navbar;
