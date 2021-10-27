import * as api from '../api/index.js';

import { 
    LIST_PROJECTS,
    ONE_PROJECT,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    END_LOADING_PROJECT,
    START_LOADING_PROJECT,
    ONE_PROJECT_LOADING,
    ONE_PROJECT_END_LOADING
} from '../constants/actionTypes';

export const getProject = (id) => async (dispatch) => {
    try {
      dispatch({ type: ONE_PROJECT_LOADING });
      const { data: { data } } = await api.fetchProject(id);
      dispatch({ type: ONE_PROJECT, payload: { data } });
      dispatch({ type: ONE_PROJECT_END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const getProjects = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_PROJECT });
      const  { data }  = await api.fetchProjects();
      dispatch({ type: LIST_PROJECTS, payload:  data });
      dispatch({ type: END_LOADING_PROJECT });
    } catch (error) {
      console.log(error);
    }
  };

export const createProject = (product) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_PROJECT });
      const { data } = await api.createProject(product);
      dispatch({ type: CREATE_PROJECT, payload: data });
      dispatch({ type: END_LOADING_PROJECT });
    } catch (error) {
      console.log(error);
    }
  };
  
export const updateProject = (id, product) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT });
        const { data } = await api.updateProject(id, product);
        dispatch({ type: UPDATE_PROJECT, payload: data });
        dispatch({ type: END_LOADING_PROJECT });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProject = (id) => async (dispatch) => {
    try {
      await api.deleteProject(id);
      dispatch({ type: DELETE_PROJECT, payload: id });
    } catch (error) {
      console.log(error);
    }
  };