import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import CustomSnackBar from "../components/CustomSnackBar";

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <CustomSnackBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "3rem 0",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
