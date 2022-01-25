import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const history = useHistory();
  const { createNewUser, error } = useAuth();
  const onSubmit = (data) => {
    createNewUser(data, location, history);
  };
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ width: { xs: "90%", sm: "80%", md: "40%" }, p: 10 }}
        className="login-form-box"
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "  font-family: var(--dosis-font) !important;",
            fontWeight: 600,
          }}
        >
          {" "}
          <Box
            sx={{
              display: "inline",
              color: "var(--color)",
              fontWeight: "bold",
              width: "5px  ",
            }}
          >
            |{" "}
          </Box>{" "}
          &nbsp; Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <label htmlFor="name"> Name </label>
          <input
            className="login-input"
            required
            {...register("name")}
            type="text"
            placeholder="Enter Your Name"
          />
          <label htmlFor="email"> Email Address </label>
          <input
            className="login-input"
            required
            {...register("email")}
            type="email"
            placeholder="Enter Your Email"
          />
          <label htmlFor="email"> Password </label>
          <input
            className="login-input"
            required
            {...register("password")}
            type="password"
            placeholder="Enter Your Password"
          />
          <Button type="submit">Register</Button>
          <NavLink
            style={{ marginTop: "20px", color: "var(--color)" }}
            to="/login"
          >
            Already Registered? Login
          </NavLink>
          {error && (
            <Typography
              variant="body2"
              component="p"
              sx={{ color: "red", mt: 3 }}
            >
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Register;
