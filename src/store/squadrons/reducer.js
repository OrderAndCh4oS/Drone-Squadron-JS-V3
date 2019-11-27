import { CLEAR_NAME, UPDATE_NAME } from './types';
import state from './state';

let initialState = state;

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_NAME:
            return {
                ...state,
                name: action.name,
            };
        case CLEAR_NAME: {
            return {
                ...state,
                name: action.name,
            };
        }
        default:
            return state;
    }
};

export default reducer;
