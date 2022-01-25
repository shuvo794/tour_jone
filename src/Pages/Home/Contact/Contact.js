import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./Contact.css";
const Contact = () => {
  const contactStyle = {
    fontFamily: "var(--dosis-font)",
    fontWeight: 600,
  };

  return (
    <Container>
      <Typography variant="h3" style={contactStyle}>
        CONTACT <span style={{ color: "var(--color)" }}>INFORMATION</span>
      </Typography>
      <Box
        sx={{ width: { xs: "90%", sm: "80%", md: "80%" }, mx: "auto", my: 4 }}
        className="contact-form"
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", pt: 4 }}
          style={contactStyle}
        >
          Send us a message
        </Typography>
        <form action="" className="form">
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="Your Email" />
          <textarea
            name=""
            id=""
            cols="22"
            rows="10"
            placeholder="Your Message"
          ></textarea>
          <Button
            variant="contained"
            sx={{
              backgroundImage: "var(--button-bg)",
              borderRadius: "25px",
              p: "8px 40px",
              mt: 3,
              fontSize: "17px",
              fontWeight: 600,
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Contact;
