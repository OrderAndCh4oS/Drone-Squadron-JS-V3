/* eslint-disable indent */

const baseURL = 'http://localhost:5000';

export const postRegister = ({values: {username, password}}) => {
    return postFetch(makeUrl('/register'), {username, password});
};

export const postLogin = ({values: {username, password}}) => {
    return postFetch(makeUrl('/login'), {username, password});
};

export const getLogout = () => {
    return getFetch(makeUrl('/logout'));
};

export const getUser = ({params}) => {
    return getFetch(makeUrl('/user', params));
};

export const putUser = ({params}) => {
    return putFetch(makeUrl('/user', params));
};

export const deleteUser = ({params}) => {
    return deleteFetch(makeUrl('/user', params));
};

export const getSquadron = ({params}) => {
    return getFetch(makeUrl('/squadron', params));
};

export const postSquadron = ({params, values}) => {
    return postFetch(makeUrl('/squadron', params), values);
};

export const putSquadron = ({params}) => {
    return putFetch(makeUrl('/squadron', params));
};

export const deleteSquadron = ({params}) => {
    return deleteFetch(makeUrl('/squadron', params));
};

export const getDrone = ({params}) => {
    return getFetch(makeUrl('/drone', params));
};

export const getDroneBySquadron = ({params}) => {
    return getFetch(makeUrl('/squadron/' + params.id + '/drone'));
};

export const postDrone = ({params, values}) => {
    return postFetch(makeUrl('/drone', params), values);
};

export const putDrone = ({params, values}) => {
    return putFetch(makeUrl('/drone/' + params.id), values);
};

export const deleteDrone = ({params}) => {
    return deleteFetch(makeUrl('/drone', params));
};

export const getItemList = () => {
    return getFetch(makeUrl('/item-list'));
};

export const getWeapon = () => {
    return getFetch(makeUrl('/weapon'));
};

export const getGimbal = () => {
    return getFetch(makeUrl('/gimbal'));
};

export const getRoundType = () => {
    return getFetch(makeUrl('/round-type'));
};

export const getRoundTypeById = ({params}) => {
    return getFetch(makeUrl('/round-type/' + params.id));
};

export const getScanner = () => {
    return getFetch(makeUrl('/scanner'));
};

export const getSteering = () => {
    return getFetch(makeUrl('/steering'));
};

export const getThruster = () => {
    return getFetch(makeUrl('/thruster'));
};

export const makeUrl = (endpoint, params = false, withBase = true) => {
    const url = withBase ? baseURL : '';
    params = params ? '?' + createParams(params) : '';
    return url + endpoint + params;
};

const listValues = (params, key) =>
    Array.isArray(params[key]) ? params[key].join(',') : params[key];

const createParams = (params) =>
    Object.keys(params)
        .map(key => key + '=' + listValues(params, key))
        .join('&');

const getFetch = function(url) {
    return fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
    });
};

const deleteFetch = function(url) {
    return fetch(url, {
        method: 'delete',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
    });
};

const postFetch = function(url, data) {
    return fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

const putFetch = function(url, data) {
    return fetch(url, {
        method: 'put',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
