import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Stack } from "@mui/material";

const ProductCard = ({ name, price, description }) => {
  return (
    <Card
      sx={{ maxWidth: "$00px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <CardMedia
        sx={{ height: 300, width: "100%" }}
        image="https://www.sceptre.com/image/cache/data/product_gallery/1423-X437BV-FSRD/1-750x522.jpg"
        title="Samsung"
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
        <Button variant="contained" color="secondary" fullWidth>
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
