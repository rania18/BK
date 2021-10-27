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

const userReducers = (state = { UsersIsLoading: true, users: [], profile: {}, profileIsLoading: false }, action) => {
    switch (action.type) {
        case START_LOADING_USER:
            return { ...state, UsersIsLoading: true };
        case END_LOADING_USER:
            return { ...state, UsersIsLoading: false };
        case LIST_USERS:
            return { ...state, users: action.payload };
        case CREATE_USER:
            return { ...state, users: [ ...state.users, action.payload ] };
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

  export default userReducers;