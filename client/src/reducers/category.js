
import { LIST_CATEGORIES, ONE_CATEGORY, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, END_LOADING_CATEGORY, START_LOADING_CATEGORY, ONE_CATEGORY_LOADING, ONE_CATEGORY_END_LOADING } from "../constants/actionTypes";

const categoryReducers = (state = { OneCategoryIsLoading: true, CategoriesIsLoading: true, categories: [], category: {} }, action) => {
    switch (action.type) {
        case START_LOADING_CATEGORY:
            return { ...state, CategoriesIsLoading: true };
        case END_LOADING_CATEGORY:
            return { ...state, CategoriesIsLoading: false };
        case ONE_CATEGORY_LOADING:
            return { ...state, OneCategoryIsLoading: true };
        case ONE_CATEGORY_END_LOADING:
            return { ...state, OneCategoryIsLoading: false };
        case LIST_CATEGORIES:
            return { ...state, categories: action.payload };
        case ONE_CATEGORY:
         return { ...state, category: action.payload };
        case CREATE_CATEGORY:
            return { ...state, categories: [ ...state.categories, action.payload ] };
        case UPDATE_CATEGORY:
            return { ...state, categories: state.categories.map((category) => (category._id === action.payload._id ? action.payload : category)) };
        case DELETE_CATEGORY:
            return { ...state, categories: state.categories.filter((category) => category._id !== action.payload) };
        default:
            return state;
    }
  };

  export default categoryReducers;