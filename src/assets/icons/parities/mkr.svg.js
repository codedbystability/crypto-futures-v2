import * as React from "react"

const MkrSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="url(#a1122)" d="M0 0h56v56H0z" />
        <path
            d="M8.497 16.136a1 1 0 0 1 .997-.005l15.997 9.1a1 1 0 0 1 .506.869V39a1 1 0 1 1-2 0V26.681L10 18.72V39a1 1 0 1 1-2 0V17a1 1 0 0 1 .497-.864zm39.006 0a1 1 0 0 0-.998-.005l-15.996 9.1a1 1 0 0 0-.506.869V39a1 1 0 1 0 2 0V26.681L46 18.72V39a1 1 0 1 0 2 0V17a1 1 0 0 0-.497-.864z"
            fill="#fff"
        />
        <defs>
            <linearGradient
                id="a1122"
                x1={0}
                y1={28}
                x2={56}
                y2={28}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#1BC4A3" />
                <stop offset={1} stopColor="#586979" />
            </linearGradient>
        </defs>
    </svg>
)

export default MkrSvg
