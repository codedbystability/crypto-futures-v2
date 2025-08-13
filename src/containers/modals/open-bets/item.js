import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Big from "big.js";
import InstrumentIcon from "../../../components/instrument-icon";
import moment from "moment/moment";
import {encrypt} from "../../../helpers/encryption";

const stringSort = ['code']

const OpenBetItem = props => {

    const {bet} = props
    const {t} = useTranslation()

    const handleCashOut = e => {
        // if (!window?.tcpSocketServer?.connected || loadings?.includes(theBet?.unique_id))
        if (!window?.tcpSocketServer?.connected)
            return false

        e.stopPropagation()
        // signalAudio?.play()

        // setLoadings(loadings => [...loadings, theBet?.unique_id])
        const itm = {
            unique_id: bet?.unique_id
        }
        window?.tcpSocketServer?.volatile?.emit('futures:cash:out', encrypt(itm))
    }

    return (
        <div className="btable__item">
            <div className="btable__row">
                <div className="btable__col">
                    <span className="btable__name">{t('active-bets.symbol')}</span>
                    {/* .up .down */}
                    <span className={`btable__coin ${bet?.type}`}>
                        <InstrumentIcon code={bet?.code}/>
                      <span>
                        <i>{bet?.code}</i>
                        <small>
                          <svg
                              width={9}
                              height={5}
                              viewBox="0 0 9 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                d="M8.6972 4.05384L5.19724 0.164914C5.09838 0.0549409 4.98121 0 4.8457 0C4.7102 0 4.59306 0.0549409 4.49408 0.164914L0.994122 4.05384C0.895149 4.16381 0.845703 4.29401 0.845703 4.44445C0.845703 4.59489 0.895149 4.72517 0.994122 4.83506C1.0932 4.94503 1.21035 5 1.34574 5L8.34564 5C8.48106 5 8.59828 4.94503 8.6972 4.83506C8.79607 4.7252 8.8457 4.59492 8.8457 4.44445C8.8457 4.29398 8.79607 4.16381 8.6972 4.05384Z"/>
                          </svg>
                            {bet?.type?.toUpperCase()}
                        </small>
                      </span>
                    </span>
                </div>
                {/* .tablet(hidden on mobile) */}
                <div className="btable__col tablet">
                    <span className="btable__name">{t('active-bets.entry')}</span>
                    {/* .orange .red .green */}
                    <span className="btable__text orange">${bet?.price}</span>
                </div>
                <div className="btable__col">
                    <span className="btable__name">{t('active-bets.last')}</span>
                    {/* .orange .red .green */}
                    <span className="btable__text">${bet?.price_end}</span>
                </div>
                {/* .tablet(hidden on mobile) */}
                <div className="btable__col tablet">
                    <span className="btable__name">{t('active-bets.bust')}</span>
                    {/* .orange .red .green */}
                    <span className="btable__text red">${bet?.bust}</span>
                </div>
                <div className="btable__col">
                    <span className="btable__name">{t('active-bets.total-profit')}</span>

                    {/* .orange .red .green */}
                    <span className={`btable__text ${bet?.profit >= 0 ? 'green' : 'red'}`}>{bet?.profit}</span>
                </div>
                <div className="btable__col">
                    <div className="btable__btns">
                        <button
                            className="btable__btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${bet.unique_id}`}
                            aria-expanded="false"
                            aria-controls={`$collapse${bet.unique_id}`}
                        >
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.9995 0C5.37295 0 0 5.37295 0 11.9995C0 18.626 5.37295 24 11.9995 24C18.626 24 24 18.626 24 11.9995C24 5.37295 18.626 0 11.9995 0ZM14.4975 18.5976C13.8799 18.8414 13.3882 19.0263 13.0194 19.1543C12.6517 19.2823 12.224 19.3463 11.7374 19.3463C10.9897 19.3463 10.4076 19.1634 9.99314 18.7987C9.57867 18.434 9.37245 17.9718 9.37245 17.41C9.37245 17.1916 9.38768 16.9681 9.41816 16.7406C9.44965 16.513 9.49943 16.257 9.56749 15.9695L10.3406 13.2389C10.4086 12.9768 10.4676 12.7279 10.5143 12.4963C10.561 12.2626 10.5834 12.0483 10.5834 11.8532C10.5834 11.5058 10.5112 11.262 10.368 11.1248C10.2227 10.9877 9.94946 10.9206 9.5421 10.9206C9.34298 10.9206 9.13778 10.9501 8.92749 11.0121C8.71924 11.0761 8.53841 11.134 8.3901 11.1909L8.59429 10.3497C9.10019 10.1435 9.58476 9.96673 10.047 9.82045C10.5092 9.67213 10.946 9.59898 11.3575 9.59898C12.1001 9.59898 12.673 9.77981 13.0763 10.1374C13.4776 10.496 13.6797 10.9623 13.6797 11.5352C13.6797 11.6541 13.6655 11.8634 13.6381 12.162C13.6107 12.4617 13.5589 12.735 13.4837 12.9859L12.7147 15.7084C12.6517 15.9269 12.5958 16.1768 12.545 16.4561C12.4952 16.7355 12.4709 16.9488 12.4709 17.0921C12.4709 17.4537 12.5511 17.7006 12.7137 17.8316C12.8742 17.9627 13.1556 18.0287 13.5538 18.0287C13.7417 18.0287 13.952 17.9952 14.1897 17.9302C14.4254 17.8651 14.5961 17.8072 14.7037 17.7575L14.4975 18.5976ZM14.3614 7.54692C14.0028 7.88013 13.571 8.04673 13.0662 8.04673C12.5623 8.04673 12.1275 7.88013 11.7658 7.54692C11.4062 7.21371 11.2244 6.80838 11.2244 6.33498C11.2244 5.8626 11.4072 5.45625 11.7658 5.12C12.1275 4.78273 12.5623 4.61511 13.0662 4.61511C13.571 4.61511 14.0038 4.78273 14.3614 5.12C14.72 5.45625 14.8998 5.8626 14.8998 6.33498C14.8998 6.8094 14.72 7.21371 14.3614 7.54692Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="btable__collapse collapse" id={`collapse${bet.unique_id}`}>
                <div className="details">
                    <span className="details__title">{t('active-bets.details')}</span>
                    <div className="details__chart">
                        <div className="frame__content frame__content--details">
                            <div className="outcome outcome--details">
                                <div className="outcome__zone outcome__zone--win"></div>
                                <div className="outcome__zone outcome__zone--lose">
                                    <div className="outcome__total">
                                        <small>{t('active-bets.total-profit')}</small>
                                        <p className={`btable__text ${Big(bet?.profit || 0)?.gte(0) ? 'green' : 'red'}`}>
                                            <span>{bet?.profit}</span>
                                        </p>
                                    </div>
                                </div>
                                {/* .btc .eth .bnb .sol .xrp .ada .doge .ltc */}
                                <div className="outcome__locked btc">
                                    <small>{t('active-bets.entry')}</small>
                                    <p>
                                        <span>{bet?.price}</span>
                                    </p>
                                </div>
                                <div className="outcome__locked2 red">
                                    <small>{t('active-bets.bust')}</small>
                                    <p>
                                        <span>{bet?.bust}</span>
                                    </p>
                                </div>
                                {/* .win .lose */}
                                <div className="outcome__value win">
                            <span className="outcome__price">
                              <span>{bet?.price_end}</span>
                            </span>
                                    <InstrumentIcon code={bet?.code}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="details__info">
                        <div className="details__stat">
                            <div className="btable__col">
                                <span className="btable__name">{t('active-bets.symbol')}</span>
                                {/* .up .down */}
                                <span className="btable__coin down">
                                    <InstrumentIcon code={bet?.code}/>
                            <span>
                              <i>{bet?.code}</i>
                              <small>
                                <svg
                                    width={9}
                                    height={5}
                                    viewBox="0 0 9 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                      d="M8.6972 4.05384L5.19724 0.164914C5.09838 0.0549409 4.98121 0 4.8457 0C4.7102 0 4.59306 0.0549409 4.49408 0.164914L0.994122 4.05384C0.895149 4.16381 0.845703 4.29401 0.845703 4.44445C0.845703 4.59489 0.895149 4.72517 0.994122 4.83506C1.0932 4.94503 1.21035 5 1.34574 5L8.34564 5C8.48106 5 8.59828 4.94503 8.6972 4.83506C8.79607 4.7252 8.8457 4.59492 8.8457 4.44445C8.8457 4.29398 8.79607 4.16381 8.6972 4.05384Z"/>
                                </svg>
                                  {bet?.type?.toUpperCase()}
                              </small>
                            </span>
                          </span>
                            </div>
                            <div className="btable__col big">
                                <span className="btable__name">{t('active-bets.entry')}</span>
                                {/* .orange .red .green */}
                                <span className="btable__text orange">
                            ${bet?.price}
                          </span>
                            </div>
                            <div className="btable__col">
                                <span className="btable__name">{t('active-bets.last')}</span>
                                {/* .orange .red .green */}
                                <span className="btable__text">${bet?.price_end}</span>
                            </div>
                            {/* .tablet(hidden on mobile) */}
                            <div className="btable__col tablet">
                                <span className="btable__name">{t('active-bets.bust')}</span>
                                {/* .orange .red .green */}
                                <span className="btable__text red">${bet?.bust}</span>
                            </div>
                            {/* <div class="btable__col">
														<span class="btable__name"></span>

														<span class="btable__text"></span>
													</div> */}
                            <div className="btable__col">
                                <span className="btable__name">{t('active-bets.amount')}</span>
                                {/* .orange .red .green */}
                                <span className="btable__text">{bet?.amount}</span>
                            </div>
                            <div className="btable__col">
                                <span className="btable__name">{t('active-bets.leverage')}</span>
                                {/* .orange .red .green */}
                                <span className="btable__text">x{bet?.multiplier}</span>
                            </div>
                            <div className="btable__col">
                                <span className="btable__name">{t('active-bets.time')}</span>
                                {/* .orange .red .green */}
                                <span className="btable__text">
                                                    {moment.unix(bet?.time / 1000).format('HH:mm:ss')}
                                </span>
                            </div>
                            <div className="btable__col">
                                <span className="btable__name">{t('active-bets.entry')}</span>
                                {/* .orange .red .green */}
                                <span className="btable__text">{bet?.unique_id}</span>
                            </div>
                            <div className="btable__col">
                                <span className="btable__name">{t('active-bets.id')}</span>
                                {/* .orange .red .green */}
                                <span className={`btable__text ${bet?.profit >= 0 ? 'green' : 'red'}`}>
                               {bet?.profit}
                          </span>
                            </div>

                            <div className="btable__col">
                                <span className="btable__name">{t('active-bets.commission')}</span>
                                {/* .orange .red .green */}
                                <span className="btable__text red">
                               {bet?.commission}
                          </span>
                            </div>

                        </div>
                        <div className="details__btns">
                            <button
                                className="details__btn details__btn--green"
                                type="button"
                                onClick={handleCashOut}
                            >
                                {t('active-bets.cash-out')} ({bet?.profit})
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )

}
export default OpenBetItem
