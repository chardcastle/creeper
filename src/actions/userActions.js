/* eslint-disable no-console, no-unused-vars */
// The middleware to call the API for quotes
import { CALL_API } from '../middleware/api';
import 'whatwg-fetch';
import { config } from '../config';
import * as constants from './../constants';
// import jwtHelper from './../utils/jwtHelper';

import * as actionTypes from './../constants/actionTypes';

/**
 * User model
 * A freestyle ES6 class
 * @author Chris Hardcastle
 */
export class User
{
    constructor() {
        this.token = localStorage.getItem('id_token');
        this.userId = localStorage.getItem('user_id');
    }

    load(data) {
        this.values = data;
    }

    isValid()
    {
        let userId = ('undefined' !== typeof this.userId);
        let token = ('undefined' !== typeof this.token);

        return (userId && token);
    }

}


// USER
function invalidateUser() {
    return {
        type: actionTypes.USER_INVALIDATED
    };
}

function requestUser(requestVars) {
    return {
        type: actionTypes.USER_GET_REQUEST,
        requestVars: requestVars,
        isFetching: true,
        user: false
    };
}

function receiveUser(requestVars, user) {
    return {
        type: actionTypes.USER_GET_SUCCESS,
        requestVars: requestVars,
        isFetching: false,
        user: user
    };
}

function failUser(requestVars, message) {
    return {
        type: actionTypes.USER_GET_FAILURE,
        isFetching: false,
        requestVars: requestVars,
        message: message,
        user: false
    };
}

// USER UPDATE
function requestUserUpdate(requestVars) {
    return {
        type: actionTypes.USER_UPDATE_REQUEST,
        requestVars: requestVars,
        isFetching: true
    };
}

function receiveUserUpdate(requestVars, profile) {
    return {
        type: actionTypes.USER_UPDATE_SUCCESS,
        isFetching: false,
        requestVars: requestVars,
        profiles: profile
    };
}

function failUserUpdate(requestVars, message) {
    return {
        type: actionTypes.USER_UPDATE_FAILURE,
        isFetching: false,
        requestVars: requestVars,
        message: message
    };
}

// Calls the API to update a users profile
// dispatches actions along the way
export function getUser(requestVars) {
    // let jwtToken = localStorage.getItem('id_token');
    // if (!jwtToken) {
    //     // Bailout - nothing to do
    //     return dispatch => {};
    // }

    let requestHeaders = {
        method: constants.METHOD_GET,
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
            'Content-Type': constants.APPLICATION_JSON
        },
    };

    return dispatch => {
        dispatch(requestUser(requestVars));
        return fetch(config.baseUrl + '/user/' + requestVars.userId, requestHeaders)
            .then(response =>
                response.json()
                    .then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
                if (404 == response.status || 400 == response.status) {
                    return Promise.reject(user);
                } else if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(failUser(requestVars, user.message));
                    return Promise.reject(user);
                } else {
                    // Dispatch the success action
                    // The profiles can be logged
                    dispatch(receiveUser(requestVars, user));
                }
            }).catch(err => {
                console.log('failing user');
                dispatch(failUser(requestVars, "Problems making contact with server"));
            });
    };
}

// Calls the API to update a users profile
// dispatches actions along the way
export function updateUser(requestVars) {

console.log('Received ' + JSON.stringify(requestVars));
    delete requestVars['phoneNumber'];
    console.log('sending ' + JSON.stringify(requestVars));
    let requestHeaders = {
        method: constants.METHOD_POST,
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestVars)
    };

    let requestUrl = config.baseUrl + '/user/' + requestVars.user_id;

    return dispatch => {
        dispatch(requestUserUpdate(requestVars));
        try {
            return fetch(requestUrl, requestHeaders)
                .then(function(response) {
                    // Todo - Check preflight options request here
                    return response.json()
                        .then(profile => ({profile, response}));
                }).then(({profile, response}) => {
                    if (false === profile.isOk) {
                        // If there was a problem, we want to
                        // dispatch the error condition
                        dispatch(failUserUpdate(profile.errors));
                        // Still not clear if we should return here :-/
                        // return Promise.reject(profile);
                    } else {
                        // Dispatch the success action
                        // The profiles can be logged
                        dispatch(receiveUserUpdate(requestVars, profile));
                    }
                }).catch(err => {
                    // If the message is 'Failed to fetch'
                    if (err.message.indexOf('Failed to fetch') === 0) {
                        dispatch(failUserUpdate('Access denied'));
                    } else {
                        dispatch(failUserUpdate(err.message));
                    }
                });
        } catch (e) {
            dispatch(failUserUpdate(e));
        }
    };
}

/**
 * See if we should update the user
 * 
 */
function shouldFetchUser(state)
{
    const user = state.user;

    if (!user.user) {
        return true;
    } else if (user.isFetching) {
        return false;
    } else {
        return user.didInvalidate;
    }
}

/**
 * Called on component did mount to init data
 * Called on component will recieve props to make sure 
 * the fetched data is the same as the state
 */
export function fetchUserIfNeeded(requestVars) {
    return (dispatch, getState) => {
        if (shouldFetchUser(getState())) {
            return dispatch(getUser(requestVars));
        }
    };
}

/**
 * Example of being able to make a call in this way
 * instead as an alternative
 * 
 */
// export function fetchQuote() {
//   return {
//     [CALL_API]: {
//       endpoint: 'random-quote',
//       types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
//     }
//   };
// }
