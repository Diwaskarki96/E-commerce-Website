import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { fallBackImage } from "../constants/general.constants";
import { useNavigate, useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const CartItemTable = ({ cartData }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending: removeSingleCartItemPending,
    mutate: removeSingleCartMutate,
  } = useMutation({
    mutationKey: ["remove-single-cart-item"],
    mutationFn: async (productId) => {
      return await $axios.delete(`/cart/delete/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-cart-item-list");
    },
  });
  const { isPending: removeAllCartPending, mutate: removeAllCartMutate } =
    useMutation({
      mutationKey: ["remove-all-cart-item"],
      mutationFn: async () => {
        return await $axios.delete("/cart/clear");
      },
      onSuccess: () => {
        queryClient.invalidateQueries("get-cart-item-list");
      },
    });
  const { isPending: updateQuantityPending, mutate: updateQuantityMutate } =
    useMutation({
      mutationKey: ["update-cart-item-quantity"],
      mutationFn: async (values) => {
        return await $axios.put(`/cart/edit/${values.productId}`, {
          action: values.action,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries("get-cart-item-list");
      },
    });
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "70%",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      {(removeAllCartPending ||
        removeSingleCartItemPending ||
        updateQuantityPending) && <LinearProgress color="success" />}
      <Button
        variant="contained"
        color="error"
        type="submit"
        onClick={() => {
          removeAllCartMutate();
        }}
      >
        Clear Cart
      </Button>
      <Table sx={{ width: "70%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.N.</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="left">Sub total</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartData.map((cart, index) => (
            <TableRow
              key={cart._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">
                <img
                  src={cart.image || fallBackImage}
                  alt={cart.name}
                  style={{
                    height: "200px",
                    width: "200px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onClick={() => {
                    navigate(`/product-detail/${cart.productId}`);
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Stack spacing={2} justifyContent="center" alignItems="center">
                  <Typography variant="body1"> {cart.name}</Typography>
                  <Chip
                    label={cart.brand}
                    color="secondary"
                    variant="outlined"
                    sx={{ fontSize: "1rem" }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">${cart.unitPrice}</Typography>
              </TableCell>
              <TableCell align="center">
                <Stack flexDirection="row" alignItems="center" spacing="0.5">
                  <IconButton
                    disabled={cart.orderQuantity === 1 || updateQuantityPending}
                    onClick={() => {
                      updateQuantityMutate({
                        productId: cart?.productId,
                        action: "dec",
                      });
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1">{cart.orderQuantity}</Typography>
                  <IconButton
                    disabled={updateQuantityPending}
                    onClick={() => {
                      updateQuantityMutate({
                        productId: cart?.productId,
                        action: "inc",
                      });
                    }}
                  >
                    <Add />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{200}</Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => {
                    removeSingleCartMutate(cart.productId);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CartItemTable;
