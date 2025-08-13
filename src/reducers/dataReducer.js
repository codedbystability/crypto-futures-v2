import DATA_CONSTANTS from "../constants/data";
import {encrypt} from "../helpers/encryption";

const dataStates = {
    instruments: [],
    limits: [],
    marketTimes: []
};

const dataReducer = (state = dataStates, action) => {
    switch (action.type) {

        case DATA_CONSTANTS.SET_LIMITS:
            return {
                ...state,
                limits: action.data
            }
        case DATA_CONSTANTS.SET_INSTRUMENT_LIST:
            // console.log('action.data = ',action.data)
            localStorage.setItem('instrumentList', encrypt(action.data))

            return {
                ...state,
                instruments: action.data
            }

        case DATA_CONSTANTS.SET_MARKET_TIMES:
            return {
                ...state,
                marketTimes: action.data
            }


        default:
            return state;
    }
};

export default dataReducer;
