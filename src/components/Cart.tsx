import * as React from "react";
import { Context } from "../context/Context";
import { ContextType, ICartType, ProductType } from "../types/types";
import CartItem from "./CartItem";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ICartProps {}

const Cart: React.FunctionComponent<ICartProps> = (props) => {
  const { cart, productList, updateCart } = React.useContext(
    Context
  ) as ContextType;

  const navigate = useNavigate();

  const handleRemoveAllItems = () => {
    updateCart([]);
  };

  const cartTotal: number[] = [];
  const iv: number = 0;

  const handleRemoveItem = (id: number) => {
    updateCart([...cart.filter((item) => item.id !== id)]);
  };

  return (
    <Box sx={{ marginTop: 10, display: "flex-column" }}>
      <Typography variant="h4">Your Cart</Typography>
      <div>
        {cart.length > 0 ? (
          cart.map((item: ICartType) => {
            cartTotal.push(item.totalPrice);
            return productList.map(
              (product: ProductType) =>
                product.id === item.id && (
                  <CartItem
                    product={product}
                    item={item}
                    handleRemoveItem={handleRemoveItem}
                  />
                )
            );
          })
        ) : (
          <div className="text-center">Cart is Empty</div>
        )}
      </div>
      {cart.length > 0 && (
        <h3 className="text-center">
          Cart Total :{cartTotal.reduce((acc, cv) => acc + cv, iv).toFixed(2)}
        </h3>
      )}
      {cart.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleRemoveAllItems}
            className=""
          >
            Remove All
          </Button>
          <Button variant="contained" onClick={() => navigate("/checkout")}>
            Proceed To Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
