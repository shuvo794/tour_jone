import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navigation.css";
import useAuth from "../../../hooks/useAuth";
const Navigation = () => {
  const buttonStyle = {
    fontFamily: "var(--nunito)",
    margin: "0 20px 0 20px",
    fontSize: "1rem",
    color: "black",
    textTransform: "none",
  };
  const [isActive, setIsActive] = useState(false);
  const { user, signOutUser } = useAuth();
  const handleToggleBtn = () => {
    setIsActive(!isActive);
  };
  const toggleBtn = {
    fontSize: "40px",
    cursor: "pointer",
  };

  const history = useHistory();
  return (
    <Box className="navbar">
      <Container sx={{ py: 3, mb: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ alignSelf: "flex-start" }}>
            <NavLink to="/home">
              <img
                style={{ width: "100px", height: "80px" }}
                src="https://i.ibb.co/yPCncsc/depositphotos-125022518-stock-illustration-m-letter-logo-template.png"
                alt=""
              />
            </NavLink>
          </Box>
          <Box
            sx={{
              color: "black",
              display: { sm: "block", md: "none" },
              position: "absolute",
              top: 30,
              right: 20,
            }}
            onClick={handleToggleBtn}
          >
            {isActive ? (
              <CloseIcon style={toggleBtn} />
            ) : (
              <MenuIcon style={toggleBtn} />
            )}
          </Box>
          <Box
            className={`nav-links ${isActive ? "active" : ""}`}
            sx={{ display: { xs: "none", md: "initial" } }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavLink to="/home" className="navbar-link">
                <Button style={buttonStyle}>Home</Button>
              </NavLink>
              <NavLink to="/explore" className="navbar-link">
                <Button style={buttonStyle}>Explore</Button>
              </NavLink>
              {user.email && (
                <NavLink to="/dashboard" className="navbar-link">
                  <Button style={buttonStyle}>Dashboard</Button>
                </NavLink>
              )}
              {user?.email ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "center",
                  }}
                >
                  <Button style={buttonStyle}>{user?.displayName}</Button>
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    onClick={() => {
                      signOutUser(history);
                    }}
                    sx={{ backgroundImage: "var(--button-bg)" }}
                  >
                    Log Out
                  </Button>
                </Box>
              ) : (
                <NavLink to="/login">
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    sx={{ backgroundImage: "var(--button-bg)" }}
                  >
                    Login
                  </Button>
                </NavLink>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navigation;
