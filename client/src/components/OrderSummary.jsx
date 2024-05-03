import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
  Toolbar,
} from "@mui/material";
import React from "react";

const OrderSummary = ({ orderSummary }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">Order Summary</Typography>
        </Toolbar>
        <Table sx={{ width: "400px" }}>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>SubTotal</Typography>
              </TableCell>
              <TableCell>
                <Typography>{orderSummary?.allProductSubTotal}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Discount</Typography>
              </TableCell>
              <TableCell>
                <Typography>{orderSummary?.discountAmount}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Grand Total</Typography>
              </TableCell>
              <TableCell>
                <Typography>{orderSummary?.grandTotal}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button variant="contained" type="submit" color="success" fullWidth>
          Procced to checkout
        </Button>
      </TableContainer>
    </Box>
  );
};

export default OrderSummary;
