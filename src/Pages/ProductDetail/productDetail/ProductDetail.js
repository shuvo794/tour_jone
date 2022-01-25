import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { useHistory } from "react-router";
const ProductDetail = ({ id }) => {
  const [singleProduct, setSingleProduct] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleProduct(data));
  }, [id]);
  const history = useHistory();
  return (
    <Container sx={{ my: 20 }}>
      <Grid
        container
        spacing={4}
        sx={{ width: "90%", mx: "auto", borderRadius: 3, py: 4, px: 4 }}
        className="productDetail-card"
      >
        <Grid item xs={12} sm={10} sx={{ mx: { sm: "auto" } }} md={5}>
          <img
            src={singleProduct.image}
            style={{ width: "60%" }}
            alt="water bottle img"
          />
        </Grid>
        <Grid item xs={12} md={7} sx={{ textAlign: "left" }}>
          <img
            src="https://wavio.b-cdn.net/wp-content/uploads/2020/12/Wave.png"
            style={{ width: "200px", height: "10px", marginBottom: "20px" }}
            alt=""
          />{" "}
          <br />
          <Rating
            initialRating={singleProduct.rating}
            readonly
            emptySymbol="far fa-star rating"
            fullSymbol="fas fa-star rating"
          ></Rating>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontFamily: "var(--nunito)",
              mt: 2,
              color: "var(--blue-color)",
            }}
          >
            Price : {singleProduct.price}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontFamily: "var(--nunito)", mt: 2, color: "var(--color)" }}
          >
            {singleProduct.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "var(--nunito )",
              width: { sm: "80%", md: "70%" },
              textAlign: "justify",
              background: "#edf9ff",
              color: "#081f46",
              p: "25px 20px",
              mt: 4,
              borderRadius: "7px",
              fontSize: "16px",
            }}
          >
            {singleProduct?.description?.slice(0, 250)}...
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundImage: "var(--button-bg)",
              borderRadius: "30px",
              p: "10px 35px",
              mt: 3,
              fontSize: "17px",
              fontWeight: 600,
              fontFamily: "",
            }}
            onClick={() => {
              history.push(`/placeorder/${singleProduct._id}`);
            }}
          >
            Purchase
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
