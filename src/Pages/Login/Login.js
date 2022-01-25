import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Login.css";
const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const { singInUser, error, singInWithGoogle } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    singInUser(data, location, history);
    reset();
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
        sx={{
          width: { xs: "90%", sm: "80%", md: "40%" },
          px: { xs: 4, sm: 7, md: 10 },
          py: 9,
        }}
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
          &nbsp; Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <label htmlFor="email"> Email Address </label>
          <input
            className="login-input"
            required
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          <label htmlFor="email"> Password </label>
          <input
            className="login-input"
            required
            {...register("password")}
            type="password"
            placeholder="password"
          />
          <Button type="submit">Login</Button>
          <Button
            sx={{ mt: 2 }}
            onClick={() => singInWithGoogle(history, location)}
          >
            Sign In with Google
          </Button>
          <NavLink
            style={{ marginTop: "20px", color: "var(--color)" }}
            to="/register"
          >
            New User? Create an account
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

export default Login;
