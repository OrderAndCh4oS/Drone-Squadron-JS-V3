import {
    ADD_SQUADRON,
    REMOVE_SQUADRON,
    SET_SQUADRONS,
    UPDATE_SQUADRON,
} from './types';

export const addSquadron = (squadron) => ({
    type: ADD_SQUADRON,
    squadron
});

export const removeSquadron = (squadron) => ({
    type: REMOVE_SQUADRON,
    squadron
});

export const updateSquadron = (squadron) => ({
    type: UPDATE_SQUADRON,
    squadron
});

export const setSquadrons = (squadrons) => ({
    type: SET_SQUADRONS,
    squadrons
});
