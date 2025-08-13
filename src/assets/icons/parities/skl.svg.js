import * as React from "react"

const SklSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="url(#a)" d="M0 0h56v56H0z" />
        <path fill="#fff" d="M14 14h4v28h-4z" />
        <path
            fill="#fff"
            d="M39 13v4H14v-4zm1 26v4H14v-4zm-1-20c4 0 6.5 3 6.5 5H42c0-.5-1.13-2-3-2-2.25 0-3 1-3 2s.5 1.5 3 2c2.31.46 7 1.5 7 5.5 0 3.2-3.5 5.5-7 5.5-2.8 0-7-1.5-7-6h3c0 1.5 2 3 4 3 1.2 0 3.5-.5 3.5-2.5S40.2 29.2 39 29c-3-.5-6.5-1.5-6.5-5 0-2.5 2.5-5 6.5-5z"
        />
        <defs>
            <linearGradient
                id="a"
                x1={10.42}
                y1={9.71}
                x2={68.15}
                y2={76.02}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#1A1E21" />
                <stop offset={1} stopColor="#06060A" />
            </linearGradient>
        </defs>
    </svg>
)

export default SklSvg
