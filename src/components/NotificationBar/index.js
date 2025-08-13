/**
 *
 * NotificationBar
 *
 */

import React from 'react';
import './index.css';
import sprite from '../../assets/icons/sprite.svg';
import {connect, useSelector} from 'react-redux';
import InstrumentIcon from "../instrument-icon";

function NotificationBar(props) {
    const {notifications} = useSelector(state => state.informationReducer);

    // return (
    //     <div className="notification" key={i}>
    //         <svg className="icon antenna">
    //             <use xlinkHref={sprite + icon}/>
    //         </svg>
    //         {/*<strong>{title}</strong>*/}
    //         <span>
    //                             {currency} {notification.amount} {notification.message}
    //                         </span>
    //     </div>
    // );

    return (
        <div id="NotificationBar" className={`notification-bar`}>
            {
                notifications?.map((notification, i) => {
                    if (notification.type === 'code') {

                        return (
                            <div className={'notification'} key={i}>
                                <div className="title">
                                    <InstrumentIcon code={notification.code}/>

                                </div>
                                <div>
                                    <div className="text">
                                        <span style={{width: '100%', display: 'flex', gap: 4}}>
                                          {notification.message}

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

                                        {
                                            notification.amount &&
                                            <span style={{width: '100%'}}>
                                              {notification.amount}
                                            </span>
                                        }

                                        {
                                            notification.w_amount &&
                                            <span style={{width: '100%'}}>
                                              {notification.w_amount}
                                            </span>
                                        }


                                    </div>
                                </div>

                                {/*{*/}
                                {/*    notification.icon && <svg className="icon header-icon antenna">*/}
                                {/*        <use xlinkHref={sprite + notification.icon}/>*/}
                                {/*    </svg>*/}
                                {/*}*/}


                            </div>
                        )
                    }


                    let icon, currency;
                    if (notification.type === 'bet') {
                        icon = '#money-4';
                        currency = ''
                    } else {
                        icon = '#notification';
                        currency = ''
                    }

                    return (
                        <div id="NotificationBar" className={`notification`} key={i}>
                            <div className="notification" key={i}>
                                <svg className="icon antenna">
                                    <use xlinkHref={sprite + icon}/>
                                </svg>
                                {/*<strong>{title}</strong>*/}
                                <span>
                                {currency} {notification.amount} {notification.message}
                            </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}


export default NotificationBar
