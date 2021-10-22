/* eslint-disable import/no-anonymous-default-export */
import { CATEGORY_ADD_FAIL, CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS, CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_EDIT_FAIL, CATEGORY_EDIT_REQUEST, CATEGORY_EDIT_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_REMOVE_FAIL, CATEGORY_REMOVE_REQUEST, CATEGORY_REMOVE_SUCCESS } from "../constants/categoryConstants";

export default (state = { loading: true, categories: [] }, action) => {
    switch(action.type){
        case CATEGORY_LIST_REQUEST:
            return {loading: true};
        case CATEGORY_LIST_SUCCESS:
            return {loading: false, categories: action.payload};
        case CATEGORY_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const categoryDetailsReducer = (state = { loading: true, details: [] }, action) => {
    switch(action.type){
        case CATEGORY_DETAILS_REQUEST:
            return {loading: true};
        case CATEGORY_DETAILS_SUCCESS:
            return {loading: false, details: action.payload};
        case CATEGORY_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const categoryAddReducer = (state = { loadingAdd: false, feedback: '' }, action) => {
    switch(action.type){
        case CATEGORY_ADD_REQUEST:
            return {loadingAdd: true};
        case CATEGORY_ADD_SUCCESS:
            return {loadingAdd: false, feedback: action.payload};
        case CATEGORY_ADD_FAIL:
            return {loadingAdd: false, errorAdd: action.payload};
        default:
            return state;
    }
}

export const categoryEditReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case CATEGORY_EDIT_REQUEST:
            return {loadingEdit: true};
        case CATEGORY_EDIT_SUCCESS:
            return {loadingEdit: false, feedback: action.payload};
        case CATEGORY_EDIT_FAIL:
            return {loadingEdit: false, errorEdit: action.payload};
        default:
            return state;
    }
}

export const categoryRemoveReducer = (state = { feedback: '' }, action) => {
    switch(action.type){
        case CATEGORY_REMOVE_REQUEST:
            return {loadingRemove: true};
        case CATEGORY_REMOVE_SUCCESS:
            return {loadingRemove: false, feedback: action.payload};
        case CATEGORY_REMOVE_FAIL:
            return {loadingRemove: false, errorRemove: action.payload};
        default:
            return state;
    }
}