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
      case actionTypes.LIST_INDUSTRIES_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              isAuthenticated: false
          });
      case actionTypes.LIST_INDUSTRIES_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isSuccess: true,
              isFailed: false,
              data: action.data
          });
      case actionTypes.LIST_INDUSTRIES_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isSuccess: false,
              isFailed: true,
              data: undefined,
              systemError: action.message
          });
    default:
      return state;
    }
}