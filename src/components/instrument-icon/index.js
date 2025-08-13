import React from "react";
import './index.css'
import {useSelector} from "react-redux";

const IconWrapper = ({code, small = false}) => {

    let myCode = code?.includes('#') ? code?.toUpperCase()?.substring(1) : code?.toUpperCase()

    const {iconList} = useSelector(state => state.informationReducer)
    if (myCode in iconList)
        if (iconList[myCode].icon)
            return (
                <div className={`instrument-icon-wrapper ${small ? 'small' : ''}`}>
                    <div className="icon-alone">
                        {iconList[myCode].icon}
                    </div>
                </div>
            )
        else if ('first' in iconList[myCode])
            return (
                <div className={`instrument-icon-wrapper ${small ? 'small' : ''}`}>
                    <div className={'instrument-icon-first'}>
                        {iconList[myCode].first}
                    </div>
                    <div className={'instrument-icon-second'}>
                        {iconList[myCode].second}

                    </div>
                </div>
            )

    return (
        <div className={`instrument-icon-wrapper ${small ? 'small' : ''}`}>
            <span className={'instrument-icon-txt'}>
                {myCode?.charAt(0)}

                {myCode?.charAt(1)?.toLowerCase()}
            </span>
        </div>
    )
}

export default React.memo(IconWrapper)
