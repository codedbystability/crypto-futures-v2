import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import store from "../../reducers/store";
import INFORMATION_CONSTANTS from "../../constants/information";
import Big from "big.js";
import InstrumentIcon from "../../components/instrument-icon";
import PriceDisplay from "../../components/price-display";
import INFORMATION_ACTIONS from "../../actions/information";

const ParityList = () => {

    const {t} = useTranslation()
    // const closeRef = useRef(null)
    const {instruments} = useSelector(state => state.dataReducer);
    const {favorites} = useSelector(state => state.authenticationReducer)
    const {activeParity, modalType, betWay} = useSelector(state => state.informationReducer)

    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState([])
    const [filteredParitiesUpdates, setFilteredParitiesUpdates] = useState([])
    // const [filteredUpdates, setFilteredUpdates] = useState([])


    useEffect(() => {
        // // console.log('search = ', search)
        search ? setFiltered(instruments?.filter(i =>
            i?.code?.toUpperCase().includes(search?.toUpperCase()) ||
            i?.desc?.toUpperCase().includes(search?.toUpperCase())
        )) : setFiltered(instruments)
    }, [instruments, search])
    const handleFavorite = code =>
        favorites?.includes(code) ?
            window?.tcpSocketServer?.emit('futures:remove:favorite', code) :
            window?.tcpSocketServer?.emit('futures:add:favorite', code)

    const handleParityChange = parity => {
        // if (!parity?.enabled || parity?.closed)
        //     return toast.error(t('notifications.market-closed'))

        // console.log(parity)
        if (activeParity?.code === parity?.code) return;

        store.dispatch({type: INFORMATION_CONSTANTS.SET_PARITY, data: parity})
        store.dispatch({type: INFORMATION_CONSTANTS.SHOW_SYMBOL_LIST, data: false})
    };

    const handleUpdateL = (e) => {
        const data = JSON.parse(e)
        try {
            setFilteredParitiesUpdates(prev =>
                prev.map(item => {

                        const parity = instruments?.find(i => i.code === data?.c)
                        // dones[data?.c] = parity

                        // data.bb = data.b
                        const dgt = parseInt(data?.digit || 0)
                        // const AS = parseFloat(parity?.as || 0) / Math.pow(10, dgt)
                        const BS = parseFloat(parity?.bs || 0) / Math.pow(10, dgt);

                        // const ask = Big(data.a || 0).plus(AS).toFixed(dgt)
                        // const askP = Big(data.pa || 0).plus(AS).toFixed(dgt)

                        const bid = Big(data.b || 0).plus(BS).toFixed(dgt)
                        const bidP = Big(data.pb || 0).plus(BS).toFixed(dgt)


                        return item.code === data.c ? {
                            ...item,
                            // a: ask,
                            // pa: askP,
                            bb: data.bb,
                            b: bid,
                            pb: bidP,
                            // closed: data.closed,
                            digit: dgt,
                            t: data.t,
                            disabled: false
                        } : item
                    }
                ))
        } catch (err) {
            return console.log('EEE - ', err, '=', e)
        }
        // const data = decrypt(e)
        // // console.log('data-', data)
        // // console.log('groupSettings-', groupSettings)

    }

    useEffect(() => {
        // setFilteredParitiesUpdates(filtered)

        // if (filteredParitiesUpdates?.length <= 0)
        setFilteredParitiesUpdates(filtered)
        window?.globalDataSocket?.on('p-update', handleUpdateL);

        filtered?.map(parity => window?.globalDataSocket?.emit('join', `P~${parity?.code || ''}`))

        return () => {
            filtered?.map(parity => window?.globalDataSocket?.emit('leave', `P~${parity?.code || ''}`))
            // window?.globalDataSocket?.off('pm-update', handleSetSession)
            window?.globalDataSocket?.off('p-update', handleUpdateL);
        }
    }, [filtered, window?.globalDataSocket?.connected])

    const handleChange = (e, instrument) => {
        e.stopPropagation()
        if (modalType === 'calculator') {
            store.dispatch({type: INFORMATION_CONSTANTS.SET_CALCULATOR_SYMBOL, data: instrument})
        } else
            handleParityChange(instrument)
    }


    return (
        <div className="col-12 col-xl-3">
            <div className="sidebar sidebar--pt0">
                <div className="sidebar__tabs">
                    <div className="sidebar__content">
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            type="text"
                            className="form__search"
                            placeholder={t('parities.search')}
                        />
                        <div className="xtable">
                            <div className="xtable__title">
                                <span>{t('parities.symbol')}</span>
                                <span>{t('parities.price')}</span>
                            </div>
                            <div className="xtable__content xtable__content--track">
                                {/* .btc .eth .bnb .sol .xrp .ada .doge .ltc */}
                                {
                                    filteredParitiesUpdates?.map(instrument => (
                                        <button
                                            key={instrument.code}
                                            onClick={e => store.dispatch(INFORMATION_ACTIONS.setParity(instrument))}
                                            className={`pair ${instrument.code?.substring(0, 3)?.toLowerCase()} ${activeParity?.code === instrument?.code ? 'active' : ''}`}
                                            type="button">
                                                      <span className="pair__coin">
                                                          <InstrumentIcon small={true} code={instrument.code}/>
                                                        <span>
                                                          <i>{instrument.code?.substring(0, 3)}</i>
                                                          <small>{instrument.desc}</small>
                                                        </span>
                                                      </span>
                                            <span className="pair__price">
                                                        <PriceDisplay
                                                            amount={instrument.b}
                                                            digits={instrument?.digits}/>
                                                {/*<span>$</span>86,526<span>.838</span>*/}
                                                      </span>
                                        </button>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ParityList
