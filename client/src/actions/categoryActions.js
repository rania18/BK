import axios from "axios";

import { 
    CATEGORY_ADD_FAIL, 
    CATEGORY_ADD_REQUEST, 
    CATEGORY_ADD_SUCCESS, 
    CATEGORY_DETAILS_FAIL, 
    CATEGORY_DETAILS_REQUEST, 
    CATEGORY_DETAILS_SUCCESS, 
    CATEGORY_EDIT_FAIL, 
    CATEGORY_EDIT_REQUEST, 
    CATEGORY_EDIT_SUCCESS, 
    CATEGORY_LIST_FAIL, 
    CATEGORY_LIST_REQUEST, 
    CATEGORY_LIST_SUCCESS, 
    CATEGORY_REMOVE_FAIL, 
    CATEGORY_REMOVE_REQUEST,
    CATEGORY_REMOVE_SUCCESS} from "../constants/categoryConstants"

export const ListCategories = () => async (dispatch) => {
    dispatch({
        type: CATEGORY_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/categories');
        dispatch({
            type: CATEGORY_LIST_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: CATEGORY_LIST_FAIL, payload: error.message 
        });
    }
};

export const DetailsCategory = (categoryId) => async(dispatch) => {
    dispatch({
        type: CATEGORY_DETAILS_REQUEST, payload: categoryId
    });
    try {
        const { data } = await axios.get(`/api/categories/${categoryId}`);
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const AddCategory = (formData) => async(dispatch) => { 
    dispatch({
        type: CATEGORY_ADD_REQUEST, payload: formData
    });
    try {
        const { data } = await axios.post('/api/categories/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: CATEGORY_ADD_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_ADD_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const EditCategory = (formData) => async(dispatch) => { 
    dispatch({
        type: CATEGORY_EDIT_REQUEST, payload: formData
    });
    try {
        const { data } = await axios.post('/api/categories/edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: CATEGORY_EDIT_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_EDIT_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const RemoveCategory = (categoryId) => async(dispatch) => { 
    dispatch({
        type: CATEGORY_REMOVE_REQUEST, payload: categoryId
    });
    try {
        const { data } = await axios.delete(`/api/categories/${categoryId}`);
        dispatch({
            type: CATEGORY_REMOVE_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_REMOVE_FAIL, 
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}