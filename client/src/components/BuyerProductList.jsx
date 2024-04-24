import React from "react";
import ProductCard from "./ProductCard";
import { Box } from "@mui/material";

const BuyerProductList = () => {
  return (
    <Box>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Box>
  );
};

export default BuyerProductList;
