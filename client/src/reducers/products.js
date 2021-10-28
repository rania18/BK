

import { LIST_PRODUCTS, ONE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, END_LOADING_PRODUCT, START_LOADING_PRODUCT, ONE_PRODUCT_LOADING, ONE_PRODUCT_END_LOADING } from "../constants/actionTypes";

const productReducers = (state = { OneProductIsLoading: true, ProductsIsLoading: true, products: [], product: {} }, action) => {
    switch (action.type) {
        case START_LOADING_PRODUCT:
            return { ...state, ProductsIsLoading: true };
        case END_LOADING_PRODUCT:
            return { ...state, ProductsIsLoading: false };
        case LIST_PRODUCTS:
            return { ...state, products: action.payload };
        case ONE_PRODUCT:
         return { ...state, product: action.payload };
        case CREATE_PRODUCT:
            return { ...state, products: [...state.products, action.payload ] };
        case UPDATE_PRODUCT:
            return { ...state, products: state.products.map((product) => (product._id === action.payload._id ? action.payload : product)) };
        case DELETE_PRODUCT:
            return { ...state, products: state.products.filter((product) => product._id !== action.payload) };
        case ONE_PRODUCT_LOADING:
            return { ...state, OneProductIsLoading: true };
        case ONE_PRODUCT_END_LOADING:
            return { ...state, OneProductIsLoading: false };
      default:
        return state;
    }
  };

  export default productReducers;