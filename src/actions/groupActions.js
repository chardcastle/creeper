/* eslint-disable no-console, no-unused-vars */
// The middleware to call the API for quotes
import { CALL_API } from '../middleware/api';
import 'whatwg-fetch';
import { config } from '../config';
import * as constants from './../constants';
import * as actionTypes from './../constants/actionTypes';


// USER
function invalidateGroup() {
    return {
        type: actionTypes.USER_INVALIDATED
    };
}

function requestGroup(requestVars) {
    return {
        type: actionTypes.GROUP_GET_REQUEST,
        requestVars: requestVars,
        isFetching: true,
        group: false
    };
}

function receiveGroup(requestVars, group) {
    return {
        type: actionTypes.GROUP_GET_SUCCESS,
        requestVars: requestVars,
        isFetching: false,
        group: group
    };
}

function failGroup(requestVars, message) {
    return {
        type: actionTypes.USER_GET_FAILURE,
        isFetching: false,
        requestVars: requestVars,
        message: message,
        group: false
    };
}

// USER UPDATE
function requestGroupUpdate(requestVars) {
    return {
        type: actionTypes.USER_UPDATE_REQUEST,
        requestVars: requestVars,
        isFetching: true
    };
}

function receiveGroupUpdate(requestVars, groups) {
    return {
        type: actionTypes.USER_UPDATE_SUCCESS,
        isFetching: false,
        requestVars: requestVars,
        groups: groups
    };
}

function failGroupUpdate(requestVars, message) {
    return {
        type: actionTypes.USER_UPDATE_FAILURE,
        isFetching: false,
        requestVars: requestVars,
        message: message
    };
}


// Calls the API to update a groups profile
// dispatches actions along the way
export function getGroup(requestVars) {

    let requestHeaders = {
        method: constants.METHOD_GET
    };

    return dispatch => {
        dispatch(requestGroup(requestVars));
        return fetch(config.baseUrl + '/group/' + requestVars.groupId + '/', requestHeaders)
            .then(response =>
                response.json()
                    .then(group => ({ group, response }))
            ).then(({ group, response }) =>  {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(failGroup(requestVars, group.message));
                    return Promise.reject(group);
                } else {
                    // Dispatch the success action
                    // The profiles can be logged
                    dispatch(receiveGroup(requestVars, group));
                }
            }).catch(err => {
                dispatch(failGroup(requestVars, "Problems making contact with server"));
            });
    };
}

// Calls the API to update a groups profile
// dispatches actions along the way
export function updateGroup(requestVars) {

    let requestHeaders = {
        method: constants.METHOD_POST,
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestVars)
    };

    let requestUrl = config.baseUrl + '/group/' + requestVars.group_id + '?token=' +  localStorage.getItem('id_token');

    return dispatch => {
        dispatch(requestGroupUpdate(requestVars));
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
                        dispatch(failGroupUpdate(profile.errors));
                        // Still not clear if we should return here :-/
                        // return Promise.reject(profile);
                    } else {
                        // Dispatch the success action
                        // The profiles can be logged
                        dispatch(receiveGroupUpdate(requestVars, profile));
                    }
                }).catch(err => {
                    // If the message is 'Failed to fetch'
                    if (err.message.indexOf('Failed to fetch') === 0) {
                        dispatch(failGroupUpdate('Access denied'));
                    } else {
                        dispatch(failGroupUpdate(err.message));
                    }
                });
        } catch (e) {
            dispatch(failGroupUpdate(e));
        }
    };
}

/**
 * See if we should update the group
 * 
 */
function shouldFetchGroup(state)
{
    const group = state.group;

    if (!group.group) {
        return true;
    } else if (group.isFetching) {
        return false;
    } else {
        return group.didInvalidate;
    }
}

/**
 * Called on component did mount to init data
 * Called on component will recieve props to make sure 
 * the fetched data is the same as the state
 */
export function fetchGroupIfNeeded(requestVars) {
    return (dispatch, getState) => {
        if (shouldFetchGroup(getState())) {
            return dispatch(getGroup(requestVars));
        }
    };
}

