import axios from 'axios';
import { SHOP_DETAILS_FAIL, SHOP_DETAILS_REQUEST, SHOP_DETAILS_SUCCESS } from '../constants/shopConstants';

export const DetailsShop = () => async (dispatch) => {
    dispatch({
        type: SHOP_DETAILS_REQUEST
    });
    try {
        const { data } = await axios.get('/api/shop');
        dispatch({
            type: SHOP_DETAILS_SUCCESS, payload: data 
        });
    } catch(error) {
        dispatch({
            type: SHOP_DETAILS_FAIL, payload: error.message 
        });
    }
};