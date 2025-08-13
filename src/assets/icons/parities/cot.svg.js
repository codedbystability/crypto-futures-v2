import * as React from "react"

const CotSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
        <path d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28z" fill="#F0F3FA"/>
        <path
            d="M12.742 25.371c-.514 0-.742.229-.742.686V37.83c0 .514.228.685.742.685C18.39 38.571 25.294 33.543 31 29.6V16c-5.649 3.886-12.724 9.429-18.258 9.371z"
            fill="url(#paint0_linear)"/>
        <path
            d="M43.258 30.686c.514 0 .742-.229.742-.686V18.229c0-.515-.228-.686-.742-.686-5.705-.057-12.552 4.971-18.258 8.914V40c5.649-3.886 12.724-9.429 18.258-9.314z"
            fill="url(#paint1_linear)"/>
        <path d="M31 29.478v-7.11c-2.05 1.359-4.1 2.733-6 4.093v7.2c2.1-1.36 4.1-2.823 6-4.183z" fill="#194AAD"/>
        <defs>
            <linearGradient id="paint0_linear" x1="23.25" y1="36.837" x2="19.914" y2="17.962"
                            gradientUnits="userSpaceOnUse">
                <stop offset=".1" stopColor="#194AAD"/>
                <stop offset=".5" stopColor="#248FCB"/>
                <stop offset=".8" stopColor="#2BBFDF"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="36.592" y1="16.296" x2="32.181" y2="41.275"
                            gradientUnits="userSpaceOnUse">
                <stop offset=".1" stopColor="#194AAD"/>
                <stop offset=".5" stopColor="#248FCB"/>
                <stop offset=".8" stopColor="#2BBFDF"/>
            </linearGradient>
        </defs>
    </svg>
)

export default CotSvg
