import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import DeleteProductDialog from "../components/DeleteProductDialog";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { fallBackImage } from "../constants/general.constants";
import Loader from "../components/Loader";

// Box => div
// Stack => div which has display flex and direction column
const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const userRole = localStorage.getItem("role");
  const [productCount, setproductCount] = useState(1);
  const queryClient = useQueryClient();
  const { isPending, data } = useQuery({
    queryKey: ["get-product-detail"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
    },
  });
  const { isPending: addToCartPending, mutate } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async () => {
      return await $axios.post("/cart/add", {
        productId: productId,
        orderQuantity: productCount,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("gert-cart-item-count");
    },
  });
  const productDetail = data?.data?.data;
  if (isPending || addToCartPending) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "1rem",
        mt: "5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "50%",
        }}
      >
        <img
          src={productDetail.image || fallBackImage}
          alt=""
          style={{ width: "90%" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          width: "500px",
          gap: "2rem",
        }}
      >
        <Typography variant="h5">{productDetail.name}</Typography>
        <Chip
          label={productDetail.brand}
          variant="outlined"
          color="success"
          sx={{ fontSize: "1rem" }}
        />
        <Typography sx={{ textAlign: "justify" }}>
          {productDetail.description}
        </Typography>
        <Typography variant="h6">Price: Rs.{productDetail.price}</Typography>

        <Chip
          variant="outlined"
          color="success"
          label={productDetail.category}
          sx={{ fontSize: "1rem", textTransform: "capitalize" }}
        />

        <Typography variant="h6">
          Available quantity: {productDetail.availableQuantity}
        </Typography>

        <Stack direction="row" spacing={4}>
          <Typography variant="h6">Free shipping</Typography>
          <Chip
            variant="outlined"
            color={productDetail.freeShipping ? "success" : "error"}
            label={productDetail.freeShipping ? "Yes" : "No"}
            sx={{ fontSize: "1rem" }}
          />
        </Stack>

        {userRole === "seller" && (
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<EditIcon />}
              onClick={() => {
                navigate(`/product-edit/${productId}`);
              }}
              fullWidth
            >
              Edit
            </Button>

            <DeleteProductDialog />
          </Stack>
        )}
        {userRole === "buyer" && (
          <>
            <Stack flexDirection={"row"}>
              <IconButton
                onClick={() => {
                  setproductCount((prevCount) => prevCount - 1);
                }}
                disabled={productCount === 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h4">{productCount}</Typography>
              <IconButton
                onClick={() => {
                  setproductCount((prevCount) => prevCount + 1);
                }}
                disabled={productCount === productDetail?.availableQuantity}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                mutate();
              }}
            >
              Add to cart
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetail;
