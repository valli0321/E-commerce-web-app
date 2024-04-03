import * as React from "react";
import { Context } from "../context/Context";
import { ContextType, ICartType, ProductType } from "../types/types";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ICartItemProps {
  product: ProductType;
  item: ICartType;
  handleRemoveItem: (id: number) => void;
}

const CartItem: React.FunctionComponent<ICartItemProps> = (props) => {
  const { product, item, handleRemoveItem } = props;
  const { cart, updateCart } = React.useContext(Context) as ContextType;
  // const myIcon : IconProp = "fa-solid fa-plus";

  const handleAdd = (id: number) => {
    updateCart([
      ...cart.map((item: ICartType) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.price * (item.quantity + 1),
            }
          : item
      ),
    ]);
  };

  const handleRemove = (id: number) => {
    if (item.quantity > 1)
      updateCart([
        ...cart.map((item: ICartType) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.price * (item.quantity - 1),
              }
            : item
        ),
      ]);
  };

  return (
    <div className="d-flex cart-item p-2 mb-2">
      <img className="cart-item-image" src={product.image} />
      <div className="p-2">
        <h1 style={{ fontSize: "20px" }}>{product.title}</h1>
        <RemoveCircleIcon
          color="warning"
          onClick={() => handleRemove(item.id)}
        />
        <span> {item.quantity} </span>

        <AddCircleIcon color="success" onClick={() => handleAdd(item.id)} />
      </div>
      <div className="d-flex me-0 align-items-end">
        <Button onClick={() => handleRemoveItem(item.id)} color="error">
          Remove Item
        </Button>
        <h3 style={{ fontSize: "20px" }}>${item.totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartItem;
