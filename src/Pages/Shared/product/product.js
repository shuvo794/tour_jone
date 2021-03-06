import React from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import Rating from "react-rating";
import { useHistory } from "react-router-dom";
const AllProducts = ({ products, sliceNumber }) => {
  const history = useHistory();
  const bannerFontStyle = {
    fontFamily: "var(--dosis-font)",
    fontWeight: "600",
  };
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          gutterBottom
          style={bannerFontStyle}
          sx={{ color: "var(--color)" }}
        >
          WORLD TOURIST BLOGS
        </Typography>
        <Typography variant="body1" gutterBottom style={bannerFontStyle}>
          Our Places
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {products.slice(0, sliceNumber).map((product) => (
          <Grid key={product._id} item spacing={3} xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: "100%",
                boxShadow: 2,
                mx: "auto",
                borderRadius: "20px",
              }}
              className="product-card"
            >
              <div className="d-flex justify-content-center align-items-center">
                <CardContent>
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
                      mx: "auto",
                      mt: 2,
                      background: "none",
                      color: "black",
                      border: " 1px solid #0E2435",
                      borderRadius: 6,
                      fontSize: 14,
                      px: 2,
                    }}
                    onClick={() => {
                      history.push(`/explore/${product._id}`);
                    }}
                  >
                    Purchase
                  </Button>
                </CardContent>
                <div>
                  <img
                    src={product.image}
                    style={{
                      padding: "10px",
                      objectFit: "contain",
                      width: "200px",
                      height: "300px",
                    }}
                    alt=""
                  />
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AllProducts;