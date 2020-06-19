import * as Actions from './action';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
    switch(action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}