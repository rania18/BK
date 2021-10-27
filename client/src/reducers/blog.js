import { END_LOADING_BLOG, LIST_BLOGS, ONE_BLOG, ONE_BLOG_END_LOADING, ONE_BLOG_LOADING, START_LOADING_BLOG } from "../constants/actionTypes";

const blogReducers = (state = { OneBlogIsLoading: true, BlogsIsLoading: true, blogs: [], blog: {} }, action) => {
    switch (action.type) {
        case START_LOADING_BLOG:
            return { ...state, BlogsIsLoading: true };
        case END_LOADING_BLOG:
            return { ...state, BlogsIsLoading: false };
        case ONE_BLOG_LOADING:
            return { ...state, OneBlogIsLoading: true };
        case ONE_BLOG_END_LOADING:
            return { ...state, OneBlogIsLoading: false };
        case LIST_BLOGS:
            return { ...state, blogs: action.payload };
        case ONE_BLOG:
            return { ...state, blog: action.payload.data };
        default:
        return state;
    }
  };

  export default blogReducers;