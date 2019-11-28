import { SET_USER } from './types';
import state from './state';

let initialState = state;

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

export default reducer;
