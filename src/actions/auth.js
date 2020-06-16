export const AUTH_VALIDATE = 'auth/validate';
export const AUTH_KNOW_SERVER = 'auth/recognize-server'

export const validateAuth = () => async (dispatch) => {
    const isAuthed = await fetch('http://localhost:3000/api/auth')
        .then(res => res.json())
        .then(data => data.isAuthenticated);

    dispatch({
        type: AUTH_VALIDATE,
        payload: {
            isAuthed,
        }
    });
}

export const recognizeServer = () => {
    return {
        type: AUTH_KNOW_SERVER,
        payload: { isServerControl: false }
    };
}