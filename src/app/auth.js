import request from '../api/request';
import { getLogout } from '../api';

// Todo: Handle auth better, need to re-validate a JWT token or something.
const auth = {
    isAuthenticated: JSON.parse(window.localStorage.getItem('user')) !== null,
    authenticate(callback) {
        this.isAuthenticated = true;
        callback();
    },
    signOut(callback) {
        this.isAuthenticated = false;
        request(getLogout).then(() => {
            window.localStorage.removeItem('user');
        });
        callback();
    },
};

export default auth;

export const handleUnauthorised = (data, history) => {
    if(data.hasOwnProperty('error') && data.error === 'Not logged in')
        history.push('/login');
};
