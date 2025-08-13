import InstrumentIcon from "../instrument-icon";
import React from "react";
import './index.css'
import sprite from "../../assets/icons/sprite.svg";

const PositionOnChartNotification = (props) => {

    const {code, msg, way} = props

    console.log('way  = ', way)
    return (
        <div className={'notification'}>
            <div className="title">
                <InstrumentIcon small={true} code={code}/>
                <i className={`ti ti-chevrons-${way}`}/>

            </div>
            <div style={{width: '100%', display: 'flex', gap: 4, alignItems: 'center'}}>
                {/*<div>*/}
                <span className='text'>
                    <span className="notification-second">
                            {msg}
                        </span>
                    </span>
                {/*</div>*/}


                {/*<div className="text">*/}
                {/*                            <span>*/}
                {/*                                {*/}
                {/*                                    msg*/}
                {/*                                }*/}
                {/*                            </span>*/}
                {/*</div>*/}
            </div>


        </div>
    )
}

export default PositionOnChartNotification
