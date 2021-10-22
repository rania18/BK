import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import product from './products';
import project from './project';
import blog from './blog';
import category from './category';
import slider from './sliders';
import instagram from './instagram';
import shop from './shop';


export const reducers = combineReducers({ auth, users, product, project, blog, category, slider, instagram, shop  });
