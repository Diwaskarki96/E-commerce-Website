import { Box } from "@mui/material";
import React from "react";
import CartItemTable from "../components/CartItemTable";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        width: "90%",
      }}
    >
      <CartItemTable />
      <OrderSummary />
    </Box>
  );
};

export default Cart;
