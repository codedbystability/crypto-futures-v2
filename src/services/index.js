import React from "react";
import {fetchInstance} from "./fetch-instance";

let CLIENT_API_URL = "https://clientapi.septrader.com/api/";
export let API_PREFIX = '';


class AssociateServices extends React.Component {

    setPrefix = (prefix) => {
        CLIENT_API_URL = "https://clientapi.osugczihbllcmgbzjpjvqhplpbwzfxsipkmtrvaiblvykvuqgnvvnzfxdmyi.com/api/" + prefix // demo/binary
    }


    checkDirectAuth = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/auth/check", "POST", instance);

    getConfs = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/futures/confs/index", "POST", instance);
    getLimits = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/futures/future-limits/index", "POST", instance);
    getDrawStats = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/futures/draws/stats", "POST", instance);
    getMyDrawStats = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/futures/draws/my-stats", "POST", instance);
    getFutureHistory = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/futures/draws/history", "POST", instance);
    getFutureLeaderboard = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/futures/draws/leaderboard", "POST", instance);

    updateUsername = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/user/username", "POST", instance);

    switchAccount = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/user/switch", "POST", instance);

    depositDemo = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + "binary/user/deposit-demo", "POST", instance);

    getInstrumentList = (c_id, g_id) => fetchInstance(CLIENT_API_URL + API_PREFIX + "data/instruments", "POST", {
        c_id, g_id
    });

    // getHistoDay3 = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + `data/histoday3/${instance.code}/${instance.fromTs}/${instance.toTs}/${instance.interval}/${instance.limit}`, "POST", instance);
    getHistoDay3 = (instance) => fetchInstance(CLIENT_API_URL + API_PREFIX + `binary/data/histoday4`, "POST", instance);

}

const associateServices = new AssociateServices();
export default associateServices;
