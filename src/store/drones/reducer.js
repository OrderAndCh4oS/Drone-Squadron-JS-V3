import {
    ADD_DRONE,
    END_OF_GAME_UPDATE,
    REMOVE_DRONE,
    SET_DRONES,
    UPDATE_DRONE,
} from './types';
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
            return action.drones.filter(d => !Object.keys(d.status_value).includes('destroyed'));
        }
        case UPDATE_DRONE:
            return state.map(d => d.id === action.drone.id ? action.drone : d);
        case END_OF_GAME_UPDATE:
            return state.map(d => d.id === action.id
                ? {
                    ...d,
                    status: action.status,
                    kills: action.kills,
                    missions: action.missions,
                }
                : d,
            );
        default:
            return state;
    }
};

export default reducer;
