import React from "react";
import BuyerProductList from "../components/BuyerProductList";
import SellerProductList from "../components/SellerProductList";

const ProductList = () => {
  const userRole = localStorage.getItem("role");

  return (
    <>{userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}</>
  );
};

export default ProductList;
