import { END_LOADING_INSTAGRAM, LIST_INSTAGRAMS, ONE_INSTAGRAM, ONE_INSTAGRAM_END_LOADING, ONE_INSTAGRAM_LOADING, START_LOADING_INSTAGRAM } from "../constants/actionTypes";


const instagramReducers = (state = { OneInstagramIsLoading: true, InstagramsIsLoading: true, instagrams: [], instagram: {} }, action) => {
    switch (action.type) {
        case START_LOADING_INSTAGRAM:
            return { ...state, InstagramsIsLoading: true };
        case END_LOADING_INSTAGRAM:
            return { ...state, InstagramsIsLoading: false };
        case ONE_INSTAGRAM_LOADING:
            return { ...state, OneInstagramIsLoading: true };
        case ONE_INSTAGRAM_END_LOADING:
            return { ...state, OneInstagramIsLoading: false };
        case LIST_INSTAGRAMS:
            return { ...state, instagrams: action.payload };
        case ONE_INSTAGRAM:
            return { ...state, instagram: action.payload.data };
        default:
            return state;
    }
  };

  export default instagramReducers;