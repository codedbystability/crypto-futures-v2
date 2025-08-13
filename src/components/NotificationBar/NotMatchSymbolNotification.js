import InstrumentIcon from "../instrument-icon";
import React from "react";
import './index.css'

const NotMatchSymbolNotification = (props) => {

    const {code, msg} = props

    return (
        <div className={'notification'}>
            <div className="title">
                <InstrumentIcon code={code}/>
            </div>
            <div style={{width: '100%', display: 'flex', gap: 4, alignItems: 'center'}}>
                <div>
                    <span className='bold'>{code}</span>
                    <div className="text">
                    <span className="notification-second">
                                                {
                                                    msg
                                                }
                                            </span>
                    </div>
                </div>


            </div>


        </div>
    )
}

export default NotMatchSymbolNotification
