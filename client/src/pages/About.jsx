import React from "react";
import { Container, Typography, Grid } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to our e-commerce website! We are thrilled to have you here.
      </Typography>
      <Typography variant="body1" paragraph>
        At Ecommerence, we are passionate about providing high-quality products
        and excellent customer service to our valued customers in Nepal and
        beyond.
      </Typography>
      <Typography variant="body1" paragraph>
        Our mission is to make your online shopping experience seamless,
        enjoyable, and secure. We carefully curate our collection to offer you
        the latest trends, best deals, and top-notch quality products.
      </Typography>
      <Typography variant="body1" paragraph>
        Whether you are looking for clothing, electronics, home decor, or gifts,
        we have got you covered. Our user-friendly website, secure payment
        options, and fast delivery ensure that you can shop with confidence.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            To become the leading e-commerce platform in Nepal, offering a wide
            range of products and exceptional shopping experience to our
            customers.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Our Values
          </Typography>
          <Typography variant="body1" paragraph>
            - Customer Satisfaction: Putting our customers first in everything
            we do.
          </Typography>
          <Typography variant="body1" paragraph>
            - Quality: Offering only high-quality products that meet our
            standards.
          </Typography>
          <Typography variant="body1" paragraph>
            - Integrity: Operating with honesty, transparency, and
            accountability.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
