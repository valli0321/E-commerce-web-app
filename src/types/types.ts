interface RatingType{
    count: number;
    rate: number;
}

export interface ProductType {
    id: number;
    description: string;
    image: string;
    price: number;
    title: string;
    category: string;
    rating: RatingType;
}

export interface ICartType {
    id: number;
    quantity: number;
    totalPrice: number;
    price: number;
}



export type ContextType = {
    productList: ProductType[];
    updateProductList: (newValue: ProductType[]) => void;
    mainList: ProductType[];
    updateMainList: (newValue: ProductType[]) => void;
    category: string[];
    updateCategory: (newValue: string[]) => void;
    currentPage: number;
    updateCurrentPage: (newValue: number) => void;
    loading: boolean;
    updateLoading: (newValue: boolean) => void;
    cart: ICartType[];
    updateCart: (newValue: ICartType[]) => void;
    search: string;
    updateSearch: (newValue: string) => void;
    wishList: number[];
    updateWishList: (newValue: number[]) => void;
    check: boolean;
    updateCheck: (newValue: boolean) => void;
    selectedCategory: string;
    updateSelectedCategory: (newValue: string) => void;
}
