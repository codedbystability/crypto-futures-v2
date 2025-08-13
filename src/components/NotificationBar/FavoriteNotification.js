import InstrumentIcon from "../instrument-icon";
import React from "react";
import './index.css'
import sprite from "../../assets/icons/sprite.svg";

const FavoriteNotification = (props) => {

    const {code, msg, isFavorited = false} = props

    return (
        <div className={'notification'}>
            <div className="title">
                <InstrumentIcon small={true} code={code}/>
            </div>
            <div style={{width: '100%', display: 'flex', gap: 4, alignItems: 'center'}}>
                <div>
                    <span className='bold'>{code}</span>
                    <div className="text">
                                            <span>
                                                {
                                                    msg
                                                }
                                            </span>
                    </div>
                </div>

                <svg className={`icon ${isFavorited ? 'blue' : 'red'}`}>
                    <use xlinkHref={`${sprite}#star`}/>
                </svg>

            </div>


        </div>
    )
}

export default FavoriteNotification
