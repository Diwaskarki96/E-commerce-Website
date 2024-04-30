import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import CartItemTable from "../components/CartItemTable";
import OrderSummary from "../components/OrderSummary";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import KeepShopping from "../components/KeepShopping";

const Cart = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/list");
    },
  });
  const cartData = data?.data?.cartData;
  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <>
      <Typography variant="h3" sx={{ mb: "2rem" }}>
        Shopping cart
      </Typography>
      {cartData?.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "90%",
          }}
        >
          <CartItemTable cartData={cartData} />
          <OrderSummary />
        </Box>
      ) : (
        <KeepShopping />
      )}
    </>
  );
};

export default Cart;
