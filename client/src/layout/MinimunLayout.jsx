import React from "react";
import { Outlet } from "react-router-dom";

const MinimunLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MinimunLayout;
