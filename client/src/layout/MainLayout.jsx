import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;
