import * as api from '../api/index.js';

import { 
    LIST_CATEGORIES,
    ONE_CATEGORY,
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    END_LOADING_CATEGORY,
    START_LOADING_CATEGORY,
    ONE_CATEGORY_LOADING,
    ONE_CATEGORY_END_LOADING,
} from '../constants/actionTypes';

export const getCategory = (id) => async (dispatch) => {
    try {
      dispatch({ type: ONE_CATEGORY_LOADING });
      const  { data } = await api.fetchCategory(id);
      dispatch({ type: ONE_CATEGORY, payload: data });
      dispatch({ type: ONE_CATEGORY_END_LOADING });
    } catch (error) {
      console.log(error);
    }
};
  
export const getCategories = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_CATEGORY });
      const { data } = await api.fetchCategories();
      dispatch({ type: LIST_CATEGORIES, payload: data });
      dispatch({ type: END_LOADING_CATEGORY });
    } catch (error) {
      console.log(error);
    }
  };

export const createCategory = (category) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_CATEGORY });
      const { data } = await api.createCategory(category);
      dispatch({ type: CREATE_CATEGORY, payload: data });
      dispatch({ type: END_LOADING_CATEGORY });
    } catch (error) {
      console.log(error);
    }
  };
  
export const updateCategory = (id, category) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_CATEGORY });
        const { data } = await api.updateCategory(id, category);
        dispatch({ type: UPDATE_CATEGORY, payload: data });
        dispatch({ type: END_LOADING_CATEGORY });
    } catch (error) {
        console.log(error);
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
      await api.deleteCategory(id);
      dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
      console.log(error);
    }
  };