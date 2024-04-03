import React, { useContext } from "react";
import { Context } from "../context/Context";
import { ContextType, ProductType, ICartType } from "../types/types";
import ProductCard from "./ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../pages/styles.css";
import { Pagination } from "@mui/material";

type Props = {};

const ProductsComponent: React.FC = (props: Props) => {
  const {
    productList,
    currentPage,
    updateCurrentPage,
    cart,
    updateCart,
    search,
    updateSearch,
  } = useContext(Context) as ContextType;

  

  const filteredSearchProducts: ProductType[] = productList.filter(
    (product: ProductType) =>
      product.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages =
    search.length > 0
      ? Math.ceil(filteredSearchProducts.length / 6)
      : Math.ceil(productList.length / 6);

  const startIndex = (currentPage - 1) * 6;

  const endIndex =
    search.length > 0
      ? Math.min(startIndex + 6, filteredSearchProducts.length)
      : Math.min(startIndex + 6, productList.length);

  const currentProducts =
    search.length > 0
      ? filteredSearchProducts.slice(startIndex, endIndex)
      : productList.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    updateCurrentPage(page);
  };

  return (
    <div className="product-page">
      <div className="d-flex products align-items-center justify-content-center gap-4 mt-3">
        {currentProducts.length > 0 ? currentProducts.map((product: ProductType) => (
          <ProductCard product={product}  />
        )) : <div className="mt-5 error" >Not Found!!!</div> }
      </div>
      {productList.length > 6 &&<div className="mt-3">
        <Pagination
          page={currentPage}
          count={totalPages}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
        />
      </div>}
    </div>
  );
};

export default ProductsComponent;