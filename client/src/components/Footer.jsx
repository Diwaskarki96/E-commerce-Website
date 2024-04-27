import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "70px",
        width: "100vw",
        background: "#9D76C1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: "5rem",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff" }}>
        © 2020 Copyright: Nepal Electronic Mart
      </Typography>
    </Box>
  );
};

export default Footer;
