import { ReactNode, createContext, useState } from "react";
import React from "react";
import { ICartType, ProductType } from "../types/types";
import { Context } from "./Context";

interface IAppProps {}

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const updateProductList = (newValue: ProductType[]) => {
    setProductList(newValue);
  };

  const [mainList, setMainList] = useState<ProductType[]>([]);
  const updateMainList = (newValue: ProductType[]) => {
    setMainList(newValue);
  };

  const [wishList, setWishList] = useState<number[]>([]);
  const updateWishList = (newValue: number[]) => {
    setWishList(newValue);
  };

  const [category, setCategory] = useState<string[]>([]);
  const updateCategory = (newValue: string[]) => {
    setCategory(newValue);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const updateCurrentPage = (newValue: number) => {
    setCurrentPage(newValue);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const updateLoading = (newValue: boolean) => {
    setLoading(newValue);
  };

  const [cart, setCart] = useState<ICartType[]>([]);
  const updateCart = (newValue: ICartType[]) => {
    setCart(newValue);
  };

  const [search, setSearch] = useState<string>("");
  const updateSearch = (newValue: string) => {
    setSearch(newValue);
  }

  const [check, setCheck] = useState<boolean>(false);
  const updateCheck = (newValue: boolean) => {
    setCheck(newValue);
  }

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const updateSelectedCategory = (newValue: string) => {
    setSelectedCategory(newValue);
  }

  return (
    <Context.Provider
      value={{
        productList,
        updateProductList,
        category,
        updateCategory,
        currentPage,
        updateCurrentPage,
        loading,
        updateLoading,
        cart,
        updateCart,
        search,
        updateSearch,
        mainList,
        updateMainList,
        wishList,
        updateWishList,
        check,
        updateCheck,
        selectedCategory,
        updateSelectedCategory
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
