import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { IconButton, LinearProgress } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

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

const CartItemTable = () => {
  const { isPending, data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return await $axios.get("/cart/list");
    },
  });
  const cartData = data?.data?.cartData;
  console.log(cartData);
  if (isPending) {
    return <LinearProgress />;
  }
  //   return (
  //     <TableContainer component={Paper}>
  //       <Table sx={{ width: "70%" }} aria-label="simple table">
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>S.N.</TableCell>
  //             <TableCell align="right">Image</TableCell>
  //             <TableCell align="right">Product</TableCell>
  //             <TableCell align="right">Price</TableCell>
  //             <TableCell align="right">Ordered Quantity</TableCell>
  //             <TableCell align="right">Sub total</TableCell>
  //             <TableCell align="right">Action</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {cartData.map((cart, index) => (
  //             <TableRow
  //               key={cart._id}
  //               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //             >
  //               <TableCell component="th" scope="row">
  //                 {index + 1}
  //               </TableCell>
  //               <TableCell align="right">
  //                 <img
  //                   src={cart.image}
  //                   alt=""
  //                   style={{ height: "200px", width: "200px" }}
  //                 />
  //               </TableCell>
  //               <TableCell align="right">{cart.name}</TableCell>
  //               <TableCell align="right">{cart.unitPrice}</TableCell>
  //               <TableCell align="right">{cart.orderedQuantity}</TableCell>
  //               <TableCell align="right">200</TableCell>
  //               <IconButton>
  //                 <ClearIcon />
  //               </IconButton>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   );
};
export default CartItemTable;
