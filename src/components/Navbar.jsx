import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/themeContext";
import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

import {
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Divider,
} from "@mui/material";

import ChangePassword from "../pages/ChangePassword";

const NAV_ITEMS = {
  admin: [
    { title: "Admin Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { title: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
    { title: "Reports", icon: <BarChartIcon />, path: "/reports" },
    { title: "Integrations", icon: <LayersIcon />, path: "/integrations" },
  ],
  client: [
    { title: "Client Dashboard", icon: <DashboardIcon />, path: "/client" },
    { title: "My Orders", icon: <ShoppingCartIcon />, path: "/my-orders" },
    { title: "Analytics", icon: <BarChartIcon />, path: "/analytics" },
  ],
};

const Navbar = ({ onLoginToggle }) => {
  const { auth, logout } = useContext(AuthContext);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const hoverColor = theme.palette.primary.main;

  // Dynamically get NAV_ITEMS based on the user's role
  const userNavItems = auth.isAuthenticated
    ? NAV_ITEMS[auth.role] || [] // Default to an empty array if no role matches
    : [];

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <nav
        className="navbar"
        style={{
          position: "fixed",
          top: drawerOpen || isHovered || !isHidden ? "0" : "-55px",
          left: 0,
          width: "100%",
          height: "55px",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(6px)",
          color: theme.palette.text.primary,
          borderBottom: drawerOpen || isHovered ? `.5px solid` : "none",
          transition: "top 0.3s, background-color 0.3s, border-bottom 0.3s",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Drawer toggle button */}
        <IconButton
          onClick={toggleDrawer}
          sx={{
            marginLeft: "1rem",
            color: theme.palette.text.primary,
            border: "1px solid transparent",
            borderRadius: "50px",
            "&:hover": {
              color: hoverColor,
              backgroundColor: "transparent",
              border: `1px solid ${hoverColor}`,
            },
          }}
        >
          <MenuIcon />
        </IconButton>
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
              "&:hover, &:active": { color: hoverColor },
            }}
            onClick={() => navigate("/default")}
          />
          {!auth.isAuthenticated && (
            <Button
              variant="text"
              sx={{
                color: theme.palette.text.primary,
                marginRight: "1rem",
                "&:hover": {
                  color: hoverColor,
                  backgroundColor: "transparent",
                  border: `1px solid ${hoverColor}`,
                  borderRadius: "50px",
                },
              }}
              onClick={() => navigate("/login")}
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
              borderRadius: "50px",
              "&:hover": {
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
                background: "none",
                backgroundColor: isHovered
                  ? "rgba(255, 255, 255, 0)" // Add blur effect on hover
                  : "rgba(255, 255, 255, 0)", // Semi-transparent when visible
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

      {/* Drawer for side navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="persistent"
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            top: "55px", // Start below the Navbar
            height: "calc(100% - 55px)",
          },
        }}
      >
        <Toolbar />
        <List>
          {userNavItems.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {
                navigate(item.path);
                toggleDrawer();
              }}
              sx={{
                cursor: "pointer", // Add this for proper pointer behavior
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* Change Password Modal */}
      <ChangePassword
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
    </>
  );
};

export default Navbar;
