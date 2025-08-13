import * as React from "react"

const SolSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <defs>
            <linearGradient
                id="a"
                x1={10.418}
                y1={9.712}
                x2={68.147}
                y2={76.017}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#1A1E21" />
                <stop offset={1} stopColor="#06060A" />
            </linearGradient>
            <linearGradient
                id="b"
                x1={12}
                y1={19.768}
                x2={43.881}
                y2={14.304}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#599DB0" />
                <stop offset={1} stopColor="#47F8C3" />
            </linearGradient>
            <linearGradient
                id="c"
                x1={12}
                y1={40.037}
                x2={43.945}
                y2={35.454}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#C44FE2" />
                <stop offset={1} stopColor="#73B0D0" />
            </linearGradient>
            <linearGradient
                id="d"
                x1={13.838}
                y1={28}
                x2={42.756}
                y2={28}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#778CBF" />
                <stop offset={1} stopColor="#5DCDC9" />
            </linearGradient>
        </defs>
        <path
            d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28z"
            fill="#06060A"
        />
        <path
            d="M39.396 20.712a1.055 1.055 0 0 1-.724.284H13.026c-.907 0-1.366-1.032-.732-1.644l4.206-4.066c.193-.186.457-.29.732-.29h25.742c.912 0 1.369 1.041.724 1.65l-4.302 4.066z"
            fill="#5DCDC9"
        />
        <path
            d="M39.396 40.717a1.055 1.055 0 0 1-.724.283H13.026c-.907 0-1.366-1.031-.732-1.644l4.206-4.065c.193-.186.457-.291.732-.291h25.742c.912 0 1.369 1.042.724 1.651l-4.302 4.066z"
            fill="#FFF"

        />
        <path
            d="M39.396 25.283a1.055 1.055 0 0 0-.724-.283H13.026c-.907 0-1.366 1.031-.732 1.643L16.5 30.71c.193.186.457.29.732.29h25.742c.912 0 1.369-1.04.724-1.65l-4.302-4.066z"
            fill="#FFF"

        />
    </svg>
)


export default SolSvg
