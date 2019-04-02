/* eslint-disable no-unused-vars */
import * as constants from '../constants/actionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function profileReducer(state = {totalItems: 0}, action) {
    switch (action.type) {
        case constants.PROFILES_REQUEST:
            return Object.assign({}, state, {
                [action.position]: {
                    isFetching: true,
                    isSuccess: false
                }
            });
        case constants.PROFILES_SUCCESS:
            return Object.assign({}, state, {
                [action.position]: {
                    data: action.data.user,
                    isFetching: false,
                    isSuccess: true
                },
                totalItems: action.data.total
            });
        case constants.PROFILES_NOFOUND:
            return Object.assign({}, state, {
                [action.position]: {
                    data: undefined,
                    isFetching: false,
                    isSuccess: true
                },
                totalItems: action.data.total
            });
        case constants.PROFILES_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isSuccess: false,
                isFailed: true,
                isAuthenticated: false,
                systemError: action.message
            });
        default:
            return state;
    }
}