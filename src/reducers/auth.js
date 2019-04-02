/* eslint-disable no-unused-vars */
import * as actionTypes from './../constants/actionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
    isFetching: false,
    isSuccess: false,
    isAuthenticated: (localStorage.getItem('id_token') ? true : false)
  }, action) {
  switch (action.type) {
    case actionTypes.AUTH_DEFAULT:
        //console.log('resetting');
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: localStorage.getItem('id_token') ? true : false,
          isSuccess: false,
            errors: undefined,
            serverError: undefined
        });
    case actionTypes.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        isSuccess: false,
        isInvalid: false,
      });
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        isSuccess: true,
        isFailed: false,
        isInvalid: false,
        errors: undefined
      });
    case actionTypes.LOGIN_INVALID:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        isFailed: false,
        isSuccess: false,
        isInvalid: true,
        errors: action.errors
      });
    case actionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        isFailed: true,
        isSuccess: false,
        isInvalid: false,
        serverError: action.serverError
      });
    case actionTypes.REGISTER_REQUEST:
      return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false,
          isSuccess: false,
          isInvalid: false
      });
    case actionTypes.REGISTER_SUCCESS:
      return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          isSuccess: true,
          isInvalid: false,
          serverError: ''
      });
    case actionTypes.REGISTER_INVALID:
      return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false,
          isFailed: false,
          isInvalid: true,
          isSuccess: false,
          errors: action.errors
      });
    case actionTypes.REGISTER_FAILURE:
      return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false,
          isFailed: true,
          isSuccess: false,
          isInvalid: false,
          serverError: action.serverError
      });
      // FORGOTTEN
    case actionTypes.FORGOTTEN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        isSuccess: true,
        isFailed: false
      });
    case actionTypes.FORGOTTEN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: true,
        isFailed: false,
        serverError: undefined
      });
    case actionTypes.FORGOTTEN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isSuccess: false,
        isFailed: true,
        serverError: action.serverError
      });
    // RESET
    case actionTypes.RESET_REQUEST:
      return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false,
          isSuccess: false,
          isFailed: false
      });
    case actionTypes.RESET_SUCCESS:
      return Object.assign({}, state, {
          isFetching: false,
          isSuccess: true,
          isFailed: false,
          serverError: undefined
      });
    case actionTypes.RESET_FAILURE:
      return Object.assign({}, state, {
          isFetching: false,
          isSuccess: false,
          isFailed: true,
          serverError: action.serverError
      });
    // LOGOUT
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false
      });

    case actionTypes.APPLICATION_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            isSuccess: false,
            isFailed: false,
            isInvalid: false,
        });
    case actionTypes.APPLICATION_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            isSuccess: true,
            isFailed: false,
            isInvalid: false,
        });
    case actionTypes.APPLICATION_FAILED:
        return Object.assign({}, state, {
            isFetching: false,
            isSuccess: false,
            isFailed: true,
            isInvalid: false,
            serverError: action.serverError
        });
    case actionTypes.APPLICATION_INVALID:
        return Object.assign({}, state, {
            isFetching: false,
            isSuccess: false,
            isFailed: false,
            isInvalid: true,
            errors: action.errors
        });

    default:
      return state;
    }
}
