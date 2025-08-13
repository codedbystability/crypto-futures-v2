import React from "react";
import './index.css'
import {useTranslation} from "react-i18next";
import sprite from "../../assets/icons/sprite.svg";

const InsufficentBalanceNotification = (props) => {

    const {notification} = props
    const {t} = useTranslation()

    console.log('notification =', notification)
    return (
        <div className={'notification'}>

            <div>
                <div className="text">
                                        <span style={{width: '100%', display: 'flex', gap: 4}}>

                                              <svg className="icon red">
                                                        <use xlinkHref={`${sprite}#money-1`}/>
                                                    </svg>
                                            <span
                                                className="bold red">{notification?.msg || t(`notifications.insufficent-balance`)}</span>


                                        </span>


                </div>
            </div>


        </div>
    )
}

export default InsufficentBalanceNotification
