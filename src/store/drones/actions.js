import {
    ADD_DRONE, END_OF_GAME_UPDATE,
    KILL_DRONE,
    REMOVE_DRONE,
    SET_DRONES,
    UPDATE_DRONE,
} from './types';

export const addDrone = (drone) => ({
    type: ADD_DRONE,
    drone
});

export const removeDrone = (drone) => ({
    type: REMOVE_DRONE,
    drone
});

export const killDrone = (drone) => ({
    type: KILL_DRONE,
    drone
});

export const updateDrone = (drone) => ({
    type: UPDATE_DRONE,
    drone
});

export const endOfGameUpdate = (id, missions, kills, status) => ({
    type: END_OF_GAME_UPDATE,
    id,
    missions,
    kills,
    status
});

export const setDrones = (drones) => ({
    type: SET_DRONES,
    drones
});

