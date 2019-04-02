/* eslint-disable no-unused-vars */
import * as actionTypes from '../constants/actionTypes';

export default function skillReducer(state = {totalItems: 0}, action) {
    switch (action.type) {
        case actionTypes.SKILL_REQUEST:
            return Object.assign({}, state, {
                [action.position]: {
                    isFetching: true,
                    isSuccess: false
                }
            });
        case actionTypes.SKILL_SUCCESS:
            return Object.assign({}, state, {
                [action.position]: {
                    data:action.data.skill,
                    isFetching: false,
                    isSuccess: true
                },
                totalItems: action.data.total
            });
        case actionTypes.SKILL_NOFOUND:
            return Object.assign({}, state, {
                [action.position]: {
                    data: undefined,
                    isFetching: false,
                    isSuccess: true
                },
                totalItems: action.data.total
            });
        case actionTypes.SKILL_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isSuccess: false,
                isError: true
            });
        default:
            return state;
    }
}