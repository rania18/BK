/* eslint-disable import/no-anonymous-default-export */
import { SHOP_DETAILS_FAIL, SHOP_DETAILS_REQUEST, SHOP_DETAILS_SUCCESS } from "../constants/shopConstants";

export default (state = { loading: true, details: {} }, action) => {
    switch(action.type){
        case SHOP_DETAILS_REQUEST:
            return {loading: true};
        case SHOP_DETAILS_SUCCESS:
            return {loading: false, details: action.payload};
        case SHOP_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}