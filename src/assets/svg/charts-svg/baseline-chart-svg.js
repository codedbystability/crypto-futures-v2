import React from "react";


const BaselineChartSvg = () => {

    return (
        <svg stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
            <g  >
                <path strokeDasharray="1,1" d="M4 14.5h22"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.5l2-4 1 2 2-4 3 6"/>
                <path strokeLinecap="round" d="M5.5 16.5l-1 2"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 16.5l2 4 2-4m2-4l1-2-1 2z"/>
            </g>
        </svg>
    )
}


export default BaselineChartSvg
