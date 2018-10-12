import request from '../api/request';
import { getLogout } from '../api';

const auth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        cb();
    },
    signOut(cb) {
        this.isAuthenticated = false;
        request(getLogout).then(() => {
            window.localStorage.removeItem('user');
        });
        cb();
    },
};

export default auth;
