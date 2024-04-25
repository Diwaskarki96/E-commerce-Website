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
      sx={{ maxWidth: "$00px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <CardMedia
        sx={{ height: 300, width: "100%", cursor: "pointer" }}
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

        <Typography variant="body2" color="text.secondary">
          {description}
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
