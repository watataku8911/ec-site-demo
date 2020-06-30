import * as Actions from './action';
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
    switch(action.type) {
        case Actions.FETCH_PRODUCTS:
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
}