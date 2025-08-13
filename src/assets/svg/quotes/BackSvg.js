import React from "react";


const BackSvg = props => {


    return (
        <svg
            fill="none"
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clipRule="evenodd"
                d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                fillRule="evenodd"
            />
        </svg>
    )


}


export default React.memo(BackSvg)