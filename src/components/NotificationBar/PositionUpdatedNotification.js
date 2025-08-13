import InstrumentIcon from "../instrument-icon";
import React from "react";
import './index.css'
import {useTranslation} from "react-i18next";
import moment from "moment";
import Big from "big.js";

const PositionUpdatedNotification = (props) => {

    const {notification} = props
    const {t} = useTranslation()

    // console.log('notification = ', notification)
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
                                                className="bold blue">{t('notifications.position-updated')}</span>

                                        </span>


                    <span className="notification-second">

                        {
                            t('notifications.position-updated-with', {
                                sl: Big(notification.sl || 0).toFixed(parseInt(notification.digits || 5)),
                                tp: Big(notification.tp || 0).toFixed(parseInt(notification.digits || 5)),
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

export default PositionUpdatedNotification
