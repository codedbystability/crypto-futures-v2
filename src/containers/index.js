import Homepage from "./homepage";
import Header from "./header";
import Menu from "./menu";
import BetsModal from "./modals/bets-modal";
import MobileBottomSheet from "./mobile-parity-list";
import MobileBetList from "./mobile-bet-list";
import {useSelector} from "react-redux";
import store from "../reducers/store";
import APPEARANCE_CONSTANTS from "../constants/appearance";
import associateServices from "../services";
import {decrypt} from "../helpers/encryption";
import AUTH_ACTIONS from "../actions/authentication";
import DATA_ACTIONS from "../actions/data";
import INFORMATION_ACTIONS from "../actions/information";
import {useEffect, useState} from "react";
import Loading from "../components/loading";


const Containers = () => {
    const {languages} = useSelector(state => state.appearanceReducer)
    const [show, setShow] = useState(false)

    function gup(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        let regexS = "[\\?&]" + name + "=([^&#]*)";
        let regex = new RegExp(regexS);
        let results = regex.exec(url);
        return results == null ? null : results[1];
    }


    useEffect(() => {
        const languageParam = gup('language', window.location.href)

        let language = '';
        if (languageParam) {
            language = languageParam

        } else {
            language = localStorage.getItem('language')
        }
        const irm = languages?.find(i => i.key === language)

        if (language && irm) {
            store.dispatch({type: APPEARANCE_CONSTANTS.SET_ACTIVE_LANGUAGE, data: language})
        }else
            store.dispatch({type: APPEARANCE_CONSTANTS.SET_ACTIVE_LANGUAGE, data: 'tr'})


        const directAuth = gup('direct_auth', window.location.href)
        if (directAuth) {
            const url = new URL((window.location !== window.parent.location)
                ? document.referrer
                : document.location.href);

            associateServices.checkDirectAuth({
                token: directAuth,
                host: url.hostname
            }).then(res => {
                if (res?.status === 200) {

                    // alert(res?.data?.login?.toString()?.length)
                    associateServices.setPrefix(res?.data?.login?.toString()?.length >= 7 ? 'demo/' : '')

                    const decrypted = decrypt(res?.data?.acc)
                    store.dispatch(AUTH_ACTIONS.setAuthentication({
                        ...res?.data?.user,
                        ...decrypted,
                        token: res?.data?.token
                    }))


                    associateServices.getLimits().then(rest => {
                        store.dispatch(DATA_ACTIONS.setLimits(rest?.data || {}))

                        associateServices.getConfs().then(res => {
                            store.dispatch(DATA_ACTIONS.setInstrumentList(res?.data || []))
                            store.dispatch(DATA_ACTIONS.setMarketTimes(res?.market || {}))

                            let lastParity = localStorage.getItem('lastParity')

                            if (lastParity) {
                                lastParity = JSON.parse(lastParity)
                            }
                            const found = res?.data.find(i => i.code === lastParity?.code)
                            if (found) {
                                store.dispatch(INFORMATION_ACTIONS.setParity({
                                    ...found,
                                    value: found.code,
                                    label: found.code,
                                }))
                            } else {
                                let eth = res?.data.find(i => i.code === 'ETHUSD')
                                if (!eth)
                                    eth = res?.data[0]
                                store.dispatch(INFORMATION_ACTIONS.setParity({
                                    ...eth,
                                    value: eth.code,
                                    label: eth.code,
                                }))
                            }

                            setShow(true)
                        })
                    })

                }
            })
        }

    }, [languages])

    if (!show)
        return <Loading/>


    return (
        <>
            <Homepage/>
            <MobileBottomSheet/>
            <MobileBetList/>
            <BetsModal/>

        </>
    )
}

export default Containers
