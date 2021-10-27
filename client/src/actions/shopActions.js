import * as api from '../api/index.js';

import { 
    LIST_SHOPS,
    END_LOADING_SHOP,
    START_LOADING_SHOP,
} from '../constants/actionTypes';


export const getShops = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_SHOP });
      const  { data }  = await api.fetchShops();
      dispatch({ type: LIST_SHOPS, payload:  data });
      dispatch({ type: END_LOADING_SHOP });
    } catch (error) {
      console.log(error);
    }
  };
