/* eslint-disable no-console, no-unused-vars */
// The middleware to call the API for quotes
import { CALL_API } from '../middleware/api';
import 'whatwg-fetch';
import { config } from '../config';

import * as actions from '../constants/actionTypes';

// Call items
function requestCall(indexId, position) {
    return {
        type: actions.SKILL_REQUEST,
        indexId: indexId,
        position: position,
        isFetching: true
    };
}

function receiveCall(call, indexId, position) {
    return {
        type: actions.SKILL_SUCCESS,
        indexId: indexId,
        position: position,
        isFetching: false,
        data: call
    };
}

function failCall(message) {
    return {
        type: actions.SKILL_FAILURE,
        isFetching: false,
        message: message
    };
}

function callNotFound(collectionInfo) {
    return {
        type: actions.SKILL_NOFOUND,
        isFetching: false,
        data:collectionInfo
    };
}

export function callSmith(requestvars) {
    console.log('call smith ');
    console.log(requestvars);
    let requestConfig = {
        method: 'POST'
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestCall(requestvars.indexId, requestvars.position));
        return fetch(config.baseUrl + '/call/invoke/' + requestvars.requestedUserRef, requestConfig)
            .then(response =>
                response.json()
                    .then(call => ({ call, response }))
            ).then(({ call, response }) => {

                // Profile look up ok
                dispatch(receiveCall(call, requestvars.indexId, requestvars.position));
            })
            .catch(err => {
                if (404 === err.realStatusCode) {
                    dispatch(callNotFound(err));
                } else {
                    dispatch(failCall('Could not call this user'));
                }
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
