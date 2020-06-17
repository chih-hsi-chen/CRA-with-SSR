import { doAuth } from "../helpers/api";

export const AUTH_VALIDATE = 'auth/validate';
export const AUTH_KNOW_SERVER = 'auth/recognize-server';

export const validateAuth = () => async (dispatch) => {
    const auth = await doAuth();
    
    dispatch({
        type: AUTH_VALIDATE,
        payload: {
            ...auth
        }
    });
}

export const recognizeServer = () => {
    return {
        type: AUTH_KNOW_SERVER,
        payload: { isServerControl: false }
    };
}