import * as React from "react";
import { ContextType } from "../types/types";
import { Context } from "../context/Context";
import { getCategories, getProducts } from "../Services/Services";
import ResponsiveAppBar from "./ResponsiveAppBar";
import ProductsPage from "../pages/ProductsPage";
import Cart from "./Cart";
import { BrowserRouter, Route, Link, Routes, Outlet } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CheckOut from "./CheckOut";
import WishListComponent from "./WishListComponent";

interface IMainProps {}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  const {
    productList,
    updateProductList,
    category,
    updateCategory,
    mainList,
    updateMainList,
  } = React.useContext(Context) as ContextType;

  React.useEffect(() => {
    getProducts()
      .then((response) => {
        updateProductList([...response.data]);
        updateMainList([...response.data]);
      })
      .catch((err) => console.log(err));

    getCategories()
      .then((response) => updateCategory(["All", ...response.data]))
      .catch((err) => console.log(err));
  }, []);

  console.log(mainList)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResponsiveAppBar />}>
          <Route index element={<LandingPage />} />
          <Route path="/productpage" element={<ProductsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/wishlist" element={<WishListComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
