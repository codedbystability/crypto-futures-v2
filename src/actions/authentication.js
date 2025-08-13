import AUTH_CONSTANTS from "../constants/authentication";

const AUTH_ACTIONS = {
    setAuthentication(data) {
            return {
                type: AUTH_CONSTANTS.SET_AUTHENTICATION,
                data,
            };
    },
    setUser(data) {
        return {
            type: AUTH_CONSTANTS.SET_USER,
            data,
        };
    },
    setUserWS(data) {
        return {
            type: AUTH_CONSTANTS.SET_USER_WS,
            data,
        };
    }
}


export default AUTH_ACTIONS
