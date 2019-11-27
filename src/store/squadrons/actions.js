import { CLEAR_NAME, UPDATE_NAME } from './types';

export const updateName = (name) => ({
    type: UPDATE_NAME,
    name
});

export const clearName = () => ({
    type: CLEAR_NAME,
    name: ''
});
