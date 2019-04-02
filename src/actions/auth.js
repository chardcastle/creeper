/* eslint-disable no-console, no-unused-vars */
// The middleware to call the API for quotes
import {CALL_API} from '../middleware/api';

// There are three possible states for our login
// process and we need actions for each of them
import { config } from './../config';
import * as constants from './../constants';
import * as actionTypes from './../constants/actionTypes';
import { browserHistory } from 'react-router';

function reset() {
    return {
        type: actionTypes.AUTH_DEFAULT
    };
}

// LOGIN
function requestLogin(creds) {
    return {
        type: actionTypes.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    };
}

function receiveLogin(user) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    };
}

function loginFailure(message) {
    return {
        type: actionTypes.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        serverError: message
    };
}

function loginInvalid(errors) {
    return {
        type: actionTypes.LOGIN_INVALID,
        isFetching: false,
        isAuthenticated: false,
        errors: errors
    };
}

// REGISTER
function requestRegistration(details) {
    return {
        type: actionTypes.REGISTER_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        details
    };
}

function recievedRegistration(user) {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    };
}

function failedRegistration(message) {
    return {
        type: actionTypes.REGISTER_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        serverError: message
    };
}

function invalidRegistration(errors) {
    return {
        type: actionTypes.REGISTER_INVALID,
        isFetching: false,
        isAuthenticated: false,
        errors: errors
    };
}

// PASSWORD FORGOTTEN
function requestPasswordForgotten(creds) {
    return {
        type: actionTypes.FORGOTTEN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    };
}

function receivePasswordForgotten(response) {
    return {
        type: actionTypes.FORGOTTEN_SUCCESS,
        isFetching: false,
        response: response
    };
}

function failedPasswordForgotten(message) {
    return {
        type: actionTypes.FORGOTTEN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        serverError: message
    };
}

// PASSWORD RESET
function requestPasswordReset(creds) {
    return {
        type: actionTypes.RESET_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    };
}

function receivePasswordReset() {
    return {
        type: actionTypes.RESET_SUCCESS,
        isFetching: false,
    };
}

function failPasswordReset(message) {
    return {
        type: actionTypes.RESET_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        serverError: message
    };
}

// LOGOUT
function requestLogout() {
    return {
        type: actionTypes.LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    };
}

function receiveLogout() {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    };
}

function requestApplication(details) {
    return {
        type: actionTypes.APPLICATION_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        details
    };
}

function recievedApplication(user) {
    return {
        type: actionTypes.APPLICATION_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
    };
}

function failedApplication(message) {
    return {
        type: actionTypes.APPLICATION_FAILED,
        isFetching: false,
        isAuthenticated: false,
        serverError: message
    };
}

function invalidApplication(errors) {
    return {
        type: actionTypes.APPLICATION_INVALID,
        isFetching: false,
        isAuthenticated: false,
        errors: errors
    };
}

/**
 * User login method
 * @todo  Add configuration
 *
 * Calls the API to get a token and
 * dispatches actions along the way
 */
export function loginUser(creds) {

    let requestConfig = {
        method: constants.METHOD_POST,
        headers: {
            'Content-Type': constants.APPLICATION_JSON
        },
        body: JSON.stringify(creds)
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));
        return fetch(config.baseUrl + '/login', requestConfig)
            .then(response =>
                response.json()
                    .then(user => ({user, response}))
            ).then(({user, response}) => {
                if (typeof user.errors !== 'undefined') {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(loginInvalid(user.errors));
                    // return Promise.reject(user);
                }
                else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('id_token', user.token);
                    localStorage.setItem('csrf_token', user.csrf_token);
                    localStorage.setItem('user_id', user.reference);

                    // Dispatch the success action
                    dispatch(receiveLogin(user));
                }
            }).catch(err => {
                dispatch(loginFailure("Couldn't connect to login service"));
            });
    };
}

/**
 * User registration method
 * @todo  Add configuration
 *
 * Calls the API to get a token and
 * dispatches actions along the way
 */
export function registerUser(details) {

    let requestConfig = {
        method: constants.METHOD_POST,
        headers: {'Content-Type': constants.APPLICATION_JSON},
        body: JSON.stringify(details)
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestRegistration(details));
        return fetch(config.baseUrl + '/user/', requestConfig)
            .then(response =>
                response.json()
                    .then(registration => ({registration, response}))
            ).then(({registration, response}) => {
                if (typeof registration.errors !== 'undefined') {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(invalidRegistration(registration.errors));
                    // return Promise.reject(user);
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('id_token', registration.token);
                    localStorage.setItem('csrf_token', registration.csrf_token);
                    localStorage.setItem('user_id', registration.reference);

                    // Dispatch the success action
                    dispatch(recievedRegistration(registration));
                }
            }).catch(err => {
                dispatch(failedRegistration("Couldn't connect to login service"));
            });
    };
}

/**
 * Request password reset
 * Takes a users email address as the
 * first part of a password reset process
 * @param  {object} creds Contains form data
 * @return {object}       Dispatch object
 */
export function passwordForgotten(creds) {

    if (creds.email.length <= 0) {
        return dispatch => {
            dispatch(failedPasswordForgotten("Please provide an email address"));
        };
    }

    let requestConfig = {
        method: constants.METHOD_POST,
        headers: {'Content-Type': constants.APPLICATION_X_WWW_FORM_URLENCODED},
        body: `email=${creds.email}`
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestPasswordForgotten(creds));
        return fetch(config.baseUrl + '/password/email/', requestConfig)
            .then(response =>
                response.json()
                    .then(user => ({user, response}))
            ).then(({user, response}) => {
                // Dispatch the success action
                dispatch(receivePasswordForgotten(response));

            }).catch(err => {
                dispatch(failedPasswordForgotten("Couldn't start password reset process"));
            });
    };
}

/**
 * Request password reset
 * Takes a users email address as the
 * first part of a password reset process
 * @param  {object} creds Contains form data
 * @return {object}       Dispatch object
 */
export function passwordReset(creds) {

    if (creds.token.length <= 0) {
        return dispatch => {
            dispatch(requestPasswordReset("Please provide an email address"));
        };
    }

    let requestConfig = {
        method: constants.METHOD_POST,
        headers: {'Content-Type': constants.APPLICATION_X_WWW_FORM_URLENCODED},
        body: `token=${creds.token}&email=${creds.email}&password=${creds.password}&password_confirmation=${creds.password_confirmation}`
    };

    return dispatch => {
        dispatch(requestPasswordReset(creds));
        return fetch(config.baseUrl + '/password/reset/', requestConfig)
            .then(response =>
                response.json()
                    .then(user => ({user, response}))
            ).then(({user, response}) => {
                // Dispatch the success action
                dispatch(receivePasswordReset(user));

            }).catch(err => {
                dispatch(failPasswordReset("Couldn't start password reset process"));
            });
    };
}


// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('id_token');
        localStorage.removeItem('csrf_token');
        browserHistory.push('/');
        dispatch(receiveLogout());
    };
}

// Method to call to reset page states
export function resetAuth() {
    return dispatch => {
        dispatch(reset());
    };
}

export function apply(details){
    const apply_url = config.baseUrl + '/apply';
    let requestConfig = {
        method: constants.METHOD_POST,
        headers: {'Content-Type': constants.APPLICATION_JSON},
        body: JSON.stringify(details)
    };
    return dispatch => {
        dispatch(requestApplication(details));
        return fetch(apply_url, requestConfig)
            .then(response =>
                response.json()
                    .then(application => ({application, response}))
            )
            .then(({application, response}) => {
                if (typeof application.errors !== 'undefined') {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(invalidApplication(application.errors));
                } else {
                    // Dispatch the success action
                    dispatch(recievedApplication(application));
                }
            }).catch(err => {
                dispatch(failedApplication(err));
            });
    };
}
