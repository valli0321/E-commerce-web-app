import * as React from "react";
import { Context } from "../context/Context";
import { ContextType } from "../types/types";
import { Box } from "@mui/material";
import WishListItem from "./WishListItem";

interface IWishListComponentProps {}

const WishListComponent: React.FunctionComponent<IWishListComponentProps> = (
  props
) => {
  const { productList, wishList, updateWishList } = React.useContext(Context) as ContextType;

  const handleRemoveItem = (id: number) => {
    updateWishList([...wishList.filter(item => item !== id)])
  }

  return (
    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center'}} >
      {wishList.length > 0 ? wishList.map((item) =>
        productList.map(
          (product) =>
            item === product.id && (
              <WishListItem item={item} product={product} handleRemoveItem={handleRemoveItem} />
            )
        )
      ) : <h1 style={{color: 'red', textAlign: 'center' , marginTop: 100, fontSize: 20}} >WishList is empty</h1>}
    </Box>
  );
};

export default WishListComponent;
