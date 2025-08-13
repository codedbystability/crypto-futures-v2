import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import store from "../../reducers/store";
import Big from "big.js";
import INFORMATION_ACTIONS from "../../actions/information";
import InstrumentIcon from "../../components/instrument-icon";
import PriceDisplay from "../../components/price-display";
import {createSfxManager} from "../../components/sfx";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import './index.css'

const sfx = createSfxManager();
const MobileBottomSheet = () => {

    const {t} = useTranslation()
    const {instruments} = useSelector(state => state.dataReducer);
    const {activeParity, showSymbolList} = useSelector(state => state.informationReducer)

    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState([])
    const [filteredParitiesUpdates, setFilteredParitiesUpdates] = useState([])

    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        // // console.log('search = ', search)
        search ? setFiltered(instruments?.filter(i =>
            i?.code?.toUpperCase().includes(search?.toUpperCase()) ||
            i?.desc?.toUpperCase().includes(search?.toUpperCase())
        )) : setFiltered(instruments)
    }, [instruments, search])

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


    useEffect(() => {
        handleClose()

        sfx?.success()
    }, [activeParity?.code])

    const handleClose = () =>
        store.dispatch({type: "SET_SHOW_PARITY_LIST", data: null})


    useEffect(() => {
        setOpen(Boolean(showSymbolList))
    }, [showSymbolList])


    return (
        <div ref={containerRef} className="bottom-sheet" id="mobile-parity-list">
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={handleClose}
                // 👇 Mount the drawer inside this container, not body
                container={containerRef.current}
                // Make it cover only the container area
                ModalProps={{keepMounted: true}}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        backgroundColor: '#0e121d',
                        color: 'inherit',
                        // keep it within the container height
                        maxHeight: '90%',
                        width: '100%',
                        boxShadow: 'none',
                    },
                }}
                // Backdrop inside the container
                BackdropProps={{
                    sx: {
                        backgroundColor: 'rgba(0,0,0,0.35)',
                    },
                }}
            >
                <div className="drawer-handle"/>

                <div className="bottom-sheet__content">
                    <div className="tab-content">

                        <div className="sidebar__content">
                            {/*<input*/}
                            {/*    value={search}*/}
                            {/*    onChange={e => setSearch(e.target.value)}*/}
                            {/*    type="text"*/}
                            {/*    className="form__search"*/}
                            {/*    placeholder="Search Symbol"*/}
                            {/*/>*/}
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

            </SwipeableDrawer>

        </div>


    )

}
export default MobileBottomSheet
