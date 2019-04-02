/* eslint-disable no-unused-vars */
import * as actionTypes from './../constants/actionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function groupReducer(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    didInvalidate: false
  }, action) {
  switch (action.type) {
      case actionTypes.GROUP_INVALIDATED:
          return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: true
          });
      case actionTypes.GROUP_GET_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              isAuthenticated: false
          });
      case actionTypes.GROUP_GET_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: true,
              isSuccess: true,
              isFailed: false,
              didInvalidate: false,
              data: action.group          
          });
      case actionTypes.GROUP_GET_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: false,
              isSuccess: false,
              isFailed: true,
              data: undefined,
              systemError: action.message
          });
      case actionTypes.GROUP_UPDATE_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              isAuthenticated: false
          });
      case actionTypes.GROUP_UPDATE_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: true,
              isUpdated: true,
              isFailed: false,
              systemError: undefined
          });
      case actionTypes.GROUP_UPDATE_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: false,
              isUpdated: false,
              isFailed: true,
              systemError: action.message
          });
    default:
      return state;
    }
}

/**
 * Plan to export a method and include it within the combined
 * reducers so it can be called in the mapStateToProps of the
 * ProfilePage
 */
export function getGroupData(state = { }, action)
{
    switch (action.type) {
        case actionTypes.GROUP_GET_REQUEST:
        case actionTypes.GROUP_GET_SUCCESS:
            return Object.assign({}, state, groupReducer(state, action));
        default:
            return state;
    }
}
