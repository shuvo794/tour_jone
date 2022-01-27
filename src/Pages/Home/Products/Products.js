import { Button, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Product from "../../Shared/product/product";
import { useHistory } from "react-router";
import { CircularProgress } from "@mui/material";
const Products = () => {

  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const size = 10;


  useEffect(() => {
    fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
      .then(res => res.json())
      .then(data =>{
        setProducts(data.products);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber)
      }
        )   
  }, [page]);
  const containerStyle = {
    // backgroundImage: `url("https://i.ibb.co/7Q50Zr6/product-Bg.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div style={containerStyle}>
      <Container sx={{ mb: 10, mt: 7 }}>
        {products.length ? (
          <>
            <Product products={products} ></Product>
            <div className="pagination">
            {
              [...Array(pageCount).keys()]
              .map(number=> <button
              className={number === page ? 'selected' :''}
              key={number}
              onClick={()=> setPage(number)}
              >{number + 1}</button> )
            }
            </div>
         
          </>
        ) : (
          <CircularProgress sx={{ mt: 50 }} />
        )}
      </Container>
    </div>
  );
};

export default Products;
