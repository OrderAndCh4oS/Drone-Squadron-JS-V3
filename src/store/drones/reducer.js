import { ADD_DRONE, REMOVE_DRONE, SET_DRONES, UPDATE_DRONE } from './types';
import state from './state';

let initialState = state;

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_DRONE:
            if(state.find(d => d.id === action.drone.id)) {
                return state;
            }
            return [...state, action.drone];
        case REMOVE_DRONE:
            return state.filter(d => d.id !== action.drone.id);
        case SET_DRONES: {
            return action.drones;
        }
        case UPDATE_DRONE:
            return state.map(d => d.id === action.drone.id ? action.drone : d);
        default:
            return state;
    }
};

export default reducer;
