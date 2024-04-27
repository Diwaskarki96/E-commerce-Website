import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import DeleteProductDialog from "../components/DeleteProductDialog";

// Box => div
// Stack => div which has display flex and direction column
const ProductDetail = () => {
  const params = useParams();
  const productId = params.id;
  const { isPending, data } = useQuery({
    queryKey: ["get-product-detail"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
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
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "1rem",
        mt: "5rem",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img
          src="https://media.istockphoto.com/id/136568907/photo/a-purple-winter-parka-for-a-fashion-image.jpg?s=612x612&w=0&k=20&c=fK2_No3CvQnqIY9ti2giLz2w8IaUmSrptu2iSNxd93g="
          alt=""
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
        <Typography variant="h6">Price: $50.50</Typography>

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
            color="success"
            label={productDetail.freeShipping ? "Yes" : "No"}
            sx={{ fontSize: "1rem" }}
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<EditIcon />}
            fullWidth
          >
            Edit
          </Button>

          <DeleteProductDialog />
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetail;
