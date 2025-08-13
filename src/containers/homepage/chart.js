import ParityList from "./parity-list";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Big from "big.js";
import store from "../../reducers/store";
import INFORMATION_ACTIONS from "../../actions/information";
import PriceDisplay from "../../components/price-display";
import InstrumentIcon from "../../components/instrument-icon";
import NeonLineLoop from "../../components/neon";
import InfiniteChartLine from "../../components/neon";
import LiveChartLine from "../../components/neon";
import PremiumLiveChart from "../../components/neon";
import GameNeonChartFinal from "../../components/neon";
import {createSfxManager} from "../../components/sfx";
import {createInfiniteHeartbeat, createTradingAudioDirector} from "../../components/heartbeat";
import INFORMATION_CONSTANTS from "../../constants/information";
import {useTranslation} from "react-i18next";

const sfx = createSfxManager(0.5)
const Chart = () => {

    const {t} = useTranslation()
    const {
        activeParity,
        lastData,
        soundSettings,
        betWay
    } = useSelector(state => state.informationReducer)

    const [color, setColor] = useState('green')
    useEffect(() => {
        if (betWay === 'up') {

            if (lastData?.a > lastData?.pa)
                setColor('green')
            else if (lastData?.a < lastData?.pa)
                setColor('red')
            else
                setColor('orange')
        } else {

            if (lastData?.b > lastData?.pb)
                setColor('green')
            else if (lastData?.b < lastData?.pb)
                setColor('red')
            else
                setColor('orange')
        }

    }, [lastData?.a, lastData?.b, lastData?.pa, lastData?.pb, betWay])
    const handleUpdateData = (e) => {
        try {
            const data = JSON.parse(e);
            if (data?.c === activeParity?.code) {
                // handleUpdate(e)

                const dgt = parseInt(data?.digit || 0)
                const AS = parseFloat(activeParity?.as || 0) / Math.pow(10, dgt)
                const BS = parseFloat(activeParity?.bs || 0) / Math.pow(10, dgt)


                // if (data.c === 'AVAXUSDT')
                //     // console.log('data = ', data, '=', BS)
                // // console.log({
                //     b: Big(data.b).toFixed(dgt),
                //     new: Big(data.b).plus(BS || 0).toFixed(dgt)
                // })

                data.b = Big(data.b).plus(BS || 0).toFixed(dgt)
                data.a = Big(data.a).plus(AS || 0).toFixed(dgt)
                data.digits = data.digit

                store.dispatch(INFORMATION_ACTIONS.setLastData(data))


            }
        } catch (e) {
            console.error(e)
        }
    }


    useEffect(() => {
        window.globalDataSocket?.emit('join', 'P~' + activeParity.code)
        window.globalDataSocket?.on('p-update', handleUpdateData);
        // window?.globalDataSocket?.on('pre', handlePre);

        return () => {
            // if (!openOrders.find(ii => ii.symbol === selectedOpenOrder?.symbol) && !waitingOrders.find(ii => ii.symbol === selectedOpenOrder?.symbol)) {
            // // console.log('!!! LEAVE P CONNECTION !!!')
            window.globalDataSocket?.emit('leave', 'P~' + activeParity.code)
            window.globalDataSocket?.off('p-update', handleUpdateData);
            // window.globalDataSocket?.off('pre', handlePre);
            // }
        }
        // }
    }, [activeParity, window.globalDataSocket?.connected, soundSettings?.signalSounds])

    const handleMobileParityList = () => {
        // const bottomSheet = document.getElementById('mobile-parity-list')
        // if (bottomSheet)
        //     bottomSheet?.classList?.toggle('open')

        store.dispatch({type: INFORMATION_CONSTANTS.SHOW_SYMBOL_LIST, data: true})
    }

    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = createTradingAudioDirector({
            volume: 0.3,
            hbMinBPM: 60,
            hbMaxBPM: 120,
        });

        const unlockAndStart = async () => {
            if (audioRef.current) {
                await audioRef.current.resume(); // resume AudioContext
                audioRef.current.start();        // start infinite heartbeat
            }
        };

        // 👇 user gesture required to unlock
        window.addEventListener("click", unlockAndStart, {once: true});

        return () => {
            if (audioRef.current) {
                audioRef.current.destroy();
            }
            window.removeEventListener("click", unlockAndStart);
        };
    }, []);
    return (
        <div className="col-12 col-xl-6">
            <div className="game game--apioption">
                {/* .btc .eth .bnb .sol .xrp .ada .doge .ltc */}
                <button
                    onClick={handleMobileParityList}
                    className="game__pair btc open-sheet-btn"
                    type="button"
                >
                      <span className="game__pair-coin">
                       <InstrumentIcon code={activeParity?.code}/>
                        <span>
                          <i>{activeParity?.code}</i>
                          <small>{activeParity?.desc}</small>
                        </span>
                        <svg
                            width={9}
                            height={8}
                            viewBox="0 0 9 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                              d="M0.996185 2.60151L4.49613 6.10146C4.595 6.20043 4.71217 6.24988 4.84767 6.24988C4.98317 6.24988 5.10032 6.20043 5.19929 6.10146L8.69924 2.60151C8.79821 2.50254 8.84766 2.38537 8.84766 2.24997C8.84766 2.11458 8.79821 1.99733 8.69924 1.89844C8.60016 1.79946 8.48301 1.74999 8.34762 1.74999L1.34775 1.74999C1.21233 1.74999 1.0951 1.79946 0.996185 1.89843C0.897321 1.9973 0.847684 2.11455 0.847684 2.24997C0.847684 2.38539 0.897321 2.50254 0.996185 2.60151Z"/>
                        </svg>
                      </span>
                    <span className="game__pair-parity">
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M4.9821 0.826558C4.7656 0.83301 4.56011 0.923521 4.40918 1.07887L1.07585 4.41225C0.920623 4.5684 0.833496 4.77965 0.833496 4.99982C0.833496 5.22 0.920623 5.43124 1.07585 5.5874L4.40918 8.92232C4.56597 9.07854 4.77835 9.16618 4.99968 9.16598C5.22102 9.16577 5.43323 9.07777 5.58974 8.92126C5.74624 8.76475 5.83426 8.55252 5.83446 8.33119C5.83466 8.10985 5.74704 7.89743 5.59081 7.74064L3.6849 5.8348H16.6699V8.38684C16.6596 8.50211 16.6733 8.61831 16.7103 8.72797C16.7474 8.83762 16.8068 8.93831 16.8849 9.02372C16.963 9.10914 17.058 9.17736 17.1639 9.22403C17.2698 9.2707 17.3843 9.29487 17.5 9.29487C17.6157 9.29487 17.7302 9.2707 17.8361 9.22403C17.942 9.17736 18.037 9.10914 18.1151 9.02372C18.1932 8.93831 18.2526 8.83762 18.2896 8.72797C18.3267 8.61831 18.3404 8.50211 18.3301 8.38684V5.8348C18.3301 4.92589 17.5788 4.16648 16.6699 4.16648H3.67676L5.59081 2.25401C5.71029 2.13657 5.79159 1.98591 5.82412 1.82157C5.85666 1.65724 5.83891 1.48691 5.77319 1.33281C5.70747 1.17871 5.59684 1.04795 5.45572 0.957663C5.31461 0.867377 5.14955 0.821638 4.9821 0.826558ZM14.9902 10.8233C14.8244 10.8237 14.6624 10.8735 14.5251 10.9665C14.3877 11.0594 14.2812 11.1912 14.2191 11.345C14.1571 11.4988 14.1423 11.6676 14.1768 11.8298C14.2112 11.992 14.2933 12.1403 14.4124 12.2556L16.3249 14.1697H3.33333V11.6908C3.33463 11.5797 3.31371 11.4696 3.2718 11.3667C3.22989 11.2638 3.16784 11.1704 3.08929 11.0918C3.01074 11.0133 2.91728 10.9512 2.81441 10.9093C2.71153 10.8674 2.60131 10.8465 2.49023 10.8478C2.26922 10.8504 2.05829 10.9406 1.90384 11.0987C1.74939 11.2568 1.66408 11.4698 1.66666 11.6908V14.1697C1.66666 15.0786 2.42441 15.8299 3.33333 15.8299H16.3249L14.4124 17.7439C14.3295 17.8198 14.2628 17.9116 14.2163 18.014C14.1699 18.1163 14.1446 18.227 14.142 18.3394C14.1394 18.4518 14.1595 18.5635 14.2012 18.6679C14.2429 18.7722 14.3053 18.8671 14.3846 18.9468C14.4639 19.0264 14.5585 19.0892 14.6627 19.1313C14.7669 19.1735 14.8786 19.194 14.991 19.1919C15.1033 19.1898 15.2141 19.165 15.3166 19.1189C15.4192 19.0729 15.5113 19.0065 15.5876 18.9239L18.9209 15.5905C18.9987 15.5131 19.0605 15.4211 19.1026 15.3197C19.1448 15.2183 19.1665 15.1096 19.1665 14.9998C19.1665 14.89 19.1448 14.7813 19.1026 14.6799C19.0605 14.5785 18.9987 14.4864 18.9209 14.4089L15.5876 11.0757C15.5099 10.9958 15.417 10.9323 15.3144 10.889C15.2118 10.8457 15.1016 10.8234 14.9902 10.8233Z"/>
                    </svg>
                        {t('parities.update')}
                  </span>
                </button>
                <div className="game__frame">
                    {/* .frame--border .frame--border-green .frame--border-red .frame--border-orange */}
                    <div className={`frame frame--border-${color}`}>

                        <div className="frame__content">

                            <div style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                            }}>
                                <GameNeonChartFinal lineColor={color}/>
                            </div>
                            {/* .green .red .orange */}
                            <div className={`apioption ${color}`}>
                                <div className="apioption__head">
                                    {/* .btc .eth .bnb .sol .xrp .ada .doge .ltc */}
                                    <span className="apioption__coin">
                                        <InstrumentIcon code={activeParity?.code}/>
                                        {activeParity?.code}{" "}

                                    </span>
                                    <span className="apioption__price">
                                        {/*{}*/}
                                        <PriceDisplay amount={betWay === 'up' ? lastData?.a : lastData?.b}
                                                      cls={'no-cls'}
                                                      digits={lastData?.digits}/>
                                    </span>
                                </div>
                                {/*<div className="apioption__stat">*/}
                                {/*    <span>Açık işlem adeti: 0</span>*/}
                                {/*    <span>Total Profit: $0</span>*/}
                                {/*</div>*/}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default Chart
