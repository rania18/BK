import { END_LOADING_SHOP, LIST_SHOPS, START_LOADING_SHOP } from "../constants/actionTypes";

const shopreducers = (state = { ShopsIsLoading: true, shops: [] }, action) => {
    switch (action.type) {
        case START_LOADING_SHOP:
            return { ...state, ShopsIsLoading: true };
        case END_LOADING_SHOP:
            return { ...state, ShopsIsLoading: false };
        case LIST_SHOPS:
            return { ...state, shops: action.payload };
        default:
        return state;
    }
  };

  export default shopreducers;