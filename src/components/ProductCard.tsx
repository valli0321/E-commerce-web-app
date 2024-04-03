import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ContextType, ICartType, ProductType } from "../types/types";
import { Context } from "../context/Context";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../pages/styles.css";

interface IProductCardProps {
  product: ProductType;
}

const styles = {
  media: {
    height: 0,
    padding: "40%", // 16:9,
    marginTop: "0",
  },
};

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const { updateCart, cart, wishList, updateWishList } = React.useContext(
    Context
  ) as ContextType;

  const handleAddToCart = () => {
    if (cart.some((item) => item.id === product.id)) {
      const updatedCart: ICartType[] = cart.map((item: ICartType) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.price * (item.quantity + 1),
            }
          : item
      );
      updateCart([...updatedCart]);
    } else {
      updateCart([
        ...cart,
        {
          id: product.id,
          quantity: 1,
          price: product.price,
          totalPrice: product.price,
        },
      ]);
    }
  };



  const handleAddToWishList = (id: number) => {
    updateWishList([...wishList, id]);
  };

  const handleRemoveFromWishList = (id: number) => {
    updateWishList([...wishList.filter((item: number) => item !== id)]);
  };

  // console.log(cart);

  return (
    <Card
      sx={{
        width: 280,
        padding: 2,
        height: 370,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Montserrat",
      }}
    >
      <CardMedia
        className=""
        // component="img"
        sx={{ height: 200 }}
        image={product.image}
        title="green iguana"
        style={styles.media}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontFamily: "Montserrat", fontWeight: "bold", fontSize: 13 }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontFamily: "Montserrat" }}
        >
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleAddToCart} size="small">
          Add to Cart
        </Button>
        {wishList.some((item) => item === product.id) ? (
          <FavoriteIcon
            color="error"
            onClick={() => handleRemoveFromWishList(product.id)}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            onClick={() => handleAddToWishList(product.id)}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
