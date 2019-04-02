/* eslint-disable no-console, no-unused-vars */
// The middleware to call the API for quotes
import { CALL_API } from '../middleware/api';
import 'whatwg-fetch';
import { config } from '../config';

import * as constants from '../constants/actionTypes';

// Skill items
function requestSkill(indexId, position) {
    return {
        type: constants.SKILL_REQUEST,
        indexId: indexId,
        position: position,
        isFetching: true
    };
}

function receiveSkill(skill, indexId, position) {
    return {
        type: constants.SKILL_SUCCESS,
        indexId: indexId,
        position: position,
        isFetching: false,
        data: skill
    };
}

function skillError(message) {
    return {
        type: constants.SKILL_FAILURE,
        isFetching: false,
        message: message
    };
}

function skillNotFound(collectionInfo) {
    return {
        type: constants.SKILL_NOFOUND,
        isFetching: false,
        data:collectionInfo
    };
}
export function getSkillItem(requestvars) {
    let requestConfig = {
        method: 'GET'
    };

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestSkill(requestvars.indexId, requestvars.position));
        return fetch(config.baseUrl + '/skills/feed/' + requestvars.indexId, requestConfig)
            .then(response =>
                response.json()
                    .then(skill => ({ skill, response }))
            ).then(({ skill, response }) => {

                // Profile look up ok
                dispatch(receiveSkill(skill, requestvars.indexId, requestvars.position));
            })
            .catch(err => {
                if (404 === err.realStatusCode) {
                    dispatch(skillNotFound(err));
                } else {
                    dispatch(skillError('Could not load this user'));
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
