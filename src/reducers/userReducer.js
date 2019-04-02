/* eslint-disable no-unused-vars */
import * as actionTypes from './../constants/actionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function userReducer(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    didInvalidate: false
  }, action) {
  switch (action.type) {
      case actionTypes.USER_INVALIDATED:
          return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: true
          });
      case actionTypes.USER_GET_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              isAuthenticated: false,
              data: undefined
          });
      case actionTypes.USER_GET_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: true,
              isSuccess: true,
              isFailed: false,
              didInvalidate: false,
              data: action.user
          });
      case actionTypes.USER_GET_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: false,
              isSuccess: false,
              isFailed: true,
              data: undefined,
              systemError: action.message
          });
      case actionTypes.USER_UPDATE_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              isAuthenticated: false
          });
      case actionTypes.USER_UPDATE_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: true,
              isUpdated: true,
              isFailed: false,
              systemError: undefined
          });
      case actionTypes.USER_UPDATE_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
              isAuthenticated: false,
              isUpdated: false,
              isFailed: true,
              systemError: action.message
          });
      case actionTypes.VOCATION_UPDATE_REQUEST:
          return Object.assign({}, state, {
              isFetching: true,
              didInvalidate: false,
          });
      // Merge vocation data into user
      // Include is authenticated?
      case actionTypes.VOCATION_UPDATE_SUCCESS:
          return Object.assign({}, state, {
              isFetching: false,
              isUpdated: true,
              isFailed: false,
              systemError: undefined,
              didInvalidate: true,
              user: Object.assign({}, state.user, action.vocation)
          });
      // Include is authenticated?
      case actionTypes.VOCATION_UPDATE_FAILURE:
          return Object.assign({}, state, {
              isFetching: false,
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
export function getUserData(state = { }, action)
{
    switch (action.type) {
        case actionTypes.AUTH_DEFAULT:
        case actionTypes.USER_GET_REQUEST:
        case actionTypes.USER_GET_SUCCESS:
        case actionTypes.VOCATION_UPDATE_SUCCESS:
            return Object.assign({}, state, userReducer(state, action));
        default:
            return state;
    }
}
