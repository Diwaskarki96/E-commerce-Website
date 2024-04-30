import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { $axios } from "../axios/axiosInstance";
import { fallBackImage } from "../constants/general.constants";

const SellerProductList = () => {
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products"],
    queryFn: async () => {
      return await $axios.post("/product/productList/seller", {
        page: 1,
        limit: 3,
      });
    },
  });

  console.log(data);
  const productList = data?.data?.data;

  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/add-products");
        }}
        sx={{ marginBottom: "2rem", marginTop: "1rem" }}
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
        {productList && productList.length > 0 ? (
          productList.map((item) => {
            return <ProductCard key={item._id} {...item} />;
          })
        ) : (
          <img src={fallBackImage} alt="" />
        )}
      </Box>
    </Box>
  );
};

export default SellerProductList;
