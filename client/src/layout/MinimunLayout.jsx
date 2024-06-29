import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackBar from "../components/CustomSnackBar";

const MinimunLayout = () => {
  return (
    <>
      <CustomSnackBar />
      <Outlet />
    </>
  );
};

export default MinimunLayout;
