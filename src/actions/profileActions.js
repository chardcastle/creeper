/* eslint-disable no-console, no-unused-vars */
// The middleware to call the API for quotes
import { CALL_API } from '../middleware/api';
import 'whatwg-fetch';
import { config } from '../config';
import * as constants from './../constants/actionTypes';

// There are three possible states for our login
// process and we need actions for each of them
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

    isValid()
    {
        let userId = ('undefined' !== typeof this.userId);
        let token = ('undefined' !== typeof this.token);

        return (userId && token);
    }
}

// PROFILES
function requestProfiles(indexId, position) {
  return {
    type: constants.PROFILES_REQUEST,
    indexId: indexId,
    position: position,
    isFetching: true
  };
}

function receiveProfiles(profiles, indexId, position) {
  return {
    type: constants.PROFILES_SUCCESS,
    indexId: indexId,
    position: position,
    isFetching: false,
    data: profiles
  };
}

function failedProfiles(message) {
  return {
    type: constants.PROFILES_FAILURE,
    isFetching: false,
    message: message
  };
}

function notFoundProfiles(collectionInfo) {
    return {
        type: constants.PROFILES_NOFOUND,
        isFetching: false,
        data:collectionInfo
    };
}

// Calls the API to get a token and
// dispatches actions along the way
export function getProfiles(requestvars) {
  let requestConfig = {
    method: 'GET'
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestProfiles(requestvars.indexId, requestvars.position));
    return fetch(config.baseUrl + '/users/feed/' + requestvars.indexId, requestConfig)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) => {

          // Profile look up ok
          dispatch(receiveProfiles(user, requestvars.indexId, requestvars.position));
      })
      .catch(err => {
          if (404 === err.realStatusCode) {
              dispatch(notFoundProfiles(err));
          } else {
              dispatch(failedProfiles('Could not load this user'));
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
