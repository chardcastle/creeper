/* eslint-disable no-unused-vars */
import * as actionTypes from './../constants/actionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function vocationReducer(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
      case actionTypes.VOCATION_UPDATE_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              isSuccess: false,
              isFailed: false,
              isAuthenticated: false
          });
      case actionTypes.VOCATION_UPDATE_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isSuccess: true,
              isInvalid: false,
              isFailed: false
          });
      case actionTypes.VOCATION_UPDATE_INVALID:
          return Object.assign({}, state, {
              isFetching: false,
              isSuccess: false,
              isInvalid: true,
              isFailed: false,
              errors: action.errors
          });
      case actionTypes.VOCATION_UPDATE_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isSuccess: false,
              isInvalid: false,
              isFailed: true,
              systemError: action.message
          });
    default:
      return state;
    }
}