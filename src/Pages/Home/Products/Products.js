import { Button, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Product from "../../Shared/product/product";
import { useHistory } from "react-router";
import { CircularProgress } from "@mui/material";
const Products = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const containerStyle = {
    backgroundImage: `url("https://i.ibb.co/7Q50Zr6/product-Bg.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div style={containerStyle}>
      <Container sx={{ mb: 10, mt: 7 }}>
        {products.length ? (
          <>
            <Product products={products} sliceNumber={6}></Product>
            <Button
              variant="contained"
              sx={{
                backgroundImage: "var(--button-bg)",
                borderRadius: "25px",
                p: "8px 40px",
                mt: 5,
                fontSize: "17px",
                fontWeight: 600,
              }}
              onClick={() => history.push("/explore")}
            >
              {" "}
              View More <ArrowForwardIcon />{" "}
            </Button>
          </>
        ) : (
          <CircularProgress sx={{ mt: 50 }} />
        )}
      </Container>
    </div>
  );
};

export default Products;
