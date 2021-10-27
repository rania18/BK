import * as api from '../api/index.js';

import { 
    LIST_SLIDERS,
    END_LOADING_SLIDER,
    START_LOADING_SLIDER
} from '../constants/actionTypes';


export const getSliders = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_SLIDER });
      const  { data }  = await api.fetchSliders();
      dispatch({ type: LIST_SLIDERS, payload:  data });
      dispatch({ type: END_LOADING_SLIDER });
    } catch (error) {
      console.log(error);
    }
  };
