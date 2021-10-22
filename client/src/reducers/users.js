/* eslint-disable import/no-anonymous-default-export */
// import { USER_SIGNIN_FAIL, 
//         USER_SIGNIN_REQUEST, 
//         USER_SIGNIN_SUCCESS, 
//         USER_SIGNOUT, 
//         USER_LIST_REQUEST, 
//         USER_LIST_SUCCESS, 
//         USER_LIST_FAIL, 
//         USER_DETAILS_REQUEST,
//         USER_DETAILS_SUCCESS,
//         USER_DETAILS_FAIL, 
//         USER_ADD_REQUEST, 
//         USER_ADD_SUCCESS,
//         USER_ADD_FAIL,
//         USER_EDIT_REQUEST,
//         USER_EDIT_SUCCESS,
//         USER_EDIT_FAIL,
//         USER_REMOVE_REQUEST,
//         USER_REMOVE_SUCCESS,
//         USER_REMOVE_FAIL,
//      } from "../constants/userConstants";

// export const userSigninReducer = (state = {}, action) => {
//     switch (action.type) {
//         case USER_SIGNIN_REQUEST:
//             return { loading: true };
//         case USER_SIGNIN_SUCCESS:
//             return { loading: false, userInfo: action.payload };
//         case USER_SIGNIN_FAIL:
//             return { loading: false, error: action.payload };
//         case USER_SIGNOUT:
//             return {}
//         default:
//             return state;
//     }
// }

// export const userListReducer = (state = { loading: true, users: [] }, action) =>{
//     switch(action.type){
//         case USER_LIST_REQUEST:
//             return {loading: true};
//         case USER_LIST_SUCCESS:
//             return {loading: false, users: action.payload};
//         case USER_LIST_FAIL:
//             return {loading: false, error: action.payload};
//         default:
//             return state;
//     }
// }

// export const userDetailsReducer = (state = { loading: true, user: {} }, action) => {
//     switch(action.type){
//         case USER_DETAILS_REQUEST:
//             return {loading: true};
//         case USER_DETAILS_SUCCESS:
//             return {loading: false, user: action.payload};
//         case USER_DETAILS_FAIL:
//             return {loading: false, error: action.payload};
//         default:
//             return state;
//     }
// }

// export const userAddReducer = (state = { loadingAdd: false, feedback: '' }, action) => {
//     switch(action.type){
//         case USER_ADD_REQUEST:
//             return {loadingAdd: true};
//         case USER_ADD_SUCCESS:
//             return {loadingAdd: false, feedback: action.payload};
//         case USER_ADD_FAIL:
//             return {loadingAdd: false, errorAdd: action.payload};
//         default:
//             return state;
//     }
// }

// export const userEditReducer = (state = { feedback: '' }, action) => {
//     switch(action.type){
//         case USER_EDIT_REQUEST:
//             return {loadingEdit: true};
//         case USER_EDIT_SUCCESS:
//             return {loadingEdit: false, feedback: action.payload};
//         case USER_EDIT_FAIL:
//             return {loadingEdit: false, errorEdit: action.payload};
//         default:
//             return state;
//     }
// }

// export const userRemoveReducer = (state = { feedback: '' }, action) => {
//     switch(action.type){
//         case USER_REMOVE_REQUEST:
//             return {loadingRemove: true};
//         case USER_REMOVE_SUCCESS:
//             return {loadingRemove: false, feedback: action.payload};
//         case USER_REMOVE_FAIL:
//             return {loadingRemove: false, errorRemove: action.payload};
//         default:
//             return state;
//     }
// }

import { 
    CREATE_USER, 
    DELETE_USER, 
    END_LOADING_USER, 
    LIST_USERS, 
    PROFILE, 
    PROFILE_LOADING, 
    START_LOADING_USER, 
    UPDATE_USER, 
    EDIT_PROFILE 
} from "../constants/actionTypes";

export default (state = { UsersIsLoading: true, users: [], profile: {}, profileIsLoading: false }, action) => {
    switch (action.type) {
        case START_LOADING_USER:
            return { ...state, UsersIsLoading: true };
        case END_LOADING_USER:
            return { ...state, UsersIsLoading: false };
        case LIST_USERS:
            return { ...state, users: action.payload.data };
        case CREATE_USER:
            return { ...state, users: [...state.users, action.payload.user] };
        case UPDATE_USER:
            return { ...state, users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)) };
        case DELETE_USER:
            return { ...state, users: state.users.filter((user) => user._id !== action.payload) };
        case PROFILE:
            return { ...state, profile: action.payload.data, profileIsLoading : false};
        case PROFILE_LOADING:
            return { ...state, profileIsLoading: true}
        case EDIT_PROFILE:
            return { ...state, profile: action.payload.data, profileIsLoading: false };
      default:
        return state;
    }
  };