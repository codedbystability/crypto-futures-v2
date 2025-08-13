import DATA_CONSTANTS from "../constants/data";

const DATA_ACTIONS = {
    setData(data) {
            return {
                type: DATA_CONSTANTS.SET_DATA,
                data,
            };
    },
    setLimits(data) {
        return {
            type: DATA_CONSTANTS.SET_LIMITS,
            data,
        };
    },
    appendHistoryData(data) {
        return {
            type: DATA_CONSTANTS.APPEND_HISTORY_DATA,
            data,
        };
    },
    appendData(data) {
        return {
            type: DATA_CONSTANTS.APPEND_DATA,
            data,
        };
    },
    setInstrumentList(data) {
        return {
            type: DATA_CONSTANTS.SET_INSTRUMENT_LIST,
            data,
        };
    },
    setMarketTimes(data) {
        return {
            type: DATA_CONSTANTS.SET_MARKET_TIMES,
            data,
        };
    }
}


export default DATA_ACTIONS
