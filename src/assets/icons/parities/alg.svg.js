import * as React from "react"

const AlgSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"  {...props}>
        <path fill="url(#a)" d="M0 0h56v56H0z"/>
        <path
            d="m17.183 42 13.702-23.712 1.65 6.138L22.392 42h5.192l6.589-11.406L37.248 42h4.653l-4.548-16.944L40.58 19h-4.727l-2.011-7h-4.533L11.991 42h5.192z"
            fill="#fff"
        />
        <defs>
            <linearGradient
                id="a"
                x1={10.418}
                y1={9.712}
                x2={68.147}
                y2={76.017}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#1A1E21"/>
                <stop offset={1} stopColor="#06060A"/>
            </linearGradient>
        </defs>
    </svg>
)

export default AlgSvg
