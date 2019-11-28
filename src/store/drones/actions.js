import { ADD_DRONE, REMOVE_DRONE, SET_DRONES, UPDATE_DRONE } from './types';

export const addDrone = (drone) => ({
    type: ADD_DRONE,
    drone
});

export const removeDrone = (drone) => ({
    type: REMOVE_DRONE,
    drone
});

export const updateDrone = (drone) => ({
    type: UPDATE_DRONE,
    drone
});

export const setDrones = (drones) => ({
    type: SET_DRONES,
    drones
});

