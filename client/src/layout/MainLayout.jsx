import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <h3>Footer</h3>
    </>
  );
};

export default MainLayout;
