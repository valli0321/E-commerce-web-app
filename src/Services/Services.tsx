import axios from "axios";

export const getProducts = async () => {
   return await axios.get('https://fakestoreapi.com/products/');
}

export const getCategories = async () => {
    return await axios.get('https://fakestoreapi.com/products/categories');
}

