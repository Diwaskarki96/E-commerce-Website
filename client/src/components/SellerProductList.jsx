import React from "react";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { Box, CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";

const SellerProductList = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get=seller=products"],
    queryFn: async () => {
      return await $axios.post("/product/productList/seller", {
        page: 1,
        limit: 3,
      });
    },
  });
  const productList = data?.data?.data;
  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    </Box>
  );
};

export default SellerProductList;
