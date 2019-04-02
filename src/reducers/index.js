import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profileReducer';
import skills from './skillReducer';
import { userReducer, getUserData } from './userReducer';
import industry from './industryReducer';
import vocation from './vocationReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    auth,
    user: userReducer,
    getUserData,
    skills,
    profile,
    industry,
    vocation,
    routing: routerReducer
});

export default rootReducer;
