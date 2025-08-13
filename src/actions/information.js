import INFORMATION_CONSTANTS from "../constants/information";

const INFORMATION_ACTIONS = {
    setInstruments(data) {
        return {
            type: INFORMATION_CONSTANTS.SET_INSTRUMENTS,
            data,
        };
    },


    setParity(data) {
        return {
            type: INFORMATION_CONSTANTS.SET_PARITY,
            data,
        };
    },

    setResolution(data) {
        return {
            type: INFORMATION_CONSTANTS.SET_RESOLUTION,
            data,
        };
    },

    setLastData(data) {
        return {
            type: INFORMATION_CONSTANTS.SET_LAST_DATA,
            data,
        };
    },


}


export default INFORMATION_ACTIONS
