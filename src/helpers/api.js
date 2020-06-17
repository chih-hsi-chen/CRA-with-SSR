import axios from 'axios';

const REMOTE_SERVER = process.env.REACT_APP_SERVER || 'http://localhost:3000/api';

export function doLogin(username, password) {
    const url = REMOTE_SERVER + '/login';
    if(!username || !password)
        return;
    return axios({
        method: 'POST',
        url,
        data: {
            username, password
        }
    });
}

export function doReigster(username, password) {
    const url = REMOTE_SERVER + '/register';
    if(!username || !password)
        return;
    return axios({
        method: 'POST',
        url,
        data: {
            username, password
        }
    });
}

export function doAuth() {
    const url = REMOTE_SERVER + '/auth';

    return axios({
        method: 'GET',
        url
    })
    .then(res => res.data)
    .catch( () => ({ isAuthenticated: false }) );
}