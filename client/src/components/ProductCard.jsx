import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fallBackImage } from "../constants/general.constants";

const ProductCard = ({ name, price, description, _id, image }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "400px",

        boxShadow:
          " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      }}
    >
      <CardMedia
        sx={{
          height: "400px",
          width: "100%",
          cursor: "pointer",
          objectFit: "cover",
          padding: "1rem",
        }}
        component="img"
        image={image || fallBackImage}
        title="Samsung"
        onClick={() => {
          navigate(`/product-detail/${_id}`);
        }}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Chip label="Samsung" color="secondary" variant="outlined" />
        </Stack>

        <Typography>Price:{price}</Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "justify" }}
        >
          {description}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            navigate(`/product-detail/${_id}`);
          }}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
