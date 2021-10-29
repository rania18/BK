import { LIST_PROJECTS, ONE_PROJECT, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, END_LOADING_PROJECT, START_LOADING_PROJECT, ONE_PROJECT_LOADING, ONE_PROJECT_END_LOADING } from "../constants/actionTypes";

const projectReducers = (state = { OneProjectIsLoading: false, ProjectsIsLoading: false, projects: [], project: {} }, action) => {
    switch (action.type) {
        case START_LOADING_PROJECT:
            return { ...state, ProjectsIsLoading: true };
        case END_LOADING_PROJECT:
            return { ...state, ProjectsIsLoading: false };
        case ONE_PROJECT_LOADING:
            return { ...state, OneProjectIsLoading: true };
        case ONE_PROJECT_END_LOADING:
            return { ...state, OneProjectIsLoading: false };
        case LIST_PROJECTS:
            return { ...state, projects: action.payload };
        case ONE_PROJECT:
         return { ...state, project: action.payload.data };
        case CREATE_PROJECT:
            return { ...state, projects: [...state.projects, action.payload.project] };
        case UPDATE_PROJECT:
            return { ...state, projects: state.projects.map((project) => (project._id === action.payload._id ? action.payload : project)) };
        case DELETE_PROJECT:
            return { ...state, projects: state.projects.filter((project) => project._id !== action.payload) };
      default:
        return state;
    }
  };

  export default projectReducers;