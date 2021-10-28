
import { END_LOADING_SLIDER, LIST_SLIDERS, START_LOADING_SLIDER } from '../constants/actionTypes'
const sliderReducers = (state = { SlidersIsLoading: true, sliders: [] }, action) => {
    switch (action.type) {
        case START_LOADING_SLIDER:
            return { ...state, SlidersIsLoading: true };
        case END_LOADING_SLIDER:
            return { ...state, SlidersIsLoading: false };
        case LIST_SLIDERS:
            return { ...state, sliders: action.payload, SlidersIsLoading: false };
        default:
        return state;
    }
  };

  export default sliderReducers;