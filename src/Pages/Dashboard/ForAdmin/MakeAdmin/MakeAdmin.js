import { Button, Container } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const user = { email: data.email };
    fetch("http://localhost:5000/users/admin", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    reset();
  };
  return (
    <Container sx={{ my: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <label htmlFor="email" style={{ textAlign: "left" }}>
          Email Address
        </label>
        <input
          className="login-input"
          required
          {...register("email")}
          type="email"
          placeholder="Email"
          style={{ maxWidth: "350px" }}
        />
        <Button type="submit">Make Admin</Button>
      </form>
    </Container>
  );
};

export default MakeAdmin;
