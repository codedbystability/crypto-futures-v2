import React from "react";


const NewOrderSvg = () => {


    return (
        <svg fill="none" width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="evenodd">
                <path fill="#DA5244"
                      d="M11.5 4v2.02C8.42 6.276 6 8.856 6 12c0 3.145 2.42 5.725 5.5 5.98V20H10c-4.418 0-8-3.582-8-8s3.582-8 8-8h1.5z"/>
                <path fill="#3687ED"
                      d="M14 4c4.418 0 8 3.582 8 8s-3.582 8-8 8h-1.5v-2.02c3.08-.256 5.5-2.836 5.5-5.98 0-3.145-2.42-5.725-5.5-5.98V4H14z"/>
                <path fill="#B0BEC5" d="M13 8v4.186l2.657 2.657-1.414 1.414L11 13V8z"/>
            </g>
        </svg>
    )

}

export default React.memo(NewOrderSvg)
