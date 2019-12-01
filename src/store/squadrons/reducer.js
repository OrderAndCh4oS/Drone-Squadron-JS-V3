import {
    ADD_SQUADRON,
    REMOVE_SQUADRON,
    SET_SQUADRONS,
    UPDATE_SQUADRON,
} from './types';
import state from './state';

let initialState = state;

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_SQUADRON:
            if(state.find(s => s.id === action.squadron.id)) {
                return state;
            }
            return [...state, action.squadron];
        case REMOVE_SQUADRON:
            return state.filter(s => s.id !== action.squadron.id);
        case SET_SQUADRONS: {
            return action.squadrons;
        }
        case UPDATE_SQUADRON:
            return state.map(s => s.id === action.squadron.id ? {
                ...s,
                ...action.squadron
            } : s);
        default:
            return state;
    }
};

export default reducer;
