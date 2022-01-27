import { Card, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import Slider from "react-slick";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  return (
    <Container sx={{ my: 12 }}>
      <Box>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: "var(--dosis-font )",
            fontWeight: 600,
            my: 4,
          }}
        >
          OUR <span style={{ color: "var(--blue-color)" }}>TREAVER'S TALK</span>
        </Typography>
      </Box>
      <Slider {...settings}>
        {reviews.map((review) => (
          <Card
            key={review._id}
            sx={{
              maxWidth: "85%",
              mx: "auto",
              background:
                "url(https://wavio.b-cdn.net/wp-content/uploads/2020/12/Quotemarks-right-6.png) no-repeat",
              backgroundSize: "60px ",
              backgroundPosition: "730px 70px",
            }}
            className="review-card"
          >
            <Grid
              container
              spacing={3}
              sx={{ p: { xs: "15px 25px", md: "50px 80px" } }}
            >
              <Grid item xs={12} lg={4}>
                <img
                  src={review.image}
                  width="240px"
                  height="240px"
                  style={{ borderRadius: "50%" }}
                  alt="reviewer img"
                />
              </Grid>
              <Grid item xs={12} lg={8} sx={{ textAlign: "left" }}>
                <Typography
                  variant="h4"
                  sx={{ fontFamily: "var(--nunito )", fontWeight: 600 }}
                >
                  {review.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "var(--color)",
                    fontFamily: "var(--nunito )",
                    mt: 3,
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  {review.position}
                </Typography>
                <Rating
                  initialRating={review.rating}
                  readonly
                  emptySymbol="far fa-star rating"
                  fullSymbol="fas fa-star rating"
                ></Rating>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "var(--nunito )",
                    width: { xs: "90%", md: "70%" },
                    textAlign: "justify",
                    background: "#edf9ff",
                    color: "#081f46",
                    p: "20px 15px",
                    borderRadius: "7px",
                    fontSize: "17px",
                    mt: 2,
                  }}
                >
                  {review.reviewText.slice(0, 150) + "..."}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Slider>
    </Container>
  );
};

export default Review;
