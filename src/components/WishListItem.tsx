import { Box, Grid } from "@mui/material";
import * as React from "react";
import { ProductType } from "../types/types";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface IWishListItemProps {
  item: number;
  product: ProductType;
  handleRemoveItem: (id: number) => void;
}

const WishListItem: React.FunctionComponent<IWishListItemProps> = (props) => {
  const { item, product, handleRemoveItem } = props;

  return (
    <Card sx={{ maxWidth: 300, marginTop: 10 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.image}
        title="a"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 700}} >
          $ {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={()=> handleRemoveItem(item)} >Remove</Button>
      </CardActions>
    </Card>
  );
};

export default WishListItem;
