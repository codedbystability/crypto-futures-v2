import InstrumentIcon from "../instrument-icon";
import sprite from "../../assets/icons/sprite.svg";
import React from "react";
import './index.css'
import Big from "big.js";
import {useTranslation} from "react-i18next";
import moment from "moment";

const PositionNotification = (props) => {

    const {notification} = props
    const {t} = useTranslation()

    console.log('notification =', notification)
    return (
        <div className={'notification'}>
            <div className="title">
                <InstrumentIcon small={true} code={notification.code}/>
                <i className={`ti ti-chevrons-${notification?.type}`}/>
            </div>
            <div>
                <div className="text">
                                        <span style={{width: '100%', display: 'flex', gap: 4}}>

                                            <span
                                                className="bold blue">{t('notifications.position-accepted', {
                                                code: notification.code
                                            })}: {Big(notification?.amount || 0).toFixed(2)}</span>

                                            {
                                                notification.b_icon && <svg className="icon medium-icon antenna">
                                                    <use xlinkHref={sprite + notification.b_icon}/>
                                                </svg>
                                            }
                                        </span>

                    {
                        notification.b_type &&
                        <span style={{width: '100%', display: 'flex', gap: 4}}>
                                                {notification.b_type}
                            {
                                notification.icon && <svg className="icon medium-icon antenna">
                                    <use xlinkHref={sprite + notification.icon}/>
                                </svg>
                            }

                        </span>
                    }


                    <span className="notification-second">

                        {
                            t('notifications.position-accepted-desc', {
                                type: t(`notifications.${notification?.type}`)?.toUpperCase(),
                                amount: Big(notification?.amount || 0).toFixed(2),
                                code: notification?.code,
                                leverage: `[x${Big(notification?.leverage || 0).toFixed(2)}]`
                            })
                        }
                                            </span>


                </div>
            </div>

            {/*{*/}
            {/*    notification.icon && <svg className="icon header-icon antenna">*/}
            {/*        <use xlinkHref={sprite + notification.icon}/>*/}
            {/*    </svg>*/}
            {/*}*/}


            <span className='timee'>
                {moment.unix(notification?.time / 1000).format('HH:mm:ss')}
            </span>

        </div>
    )
}

export default PositionNotification
