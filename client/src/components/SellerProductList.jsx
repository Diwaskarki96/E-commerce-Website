import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { $axios } from "../axios/axiosInstance";

const SellerProductList = () => {
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products"],
    queryFn: async () => {
      return await $axios.post("/product/productList/seller", {
        page: 1,
        limit: 20,
      });
    },
  });

  const productList = data?.data?.data;

  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/add-products");
        }}
        sx={{ marginBottom: "2rem" }}
      >
        add product
      </Button>
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
    </>
  );
};

export default SellerProductList;
