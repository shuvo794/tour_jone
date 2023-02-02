import {
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const ManageAllProducts = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isShipped, setIsShipped] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    fetch("https://tour-jone-server.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => setAllOrders(data));
  }, [isShipped, isDeleted]);
  const handleShipping = (id) => {
    fetch(`https://tour-jone-server.onrender.com/orders?id=${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          alert("status changed successfully");
          setIsShipped(!isShipped);
        }
      });
  };
  const handleDeleteOrder = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(
      "Are you sure you want to delete this users order?"
    );
    if (confirmation) {
      fetch(
        `https://tour-jone-server.onrender.com
/orders/${id}`,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            setIsDeleted(!isDeleted);
          }
        });
    }
  };
  const buttonStyle = {
    mt: 2,
    background: "none",
    color: "black",
    border: 2,
    borderColor: "red",
    fontSize: 16,
    px: 2,
    py: 0.5,
    textTransform: "none",
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
        All Bookings
      </Typography>
      <Grid container spacing={3} sx={{ boxShadow: "var(--box-shadow)" }}>
        {allOrders.map((order) => (
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
                <Box>
                  <Button
                    sx={buttonStyle}
                    onClick={() => handleShipping(order._id)}
                  >
                    Ship
                  </Button>
                  <Button
                    sx={buttonStyle}
                    style={{ marginLeft: "15px" }}
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardMedia>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ManageAllProducts;
