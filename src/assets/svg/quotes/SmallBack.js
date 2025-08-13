import React from "react";


const SmallBackSvg = props => {


    return (
        <svg
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
    )


}


export default React.memo(SmallBackSvg)