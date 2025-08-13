import * as React from "react"

const XagUsd = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 48 48"
        {...props}
    >
        <defs>
            <linearGradient
                id="linear-gradient"
                x1={24.13}
                y1={16.83}
                x2={24.13}
                y2={33.79}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset={0} stopColor="#fff"/>
                <stop offset={1}/>
            </linearGradient>
            <linearGradient
                id="linear-gradient-2"
                x1={37.25}
                y1={33.97}
                x2={37.25}
                y2={42.46}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset={0} stopColor="#fff"/>
                <stop offset={1} stopColor="#999"/>
            </linearGradient>
            <mask
                id="mask"
                x={3}
                y={9}
                width={42}
                height={30}
                maskUnits="userSpaceOnUse"
            >
                <image
                    width={42}
                    height={30}
                    transform="translate(3 9)"
                    xlinkHref="data:image/png;base64,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"
                    className="cls-12"
                />
            </mask>
            <mask
                id="mask-2"
                x={28}
                y={31}
                width={19}
                height={14}
                maskUnits="userSpaceOnUse"
            >
                <image
                    width={19}
                    height={14}
                    transform="translate(28 31)"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAOCAYAAADNGCeJAAAACXBIWXMAAAsSAAALEgHS3X78AAABGElEQVQ4T62TUW/DMAiEP4Ox07jv/f+/Mk1i7D109bYm0zSpJ/nFgoM7IACdN0H+CvgP4ulnjIgI7o67n4Wc4tCZmXG9XimlkFI6y/kVh85yzszzTAiB1hrLspzlneJAllIi54yqArCuK/f7HVUlhEDvHXdHRBARWmu01oAXmdM0UUoh5zzeNE3Aw8eUEiKPFFUlxjiKwktnOWfMDDNDRDCzA1nvnX3fB1nvX5v1g0xEhhR4DKOUwu12Q0SGxGVZEBFUlVrrkczMiDFSax0ePQtcLhfcndYa8zwPoqdXBzKAbdtGgKqO1ai1sm0bMUZCCJjZMP67zMDnOanqMHffd4AxVXdnXVdSSj+m2lqj1joWe5C9A2+9zQ+5gHR9szLKUAAAAABJRU5ErkJggg=="
                    className="cls-12"
                />
            </mask>
            <filter
                id="luminosity-invert"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feColorMatrix values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"/>
            </filter>
            <style>
                {
                    ".cls-8{mix-blend-mode:multiply}.cls-9{fill:url(#linear-gradient-2)}.cls-12{filter:url(#luminosity-invert)}"
                }
            </style>
        </defs>
        <g
            style={{
                isolation: "isolate",
            }}
        >
            <g id="Layer_1" data-name="Layer 1">
                <path
                    style={{
                        fill: "#dfa81c",
                    }}
                    d="M0 0h48v48H0z"
                />
                <path
                    d="M29.34 11 9.13 21.81l-3.19 8.52.56.3L18.41 37l23.9-12.73-2.92-7.77L29.34 11Zm9.22 7.38 1.95 5.15-7.95 4.23 5.16-8.93.84-.45Zm-6.94 3.68-5.17 9-3.23 1.72 5.59-9.19 2.81-1.48ZM10 23.67l2.19 1.16L8 29Zm16.31 1.23-5.58 9.17-1.33.71.45-6.48 6.44-3.41Zm-12.81.64 1.31.7-4.68 4.68-1.31-.7 4.68-4.68Zm4.92 2.64-.42 6.9-4.2-2.23Z"
                    style={{
                        fill: "#1a1a1a",
                    }}
                />
                <g
                    style={{
                        mask: "url(#mask)",
                    }}
                >
                    <path
                        d="M29.34 11 9.13 21.81l-3.19 8.52.56.3L18.41 37l23.9-12.73-2.92-7.77L29.34 11Zm9.22 7.38 1.95 5.15-7.95 4.23 5.16-8.93.84-.45Zm-6.94 3.68-5.17 9-3.23 1.72 5.59-9.19 2.81-1.48ZM10 23.67l2.19 1.16L8 29Zm16.31 1.23-5.58 9.17-1.33.71.45-6.48 6.44-3.41Zm-12.81.64 1.31.7-4.68 4.68-1.31-.7 4.68-4.68Zm4.92 2.64-.42 6.9-4.2-2.23Z"
                        style={{
                            opacity: 0.6,
                        }}
                    />
                </g>
                <g
                    style={{
                        opacity: 0.2,
                    }}
                >
                    <path
                        d="M29.34 11 9.13 21.81l-3.19 8.52.56.3L18.41 37l23.9-12.73-2.92-7.77L29.34 11Zm9.22 7.38 1.95 5.15-7.95 4.23 5.16-8.93.84-.45Zm-6.94 3.68-5.17 9-3.23 1.72 5.59-9.19 2.81-1.48ZM10 23.67l2.19 1.16L8 29Zm16.31 1.23-5.58 9.17-1.33.71.45-6.48 6.44-3.41Zm-12.81.64 1.31.7-4.68 4.68-1.31-.7 4.68-4.68Zm4.92 2.64-.42 6.9-4.2-2.23Z"
                        style={{
                            fill: "url(#linear-gradient)",
                        }}
                    />
                </g>
                <g className="cls-8">
                    <path
                        className="cls-9"
                        d="m36 42.25-.37-1.17h-3.06l-.35 1.17a.14.14 0 0 1-.15.12h-1.51a.12.12 0 0 1-.11 0 .1.1 0 0 1 0-.12L33 34.09a.14.14 0 0 1 .15-.12h1.89a.14.14 0 0 1 .15.12l2.6 8.12a.35.35 0 0 1 0 .06c0 .07 0 .1-.14.1h-1.48a.14.14 0 0 1-.17-.12Zm-3-2.53h2.11s.07 0 0-.07l-1.08-3.57-1 3.57c-.03.05-.03.07.03.07ZM42.42 36.25a.12.12 0 0 1 .1 0h1.4a.16.16 0 0 1 .11 0 .18.18 0 0 1 0 .1v5.88a.18.18 0 0 1 0 .1.15.15 0 0 1-.11 0h-1.4a.12.12 0 0 1-.1 0 .14.14 0 0 1-.05-.1v-.41h-.05a1.72 1.72 0 0 1-1.48.65 2.13 2.13 0 0 1-1.5-.55 2 2 0 0 1-.59-1.55v-4a.13.13 0 0 1 0-.1.14.14 0 0 1 .1 0h1.39a.12.12 0 0 1 .1 0 .14.14 0 0 1 0 .1v3.59a1.16 1.16 0 0 0 .25.78.91.91 0 0 0 .72.3.93.93 0 0 0 .67-.25 1 1 0 0 0 .32-.64v-3.8a.14.14 0 0 1 .12-.1Z"
                    />
                </g>
                <g
                    style={{
                        mask: "url(#mask-2)",
                    }}
                >
                    <g
                        className="cls-8"
                        style={{
                            opacity: 0.6,
                        }}
                    >
                        <path
                            d="m36 42.25-.37-1.17h-3.06l-.35 1.17a.14.14 0 0 1-.15.12h-1.51a.12.12 0 0 1-.11 0 .1.1 0 0 1 0-.12L33 34.09a.14.14 0 0 1 .15-.12h1.89a.14.14 0 0 1 .15.12l2.6 8.12a.35.35 0 0 1 0 .06c0 .07 0 .1-.14.1h-1.48a.14.14 0 0 1-.17-.12Zm-3-2.53h2.11s.07 0 0-.07l-1.08-3.57-1 3.57c-.03.05-.03.07.03.07ZM42.42 36.25a.12.12 0 0 1 .1 0h1.4a.16.16 0 0 1 .11 0 .18.18 0 0 1 0 .1v5.88a.18.18 0 0 1 0 .1.15.15 0 0 1-.11 0h-1.4a.12.12 0 0 1-.1 0 .14.14 0 0 1-.05-.1v-.41h-.05a1.72 1.72 0 0 1-1.48.65 2.13 2.13 0 0 1-1.5-.55 2 2 0 0 1-.59-1.55v-4a.13.13 0 0 1 0-.1.14.14 0 0 1 .1 0h1.39a.12.12 0 0 1 .1 0 .14.14 0 0 1 0 .1v3.59a1.16 1.16 0 0 0 .25.78.91.91 0 0 0 .72.3.93.93 0 0 0 .67-.25 1 1 0 0 0 .32-.64v-3.8a.14.14 0 0 1 .12-.1Z"/>
                    </g>
                </g>
            </g>
        </g>
    </svg>
)

export default XagUsd
