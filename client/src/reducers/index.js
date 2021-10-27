import { combineReducers } from 'redux';

import authReducers from './auth';
import userReducers from './users';
import productReducers from './products';
import projectReducers from './project';
import blogReducers from './blog';
import categoryReducers from './category';
import sliderReducers from './sliders';
import instagramReducers from './instagram';
import shopreducers from './shop';


export const reducers = combineReducers({ auth: authReducers, users: userReducers, products: productReducers, projects: projectReducers, blog: blogReducers, categories: categoryReducers, slider: sliderReducers, instagram: instagramReducers, shop: shopreducers  });
