import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const bannerFontStyle = {
    fontFamily: "var(--dosis-font)",
    fontWeight: "600",
  };
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [isDeleted]);
  const handleDeleteProduct = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(
      "Are you sure you want to delete the product ?"
    );
    if (confirmation) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            setIsDeleted(!isDeleted);
          }
        });
    }
  };

  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          gutterBottom
          style={bannerFontStyle}
          sx={{ color: "var(--color)" }}
        >
          Products that we have
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id} item spacing={3} xs={12} lg={6}>
            <Card
              sx={{
                boxShadow: 2,
                mx: "auto",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "row",
              }}
              className="product-card"
            >
              <img
                src={product.image}
                style={{
                  padding: "15px",
                  objectFit: "contain",
                  width: "150px",
                  height: "220px",
                }}
                alt=""
              />
              <CardContent sx={{ textAlign: "left" }}>
                <Typography
                  style={bannerFontStyle}
                  gutterBottom
                  variant="h5"
                  component="h5"
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h5"
                  style={bannerFontStyle}
                  component="p"
                  sx={{ my: 2 }}
                >
                  $ {product.price}
                </Typography>
                <Rating
                  initialRating={product.rating}
                  readonly
                  emptySymbol="far fa-star rating"
                  fullSymbol="fas fa-star rating"
                ></Rating>
                <Button
                  sx={{
                    display: "block",
                    mt: 2,
                    background: "none",
                    color: "black",
                    border: 2,
                    borderColor: "red",
                    // borderRadius: ,
                    fontSize: 16,
                    px: 4,
                    py: 0.7,
                  }}
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ManageProducts;
