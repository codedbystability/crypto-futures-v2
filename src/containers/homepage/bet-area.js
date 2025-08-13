import {useSelector} from "react-redux";
import INFORMATION_CONSTANTS from "../../constants/information";
import store from "../../reducers/store";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Big from "big.js";
import {encrypt} from "../../helpers/encryption";
import PriceDisplay from "../../components/price-display";
import {createSfxManager} from "../../components/sfx";

const sfx = createSfxManager();

const numberRegex = new RegExp("^\\d{1,5}(\\.\\d{0,2})?$")
const INITIAL_SL_TP = {
    price: '',
    amount: '',
    active: ''
}

const BetArea = () => {
    const {t} = useTranslation()

    const {lastData, activeParity, myBetsCount, betWay} = useSelector(state => state.informationReducer)
    const {user} = useSelector(state => state.authenticationReducer)
    // const {user} = useSelector(state => state.authenticationReducer)
    const {limits} = useSelector(state => state.dataReducer)
    const [amount, setAmount] = useState(10)
    const [leverage, setLeverage] = useState(50)
    const [bustPrice, setBustPrice] = useState('')
    const [totalQuantity, setTotalQuantity] = useState(0)


    const [minMaxLeverage, setMinMaxLeverage] = useState({
        min: 0,
        max: 0,
    })
    const [lossPrice, setLossPrice] = useState(INITIAL_SL_TP)
    const [winPrice, setWinPrice] = useState(INITIAL_SL_TP)

    const [betAble, setBetAble] = useState(true)

    const [winError, setWinError] = useState({
        key: '',
        msg: ''
    })
    const [lossError, setLossError] = useState({
        key: '',
        msg: ''
    })
    const [formError, setFormError] = useState('')

    const [parityLimits, setParityLimits] = useState([])
    useEffect(() => {

        setParityLimits(limits[activeParity?.code] || null)
    }, [limits, activeParity?.code])

    useEffect(() => {
        const actPrice = lastData[betWay === 'up' ? 'b' : 'a']
        // console.log('actPrice = ',actPrice)
        const enabled = betWay === 'up' ? actPrice > bustPrice : actPrice < bustPrice;
        if (!enabled) {
            setFormError(t('notifications.bust-price-should-be-lower-than-current-price'))
            setBetAble(enabled)
        } else {


            if (!parityLimits || parityLimits?.length <= 0) {
                setFormError(t('notifications.leverage-not-defined', {
                    code: activeParity?.code,
                }))
            } else {


                setMinMaxLeverage({
                    max: Math.max.apply(Math, parityLimits.map(function (o) {
                        return o.leverage;
                    })),
                    min: Math.min.apply(Math, parityLimits.map(function (o) {
                        return o.leverage;
                    }))
                })

                const records = parityLimits?.filter(lmt =>
                    lmt.min <= amount && lmt?.max >= amount && leverage <= lmt.leverage
                )

                if (records?.length <= 0) {
                    const newITem = parityLimits?.filter(lmt => lmt.min <= amount && lmt?.max >= amount)

                    if (newITem?.length >= 1) {
                        setFormError(t('notifications.leverage-range-for-amount', {
                            amount: amount,
                            max: newITem[0]?.leverage
                        }))
                    }
                } else {
                    setFormError('')
                }
            }
        }


    }, [parityLimits, amount, leverage, activeParity?.code, bustPrice, lastData?.b, lastData?.a, betWay])


    const handleMax = () => {
        console.info('paritylimits = ', parityLimits)

        console.info('leverage = ', leverage)

        const limitss = parityLimits.sort((a, b) => parseFloat(a.leverage) - parseFloat(b.leverage)); // b - a for reverse sort

        console.info(limitss)

        const item = limitss?.find(i => i.leverage >= leverage)
        console.info(item)

        if (item?.max) {
            console.info(Math.min(user?.balance, item?.max))
            setAmount(Big(Math.min(user?.balance, item?.max)).toFixed(0))
        }
    }
    const onAmountChange = value => {
        const cleanValue = String(value).replace(/[^0-9]/g, '');

        console.log('cleanValue = ',cleanValue)
        // If nothing left after cleaning → reset
        if (cleanValue.length === 0) {
            return setAmount('');
        }

        value = cleanValue;
        if (!value)
            return setAmount('')


        if (Number(value) <= Number(activeParity?.min_bet))
            return setAmount(Number(activeParity?.min_bet))

        if (Number(value) >= Number(user?.balance))
            return setAmount(Number(user?.balance).toFixed(0))

        if (Number(value) >= Number(activeParity?.max_bet))
            return setAmount(Number(activeParity?.max_bet))


        // if (Number(value) > Number(user?.balance))
        //     return setAmount(Math.floor(user?.balance))
        return setAmount(Number(value))
    }

    const onLeverageChange = value => {
        const cleanValue = String(value).replace(/[^0-9.]/g, '');

        if (!cleanValue) {
            return setAmount('');
        }

        if (Number(value) <= Number(minMaxLeverage?.min))
            return setLeverage('')
        if (Number(value) >= Number(minMaxLeverage?.max))
            return setLeverage(Number(minMaxLeverage?.max))

        return setLeverage(Number(value))
    }

    // todo set bust price !!!
    useEffect(() => {
        // todo set bust price !!!
        // const totalQuantity = Big(leverage * amount).div(lastData?.b || 1).toNumber()
        // const bPrice = Big(lastData.b || 0).minus(Big(amount).div(totalQuantity || 1)).toNumber();

        const prc = betWay === 'up' ? Big(lastData?.a || 1)
                // ?.plus((activeParity?.as || 0) / Math.pow(10, parseInt(activeParity.digits || 1)))
                ?.toFixed(parseInt(activeParity?.digits || 1))
            : Big(lastData?.b || 0)
                // ?.plus((activeParity?.bs || 0) / Math.pow(10, parseInt(activeParity.digits || 1)))
                ?.toFixed(parseInt(activeParity?.digits || 0))


        setTotalQuantity(Big((leverage * amount) || 0).div(prc || 1).toNumber())


    }, [lastData?.b, leverage, betWay, amount, activeParity])

    useEffect(() => {
        const prc = betWay === 'up' ? Big(lastData?.a || 1)
                // ?.plus((activeParity?.as || 0) / Math.pow(10, parseInt(activeParity.digits || 1)))
                ?.toFixed(parseInt(activeParity?.digits || 1))
            : Big(lastData?.b || 0)
                // ?.plus((activeParity?.bs || 0) / Math.pow(10, parseInt(activeParity.digits || 1)))
                ?.toFixed(parseInt(activeParity?.digits || 0))

        console.log({
            prc,
            amount,
            totalQuantity
        })
        const bustP = betWay === 'up' ?
            Big(prc || 0).minus(Big(amount || 0).div(totalQuantity || 1) || 1).toNumber()
            :
            Big(prc || 0).plus(Big(amount || 0).div(totalQuantity || 1) || 1).toNumber()


        setBustPrice(Big(bustP || 0)?.toFixed(parseInt(activeParity?.digits || 0)))
    }, [totalQuantity, betWay])

    // todo set lost price SL
    useEffect(() => {

        if (lossPrice?.amount > 0 && lossPrice.active === 'amount') {
            setLossPrice(prevState => ({
                ...prevState,
                price: betWay === 'up' ?
                    Big(lastData.b || 0).minus(Big(lossPrice.amount).div(totalQuantity || 1)).toFixed(parseInt(activeParity?.digits || 0))
                    :
                    Big(lastData.b || 0).plus(Big(lossPrice.amount).div(totalQuantity || 1)).toFixed(parseInt(activeParity?.digits || 0))
            }))
        } else if (lossPrice?.active === 'amount') {
            setLossPrice(prevState => ({
                ...prevState,
                price: ''
            }))
        }

    }, [totalQuantity, lossPrice?.amount, betWay])

    // todo set lost price TP
    useEffect(() => {

        if (winPrice?.amount > 0 && winPrice?.active === 'amount') {

            setWinPrice(prevState => ({
                ...prevState,
                price: betWay === 'down' ?
                    Big(lastData.b || 0).minus(Big(winPrice.amount).div(totalQuantity || 1)).toFixed(parseInt(activeParity?.digits || 0))
                    :
                    Big(lastData.b || 0).plus(Big(winPrice.amount).div(totalQuantity || 1)).toFixed(parseInt(activeParity?.digits || 0))
            }))
        } else if (winPrice?.active === 'amount') {
            setWinPrice(prevState => ({
                ...prevState,
                price: ''
            }))
        }

    }, [winPrice?.amount, totalQuantity, betWay])

    // todo set amount price TP
    useEffect(() => {
        if (winPrice?.price > 0 && winPrice?.active === 'price') {
            // const totalQuantity = Big(leverage * amount).div(lastData?.b || 1).toNumber()

            setWinPrice(prevState => ({
                ...prevState,
                amount: betWay === 'up' ? Big(winPrice?.price).minus(lastData?.b).times(totalQuantity)?.toFixed(2) :
                    Big(lastData?.b).minus(winPrice?.price).times(totalQuantity)?.toFixed(2)
            }))
        } else if (winPrice?.active === 'price') {
            setWinPrice(prevState => ({
                ...prevState,
                amount: ''
            }))
        }

    }, [totalQuantity, betWay, winPrice?.price])

    useEffect(() => {
        if (lossPrice?.price > 0 && lossPrice?.active === 'price') {
            setLossPrice(prevState => ({
                ...prevState,
                amount: betWay === 'up' ? Math.abs(Big(lossPrice?.price).minus(lastData?.b).times(totalQuantity)?.toFixed(2)) :
                    Math.abs(Big(lastData?.b).minus(lossPrice?.price).times(totalQuantity)?.toFixed(2))
            }))
        } else if (lossPrice?.active === 'price') {
            setLossPrice(prevState => ({
                ...prevState,
                amount: ''
            }))
        }

    }, [totalQuantity, betWay, lossPrice?.price])

    // SET ERRORS !!!
    useEffect(() => {

        if (winPrice?.price) {
            if (winPrice?.price <= 0) {
                setWinError({
                    key: 'winPrice',
                    msg: 'tp-price-cant-be-negative'
                })
            } else if (betWay === 'up' && winPrice?.amount < 0) {
                setWinError({
                    key: 'winPrice',
                    msg: 'tp-amount-should-be-greater-than-0'
                })
            } else if (betWay === 'up' && lastData?.b >= winPrice?.price) {
                setWinError({
                    key: 'winPrice',
                    msg: 'tp-price-should-be-greater-than-current-price'
                })
            } else if (betWay === 'down' && lastData?.b <= winPrice?.price) {
                setWinError({
                    key: 'winPrice',
                    msg: 'tp-price-should-be-lower-than-current-price'
                })
            } else {
                setWinError({
                    key: '',
                    msg: ''
                })
            }
        } else {
            setWinError({
                key: '',
                msg: ''
            })
        }


    }, [winPrice?.price, winPrice?.amount, betWay])

    useEffect(() => {

        if (lossPrice?.price) {
            if (lossPrice?.price <= 0) {
                setLossError({
                    key: 'lossPrice',
                    msg: 'sl-price-can-not-be-negative'
                })
            } else if (betWay === 'up' && parseFloat(bustPrice) >= parseFloat(lossPrice?.price)) {
                setLossError({
                    key: 'lossPrice',
                    msg: 'sl-price-should-be-greater-than-bust-price'
                })
            } else if (betWay === 'up' && parseFloat(lastData?.b) <= parseFloat(lossPrice?.price)) {
                setLossError({
                    key: 'lossPrice',
                    msg: 'sl-price-should-be-lower-than-current-price'
                })
            } else if (betWay === 'down' && parseFloat(lastData?.b) >= parseFloat(lossPrice?.price)) {
                setLossError({
                    key: 'lossPrice',
                    msg: 'sl-price-should-be-greater-than-current-price'
                })
            } else if (betWay === 'down' && parseFloat(amount) <= parseFloat(lossPrice.amount)) {
                setLossError({
                    key: 'lossPrice',
                    msg: 'loss-amount-should-be-lower-than-amount'
                })
            } else {

                setLossError({
                    key: '',
                    msg: ''
                })
            }
        } else {
            setLossError({
                key: '',
                msg: ''
            })
        }
    }, [lossPrice?.price, lossPrice?.amount, betWay])


    useEffect(() => {
        setBetAble(!(winError.key || lossError?.key || formError))
        // setBetAble(false)
    }, [winError, lossError, formError])


    const handleBet = () => {

        if (!window?.tcpSocketServer?.connected)
            return false

        const data = {
            code: activeParity.code,
            type: betWay,
            amount,
            leverage,
            bustPrice,
            sl: lossPrice?.price,
            sl_amount: lossPrice?.amount,
            tp: winPrice?.price,
            tp_amount: winPrice?.amount,
            betType: 'manuel',
            t: Date.now(),
            izoleOrCross: 'izole'
        }

        store.dispatch({type: INFORMATION_CONSTANTS.SET_BETS_ABLE, data: false})


        sfx.clickSoft()
        window?.tcpSocketServer?.volatile?.emit('futures:create', encrypt(data))
    }

    const handleOpenBets = () => {
        const mobileBetList = document.getElementById('mobile-bet-list')
        if (mobileBetList)
            mobileBetList?.classList?.toggle('open')


        handleShowTransactions()
    }
    const handleClosedBets = () => {
        const mobileBetList = document.getElementById('mobile-bet-list')
        if (mobileBetList)
            mobileBetList?.classList?.toggle('open')

        handleShowTransactions()

    }

    const handleShowTransactions = () => {
        if (window.innerWidth >= 600) {
            const menu = document.getElementById('menu')
            menu?.classList?.remove('menu--active')
        } else
            store.dispatch({type: INFORMATION_CONSTANTS.SHOW_TRANSACTIONS, data: true})
    }

    return (
        <div className="col-12 col-xl-3">
            <div className="apigame">
                <div className="apigame__group">
                  <span className="apigame__label">
                  {t('bet.way')}
                  </span>
                    <div className="apigame__btns">
                        <button
                            onClick={e => store.dispatch({type: INFORMATION_CONSTANTS.SET_BET_WAY, data: 'up'})}
                            className={`apigame__btn green ${betWay === 'up' ? 'active' : ''}`} type="button">
                            <span>
                              {t('bet.up')}
                            </span>
                            <svg
                                width={17}
                                height={11}
                                viewBox="0 0 17 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.203 8.94118L9.20307 1.16332C9.00535 0.943378 8.77101 0.833496 8.5 0.833496C8.22899 0.833496 7.99471 0.943378 7.79676 1.16332L0.796837 8.94118C0.598891 9.16112 0.5 9.42151 0.5 9.72239C0.5 10.0233 0.598891 10.2838 0.796837 10.5036C0.995003 10.7236 1.22929 10.8335 1.50008 10.8335L15.4999 10.8335C15.7707 10.8335 16.0052 10.7236 16.203 10.5036C16.4007 10.2839 16.5 10.0233 16.5 9.72239C16.5 9.42145 16.4007 9.16112 16.203 8.94118Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={e => store.dispatch({type: INFORMATION_CONSTANTS.SET_BET_WAY, data: 'down'})}
                            className={`apigame__btn red ${betWay === 'down' ? 'active' : ''}`} type="button">
                            <span>
                              {t('bet.down')}
                            </span>
                            <svg
                                width={17}
                                height={11}
                                viewBox="0 0 17 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.797003 2.39232L7.79693 10.1702C7.99465 10.3901 8.22899 10.5 8.5 10.5C8.77101 10.5 9.00529 10.3901 9.20324 10.1702L16.2032 2.39232C16.4011 2.17237 16.5 1.91199 16.5 1.6111C16.5 1.31022 16.4011 1.04965 16.2032 0.829889C16.005 0.609943 15.7707 0.5 15.4999 0.5L1.50013 0.499999C1.22929 0.499999 0.99484 0.609942 0.797003 0.829888C0.599275 1.04959 0.500001 1.31016 0.500001 1.6111C0.500001 1.91205 0.599274 2.17237 0.797003 2.39232Z"/>
                            </svg>
                        </button>
                    </div>
                </div>


                <div className="apigame__group">
                    <span className="apigame__label">{t('bet.wager')}</span>
                    <div className="apigame__wager">
                        <div className="apigame__wager-inpit">
                            <button type="button"
                                    onClick={e => onAmountChange(parseInt(amount) - 10)}
                            >
                                <svg
                                    width={20}
                                    height={21}
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.314 11.4484H4.253C3.72915 11.4484 3.30469 11.0239 3.30469 10.5001C3.30469 9.97622 3.72915 9.55176 4.253 9.55176H16.314C16.8379 9.55176 17.2623 9.97622 17.2623 10.5001C17.2623 11.0239 16.8379 11.4484 16.314 11.4484Z"/>
                                </svg>
                            </button>
                            <input type="text" value={amount} onChange={e => onAmountChange(e.target.value)}/>
                            <button type="button"
                                    onClick={e => onAmountChange(parseInt(amount) + 10)}
                            >
                                <svg
                                    width={20}
                                    height={21}
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.8614 17.4789C9.33755 17.4789 8.91309 17.0544 8.91309 16.5306V4.46955C8.91309 3.9457 9.33755 3.52124 9.8614 3.52124C10.3852 3.52124 10.8097 3.9457 10.8097 4.46955V16.5306C10.8097 17.0544 10.3852 17.4789 9.8614 17.4789Z"/>
                                    <path
                                        d="M15.8921 11.4484H3.83112C3.30728 11.4484 2.88281 11.0239 2.88281 10.5001C2.88281 9.97622 3.30728 9.55176 3.83112 9.55176H15.8921C16.416 9.55176 16.8404 9.97622 16.8404 10.5001C16.8404 11.0239 16.416 11.4484 15.8921 11.4484Z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="apigame__wager-actions">
                            <button type="button" onClick={handleMax}>{t('bet.max')}</button>
                            <button type="button" onClick={e => onAmountChange(amount / 2)}>1/2</button>
                            <button type="button" onClick={e => onAmountChange(amount * 2)}>2x</button>
                        </div>
                    </div>
                </div>
                <div className="apigame__group apigame__group--row">
                    <div className="apigame__double">
                        <span className="apigame__label">{t('bet.multiplier')}</span>
                        <div className="apigame__multiplier">
                            <input type="number" value={leverage} onChange={e => onLeverageChange(e.target.value)}/>
                        </div>
                    </div>
                    <div className="apigame__double">
                        <span className="apigame__label">{t('bet.bust-price')}</span>
                        {/* .green .red */}
                        <div className="apigame__liquidity red">
                            <PriceDisplay amount={bustPrice} digits={activeParity?.digits}/>
                            {/*<span>$</span>92,500<span>.000</span>*/}
                        </div>
                    </div>
                </div>
                <div className="apigame__group">
                    <input type="range" min={minMaxLeverage?.min} max={minMaxLeverage?.max} value={leverage}
                           onChange={e => onLeverageChange(e.target.value)}/>
                    <div className="apigame__range">
                    <span>
                      x{minMaxLeverage?.min} <b>{t('bet.safe')}</b>
                    </span>
                        <span>
                      x{minMaxLeverage?.max} <b>{t('bet.wild')}</b>
                    </span>
                    </div>
                </div>
                {/* .green .red */}
                <div className={`apigame__bet ${betWay === 'up' ? 'green' : 'red'}`}>
                    {
                        betWay === 'up' ?
                            <button
                                onClick={handleBet}
                                type="button">
                                <span>{t('bet.up')}</span>
                                <svg
                                    width={17}
                                    height={11}
                                    viewBox="0 0 17 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.203 8.94118L9.20307 1.16332C9.00535 0.943378 8.77101 0.833496 8.5 0.833496C8.22899 0.833496 7.99471 0.943378 7.79676 1.16332L0.796837 8.94118C0.598891 9.16112 0.5 9.42151 0.5 9.72239C0.5 10.0233 0.598891 10.2838 0.796837 10.5036C0.995003 10.7236 1.22929 10.8335 1.50008 10.8335L15.4999 10.8335C15.7707 10.8335 16.0052 10.7236 16.203 10.5036C16.4007 10.2839 16.5 10.0233 16.5 9.72239C16.5 9.42145 16.4007 9.16112 16.203 8.94118Z"/>
                                </svg>
                            </button>
                            :
                            <button
                                onClick={handleBet}
                                type="button">
                                <span>{t('bet.down')}</span>
                                <svg
                                    width={17}
                                    height={11}
                                    viewBox="0 0 17 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.797003 2.39232L7.79693 10.1702C7.99465 10.3901 8.22899 10.5 8.5 10.5C8.77101 10.5 9.00529 10.3901 9.20324 10.1702L16.2032 2.39232C16.4011 2.17237 16.5 1.91199 16.5 1.6111C16.5 1.31022 16.4011 1.04965 16.2032 0.829889C16.005 0.609943 15.7707 0.5 15.4999 0.5L1.50013 0.499999C1.22929 0.499999 0.99484 0.609942 0.797003 0.829888C0.599275 1.04959 0.500001 1.31016 0.500001 1.6111C0.500001 1.91205 0.599274 2.17237 0.797003 2.39232Z"/>
                                </svg>
                            </button>
                    }

                </div>


                <div className="apigame__group apigame__group--border">
                    {/*<span className="apigame__label">İşlemler</span>*/}
                    <div className="apigame__bets mob">
                        <button
                            className="green open-sheet-btn"
                            type="button"
                            data-target="#sheet-2"
                            onClick={handleOpenBets}
                        >
                            {t('bottom.active-bets')}
                            <span> {myBetsCount}</span>
                        </button>
                        <button
                            className="red open-sheet-btn"
                            type="button"
                            data-target="#sheet-2"
                            onClick={handleClosedBets}

                        >
                            {t('bottom.closed-bets')}
                        </button>
                    </div>
                    <div className="apigame__bets desk">
                        <button
                            className="green"
                            data-bs-target="#modal-bets"
                            type="button"
                            data-bs-toggle="modal"
                            disabled={parseFloat(leverage) <= 0}
                            onClick={handleShowTransactions}
                        >
                            {t('bottom.active-bets')}
                            <span> {myBetsCount}</span>

                        </button>
                        <button
                            className="red"
                            data-bs-target="#modal-bets"
                            type="button"
                            data-bs-toggle="modal"
                            disabled={parseFloat(leverage) <= 0}
                            onClick={handleShowTransactions}
                        >
                            {t('bottom.closed-bets')}
                            {/*<span>5</span>*/}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default BetArea
