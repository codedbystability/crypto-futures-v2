import Big from "big.js";
import React from "react";


const StyledPrice = ({price, digits}) => {

    try {
        const split = Big(price || 0).toFixed(parseInt(digits || 0)).split('.')
        return <span>
            {split[0]}.
            <span className="cool-d">
                {split[1]}
            </span>
        </span>
    } catch (e) {
        console.error(e)
        return ''
    }
}
export default StyledPrice
