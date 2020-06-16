import { AUTH_VALIDATE, AUTH_KNOW_SERVER } from "../actions/auth";

const initialState = {
    isAuthed: false,
    isServerControl: false
};

export default (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case AUTH_VALIDATE:
        case AUTH_KNOW_SERVER:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}