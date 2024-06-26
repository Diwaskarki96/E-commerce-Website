import { useState } from "react";
import ProductCard from "./ProductCard";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Pagination,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { fallBackImage } from "../constants/general.constants";
import Loader from "./Loader";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
const BuyerProductList = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [searchText, setsearchText] = useState("");
  const { isPending, data } = useQuery({
    queryKey: ["get-buyer-products", currentPage, searchText],
    queryFn: async () => {
      return await $axios.post("/product/productList/buyer", {
        page: currentPage,
        limit: 3,
        searchText: searchText || null,
      });
    },
  });

  const productDetail = data?.data?.data;
  const totalPage = data?.data?.totalPage;

  const updateSearchText = (text) => {
    setsearchText(text);
    setcurrentPage(1);
  };

  const delayedUpdateSearchText = debounce(updateSearchText, 1000);
  if (isPending) {
    return <Loader />;
  }
  return (
    <>
      <FormControl variant="standard">
        <OutlinedInput
          placeholder="Search Products..."
          startAdornment={
            <InputAdornment position="start" sx={{ color: "purple " }}>
              <SearchIcon sx={{ fontSize: "2rem" }} />
            </InputAdornment>
          }
          defaultValue={searchText || ""}
          onChange={(event) => {
            delayedUpdateSearchText(event.target.value);
          }}
        />
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          margin: "1rem",
        }}
      >
        {productDetail && productDetail.length > 0 ? (
          productDetail.map((item) => {
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
        onChange={(_, value) => {
          setcurrentPage(value);
        }}
      />
    </>
  );
};

export default BuyerProductList;
