import { useState } from "react";
import ProductCard from "./ProductCard";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { fallBackImage } from "../constants/general.constants";

const BuyerProductList = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const { isPending, data } = useQuery({
    queryKey: ["get-buyer-products", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/productList/buyer", {
        page: currentPage,
        limit: 3,
      });
    },
  });

  const productDetail = data?.data?.data;
  const totalPage = data?.data?.totalPage;
  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <>
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
        {productDetail && productDetail.length > 0 ? (
          productDetail.map((item) => {
            return <ProductCard key={item._id} {...item} />;
          })
        ) : (
          <img src={fallBackImage} alt="" />
        )}
      </Box>
      <Pagination
        page={currentPage}
        count={totalPage}
        color="secondary"
        onChange={(_, value) => {
          setcurrentPage(value);
        }}
      />
    </>
  );
};

export default BuyerProductList;
