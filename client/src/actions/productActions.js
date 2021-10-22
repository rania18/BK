import * as api from '../api/index.js';

import { 
    LIST_PRODUCTS,
    ONE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    END_LOADING_PRODUCT,
    START_LOADING_PRODUCT,
    ONE_PRODUCT_LOADING,
    ONE_PRODUCT_END_LOADING,
} from '../constants/actionTypes';

export const getProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: ONE_PRODUCT_LOADING });
      const { data: { data } } = await api.fetchProduct(id);
      dispatch({ type: ONE_PRODUCT, payload: { data } });
      dispatch({ type: ONE_PRODUCT_END_LOADING });
    } catch (error) {
      console.log(error);
    }
};
  
export const getProducts = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_PRODUCT });
      const { data: { data } } = await api.fetchProducts();
      dispatch({ type: LIST_PRODUCTS, payload: { data } });
      dispatch({ type: END_LOADING_PRODUCT });
    } catch (error) {
      console.log(error);
    }
  };

export const createProduct = (product, history) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_PRODUCT });
      const { data } = await api.createProduct(product);
      dispatch({ type: CREATE_PRODUCT, payload: data });
      dispatch({ type: END_LOADING_PRODUCT });
    } catch (error) {
      console.log(error);
    }
  };
  
export const updateProduct = (id, product) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PRODUCT });
        const { data } = await api.updateProduct(id, product);
        dispatch({ type: UPDATE_PRODUCT, payload: data });
        dispatch({ type: END_LOADING_PRODUCT });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
      await api.deleteProduct(id);
      dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (error) {
      console.log(error);
    }
  };