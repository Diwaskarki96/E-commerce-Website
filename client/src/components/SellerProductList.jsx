import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Pagination,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { $axios } from "../axios/axiosInstance";
import { fallBackImage } from "../constants/general.constants";
import Loader from "../components/Loader";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
const SellerProductList = () => {
  const navigate = useNavigate();
  const [currentPage, setcurrentPage] = useState(1);
  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/productList/seller", {
        page: currentPage,
        limit: 3,
      });
    },
  });

  const productList = data?.data?.data;

  const totalPage = data?.data?.totalPage;

  if (isPending) {
    return <Loader />;
  }
  return (
    <>
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
            mb: "2rem",
          }}
        >
          {productList && productList.length > 0 ? (
            productList.map((item) => {
              return <ProductCard key={item._id} {...item} />;
            })
          ) : (
            <img
              style={{ height: "400px" }}
              src="/image/productNotFound.png"
              alt=""
            />
          )}
        </Box>
        <Pagination
          page={currentPage}
          count={totalPage}
          color="secondary"
          onChange={(_, values) => {
            setcurrentPage(values);
          }}
        />
      </Box>
    </>
  );
};

export default SellerProductList;
