import * as api from '../api/index.js';

import { 
    LIST_INSTAGRAMS,
    ONE_INSTAGRAM,
    ONE_INSTAGRAM_LOADING,
    ONE_INSTAGRAM_END_LOADING,
    END_LOADING_INSTAGRAM,
    START_LOADING_INSTAGRAM,
} from '../constants/actionTypes';

export const getInstagram = (id) => async (dispatch) => {
    try {
      dispatch({ type: ONE_INSTAGRAM_LOADING });
      const { data: { data } } = await api.fetchInstagram(id);
      dispatch({ type: ONE_INSTAGRAM, payload: { data } });
      dispatch({ type: ONE_INSTAGRAM_END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const getInstagrams = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_INSTAGRAM });
      const  { data }  = await api.fetchInsatgrams();
      dispatch({ type: LIST_INSTAGRAMS, payload:  data });
      dispatch({ type: END_LOADING_INSTAGRAM });
    } catch (error) {
      console.log(error);
    }
  };
