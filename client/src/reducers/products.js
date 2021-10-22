/* eslint-disable import/no-anonymous-default-export */
// /* eslint-disable import/no-anonymous-default-export */
// import { PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REMOVE_FAIL, PRODUCT_REMOVE_REQUEST, PRODUCT_REMOVE_SUCCESS } from "../constants/productConstants";

// export default(state = { loading: true, products: [] }, action) =>{
//     switch(action.type){
//         case PRODUCT_LIST_REQUEST:
//             return {loading: true};
//         case PRODUCT_LIST_SUCCESS:
//             return {loading: false, products: action.payload};
//         case PRODUCT_LIST_FAIL:
//             return {loading: false, error: action.payload};
//         default:
//             return state;
//     }
// }

// export const productDetailsReducer = (state = { loading: true, product: {} }, action) => {
//     switch(action.type){
//         case PRODUCT_DETAILS_REQUEST:
//             return {loading: true};
//         case PRODUCT_DETAILS_SUCCESS:
//             return {loading: false, product: action.payload};
//         case PRODUCT_DETAILS_FAIL:
//             return {loading: false, error: action.payload};
//         default:
//             return state;
//     }
// }

// export const productAddReducer = (state = { loadingAdd: false, feedback: '' }, action) => {
//     switch(action.type){
//         case PRODUCT_ADD_REQUEST:
//             return {loadingAdd: true};
//         case PRODUCT_ADD_SUCCESS:
//             return {loadingAdd: false, feedback: action.payload};
//         case PRODUCT_ADD_FAIL:
//             return {loadingAdd: false, errorAdd: action.payload};
//         default:
//             return state;
//     }
// }

// export const productEditReducer = (state = { feedback: '' }, action) => {
//     switch(action.type){
//         case PRODUCT_EDIT_REQUEST:
//             return {loadingEdit: true};
//         case PRODUCT_EDIT_SUCCESS:
//             return {loadingEdit: false, feedback: action.payload};
//         case PRODUCT_EDIT_FAIL:
//             return {loadingEdit: false, errorEdit: action.payload};
//         default:
//             return state;
//     }
// }

// export const productRemoveReducer = (state = { feedback: '' }, action) => {
//     switch(action.type){
//         case PRODUCT_REMOVE_REQUEST:
//             return {loadingRemove: true};
//         case PRODUCT_REMOVE_SUCCESS:
//             return {loadingRemove: false, feedback: action.payload};
//         case PRODUCT_REMOVE_FAIL:
//             return {loadingRemove: false, errorRemove: action.payload};
//         default:
//             return state;
//     }
// }



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
} from "../constants/actionTypes";

export default (state = { OneProductIsLoading: true, ProductsIsLoading: true, products: [], product: {} }, action) => {
    switch (action.type) {
        case START_LOADING_PRODUCT:
            return { ...state, ProductsIsLoading: true };
        case END_LOADING_PRODUCT:
            return { ...state, ProductsIsLoading: false };
        case LIST_PRODUCTS:
            return { ...state, products: action.payload.data };
        case ONE_PRODUCT:
         return { ...state, product: action.payload.data };
        case CREATE_PRODUCT:
            return { ...state, products: [...state.products, action.payload.product] };
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