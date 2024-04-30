import React from "react";
import ProductCard from "./ProductCard";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { fallBackImage } from "../constants/general.constants";

const BuyerProductList = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-buyer-products"],
    queryFn: async () => {
      return await $axios.post("/product/productList/buyer", {
        page: 1,
        limit: 3,
      });
    },
  });
  const productDetail = data?.data?.data;
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
      {productDetail && productDetail.length > 0 ? (
        productDetail.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })
      ) : (
        <img src={fallBackImage} alt="" />
      )}
      <Pagination count={10} color="secondary" />
    </Box>
  );
};

export default BuyerProductList;
