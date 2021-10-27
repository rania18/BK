import * as actionType from '../constants/actionTypes';

const authReducers = (state = { AuthIsLoading: false, authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH_LOADING:
      return { ...state, AuthIsLoading: true}
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, AuthIsLoading: false };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducers;
