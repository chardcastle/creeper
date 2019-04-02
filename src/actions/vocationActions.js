/* eslint-disable no-console, no-unused-vars */
// The middleware to call the API for quotes
import { CALL_API } from '../middleware/api';
import 'whatwg-fetch';
import { config } from '../config';
import * as constants from './../constants';
import * as actionTypes from './../constants/actionTypes';

// VOCATION UPDATE
function invalidateUser() {
    return {
        type: actionTypes.USER_INVALIDATED
    };
}
function requestIndustryList() {
    return {
        type: actionTypes.LIST_INDUSTRIES_REQUEST,
        isFetching: true
    };
}

// Takes amended user object with updated vocation
function receiveIndustryList(industries) {
    return {
        type: actionTypes.LIST_INDUSTRIES_SUCCESS,
        isFetching: false,
        data: industries
    };
}

function failIndustryList(message) {
    return {
        type: actionTypes.LIST_INDUSTRIES_FAILURE,
        isFetching: false,
        message: message
    };
}

// VOCATION UPDATE
function requestVocationUpdate() {
    return {
        type: actionTypes.VOCATION_UPDATE_REQUEST,
        isFetching: true
    };
}

// Takes amended user object with updated vocation
// @todo Mash the vocation into the user within store
function receiveVocationUpdate(user) {
    return {
        type: actionTypes.VOCATION_UPDATE_SUCCESS,
        isFetching: false,
        user: user
    };
}

function invalidateVocationUpdate(errors) {
    return {
        type: actionTypes.VOCATION_UPDATE_INVALID,
        isFetching: false,
        errors: errors
    };
}

function failVocationUpdate(message) {
    return {
        type: actionTypes.VOCATION_UPDATE_FAILURE,
        isFetching: false,
        message: message
    };
}

/**
 * Get a list of industries
 *
 */
export function getIndustries() {

    let requestConfig = {
        method: constants.METHOD_GET
    };

    return dispatch => {
        dispatch(requestIndustryList());
        return fetch(config.baseUrl + '/industries/', requestConfig)
            .then(response =>
                response.json()
                    .then(industries => ({ industries, response }))
            ).then(({ industries, response }) =>  {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(failIndustryList(industries.message));
                    return Promise.reject(industries);
                } else {
                    // Dispatch the success action
                    // The profiles can be logged
                    dispatch(receiveIndustryList(industries));
                }
            }).catch(err => {
                dispatch(failIndustryList("Problems making contact with server"));
            });
    };
}

/**
 * Update users vocation data
 *
 */
export function updateVocation(vocationData) {
    console.log('sending vocation ' + JSON.stringify(vocationData));
    let requestConfig = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vocationData)
    };

    let requestUrl = config.baseUrl + '/user/' + vocationData.user_id + '/vocation/';

    return dispatch => {
        dispatch(requestVocationUpdate());
        return fetch(requestUrl, requestConfig)
            .then(response =>
                response.json()
                    .then(vocation => ({vocation, response}))
            ).then(({vocation, response}) => {
                if (false === vocation.isOk) {
                    console.log('failed validation');
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(invalidateVocationUpdate(vocation.errors));
                    // Rejecting bumps
                    // return Promise.reject(vocation);
                } else {
                    // Dispatch the success action
                    // The profiles can be logged
                    dispatch(receiveVocationUpdate(vocation));
                }
            }).catch(err => {
                dispatch(failVocationUpdate(err.message));
            });
    };
}

/**
 * Example of being abole to make a call in this way
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
