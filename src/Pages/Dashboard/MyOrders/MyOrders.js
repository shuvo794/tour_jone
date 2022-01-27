import {
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    fetch(`http://localhost:5000/orders/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyOrders(data);
      });
  }, [myOrders, user?.email]);
  const handleDeleteOrder = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm("Are you sure you want to delete this order?");
    if (confirmation) {
      fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <Container sx={{ my: 10 }}>
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          color: "var(--blue-color)",
          fontFamily: "var(--dosis-font)",
          fontWeight: 600,
        }}
      >
        My Booked Places
      </Typography>
      <Grid container spacing={3} sx={{ boxShadow: "var(--box-shadow)" }}>
        {myOrders.map((order) => (
          <Grid key={order._id} item xs={12} lg={6} sx={{ pr: 3, pb: 3 }}>
            <Card
              sx={{
                maxWidth: "auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                px: 3,
                py: 5,
                boxShadow: "var(--box-shadow)",
                borderRadius: 3,
              }}
            >
              <img
                style={{ width: "100px", height: "145px" }}
                src={order.image}
                alt="ordered products img"
              />
              <CardMedia
                sx={{
                  height: "100px",
                  ml: 2,
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "left",
                    fontFamily: "var(--dosis-font)",
                    fontWeight: 600,
                  }}
                >
                  {order.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    textAlign: "left",
                    my: 1,
                    background: "var(--color)",
                    fontSize: "15px",
                    p: 0.5,
                    borderRadius: "3px",
                  }}
                >
                  {order.status}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: "red",
                    borderRadius: "10px",
                    p: "5px 20px",
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "white",
                  }}
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Cancel
                </Button>
              </CardMedia>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyOrders;
