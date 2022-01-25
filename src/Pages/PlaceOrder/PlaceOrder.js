import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
// import { NavLink } from 'react-router-dom';
import Footer from "../Shared/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";

const PlaceOrder = () => {
  const { user, error } = useAuth();
  const { reset, register, handleSubmit } = useForm();
  const { id } = useParams();
  const [orderedProduct, setOrderedProduct] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { _id, ...rest } = data;
        setOrderedProduct(rest);
      });
  }, [id]);
  console.log(orderedProduct);
  const onSubmit = (data) => {
    let newData = { ...data, ...orderedProduct, status: "pending" };
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Order Placed successfully");
          reset();
        }
      });
  };
  return (
    <>
      <Navigation />
      <Container sx={{ my: { xs: 10, md: 10 } }}>
        <Box
          sx={{
            width: { sm: "80%", md: "40%" },
            p: { xs: 4, md: 5, lg: 8 },
            mx: "auto",
          }}
          className="login-form-box"
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontFamily: "var(--dosis-font)",
              fontWeight: 600,
              color: "var(--color)",
            }}
          >
            {orderedProduct.name}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <label htmlFor="name"> Name* </label>
            <input
              className="login-input"
              required
              {...register("userName")}
              defaultValue={user.displayName}
              type="text"
              placeholder="Enter Your Name"
            />
            <label htmlFor="email"> Email Address* </label>
            <input
              className="login-input"
              required
              {...register("userEmail")}
              defaultValue={user.email}
              type="email"
              placeholder="Enter Your Email"
            />
            <label htmlFor="email"> Phone* </label>
            <input
              className="login-input"
              required
              {...register("Phone")}
              type="text"
              placeholder="Enter Your phone Number"
            />
            <label htmlFor="email"> Address* </label>
            <input
              className="login-input"
              required
              {...register("address")}
              type="text"
              placeholder="Enter Your Address"
            />
            <Button type="submit">Purchase</Button>
            {error && <Typography>{error}</Typography>}
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PlaceOrder;
