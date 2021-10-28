import * as api from '../api/index.js';

import { 
    LIST_BLOGS,
    ONE_BLOG,
    ONE_BLOG_LOADING,
    ONE_BLOG_END_LOADING,
    END_LOADING_BLOG,
    START_LOADING_BLOG,
} from '../constants/actionTypes';

export const getBlog = (id) => async (dispatch) => {
    try {
      dispatch({ type: ONE_BLOG_LOADING });
      const { data: { data } } = await api.fetchBlog(id);
      dispatch({ type: ONE_BLOG, payload: { data } });
      dispatch({ type: ONE_BLOG_END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const getBlogs = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_BLOG });
      const  { data }  = await api.fetchBlogs();
      dispatch({ type: LIST_BLOGS, payload: data });
      dispatch({ type: END_LOADING_BLOG });
    } catch (error) {
      console.log(error);
    }
  };
